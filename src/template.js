
import { effect, reactive, effectScope } from "../assets/reactivity@3.5.13.js"
import { Lazy, unwrap } from "./renderer.js";
import { h, text, patch } from "./vdom.js"

const stringExpressions = new Map();
function generateFunctionFromString(expression) {
    if (stringExpressions.has(expression)) { return stringExpressions.get(expression); }
    const safeFunction = () => {
        try {
            let func = new Function(
                ["scope"],
                `with (scope) {  return ${expression}; }`
            )
            Object.defineProperty(func, "name", {
                value: `[expression]: ${expression}`,
            })
            return func
        } catch (error) {
            console.log(`Error while compiling expression: ${expression}`, error)
            return () => ""
        }
    }
    stringExpressions.set(expression, safeFunction())
    return safeFunction()
}

function resolveScopePath(key, scope) {
  let segments = key.split(".")
  let value = scope
  for(let segment of segments) {
    value = value[segment]
  }
  return value
}

function compileIntermediary(element, scope = {}) {

  if(Array.isArray(element)) {
    return element.map(e => compileIntermediary(e, scope))
  }

  if (element.nodeType != 1) {
    return new Lazy(() => text(element.nodeValue))
  }

  let tag = element.tagName.toLowerCase()

  let attributes = {};
  let children = [];

  for(let attr of element.attributes) {
    if (attr.nodeName[0] === ":") {
      const fn = generateFunctionFromString(attr.nodeValue)
      if(attr.nodeName === ":text") {
        children.push(new Lazy(() => text(fn(scope))))
      } else {
        attributes[attr.nodeName.slice(1)] = new Lazy(() => fn(scope))
      }
    } else if (attr.nodeName[0] === "@") {
      attributes["on" + attr.nodeName.slice(1)] = new Lazy(() => resolveScopePath(attr.nodeValue, scope))
    } else {
      attributes[attr.nodeName] = attr.nodeValue
    }
  }

  children.push(...Array.from((tag == 'template' ? element.content : element).childNodes))

  for (let i = 0; i < children.length; i++) {
    if(children[i] instanceof Lazy) continue;
    children[i] = compileIntermediary(children[i], scope)
  }

  return new Lazy(() => h(tag, attributes, ...children))
}

function renderIntermediaryTemplate(lazy) {
  if(Array.isArray(lazy)) {
    return lazy.map(l => renderIntermediaryTemplate(l))
  }

  let vnode = unwrap(lazy)

  if(vnode.props) {
    for(let k in vnode.props) {
      if(vnode.props[k] instanceof Lazy) {
        vnode.props[k] = unwrap(vnode.props[k])
      }
    }
  }

  if(vnode.children) vnode.children = vnode.children.map(c => renderIntermediaryTemplate(c))

  return vnode
}

function constructComponentFromElement(element) {
  if (element.tagName !== "TEMPLATE" || !(typeof element.getAttribute("blackberry") === "string")) {
    return;
  }

  let tagname = element.getAttribute("blackberry");
  if (customElements.get(tagname)) return;

  let script = "", style = "", els = [];
  for (let child of element.content.children) {
    if (child.tagName === "SCRIPT") {
      script += child.innerHTML;
      els.push(child);
    } else if (child.tagName === "STYLE") {
      style += child.innerText;
      els.push(child);
    }
  }
  // delay removal to not mutate during loop
  els.forEach((el) => el.remove());

  const markup = element.content;
  const attrs = element.getAttribute("attributes")?.split(",").map((prop) => prop.trim()) ?? [];

  element.remove();

  const scopedSheet = new CSSStyleSheet();
  scopedSheet.replaceSync(style ?? "");
  const sheets = [scopedSheet];

  const setup = new Function(
    "$element",
    "$state",
    "$attributes",
    "$props",
    "$cleanup",
    "$reactive",
    "$effect",
    script,
  );

  customElements.define(tagname, class extends HTMLElement {

    static get observedAttributes() { return attrs; }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      this.__blackberry_attrs[name] = newValue;
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = sheets;
    }

    connectedCallback() {
      const data = reactive({});
      data.$element = this;
      data.$attributes = this.__blackberry_attrs;
      data.$props = this.__blackberry_props;

      const cleanup = (...fns) => void this.__blackberry_cleanupFns.push(...fns);

      setup(
        this,
        data,
        this.__blackberry_attrs,
        this.__blackberry_props,
        cleanup,
        reactive,
        effect
      );

      this.root = document.createElement("shadow-root")
      this.shadowRoot.appendChild(this.root)
      this.renderFn = compileIntermediary(Array.from(markup.children), data)
      this.effectScope = effectScope()
      this.effectScope.run(() => {
        effect(() => {
          patch(this.root, h("shadow-root", {}, renderIntermediaryTemplate(this.renderFn)), { host: this })
        })
      })
    }

    disconnectedCallback() {
      this.__blackberry_cleanupFns.forEach((fn) => fn());
      this.renderEffect.effect.stop();
    }

    __blackberry_attrs = reactive({});
    __blackberry_props = reactive({});
    __blackberry_cleanupFns = [];
  });
}

export default function initBlackberry() {
  requestIdleCallback(() => {
    document.querySelectorAll("template").forEach((element) => constructComponentFromElement(element));
    document.body.removeAttribute("blackberry-cloak");
  })

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "TEMPLATE") { constructComponentFromElement(node); }
      });
    });
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}
