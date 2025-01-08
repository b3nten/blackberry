
import { effect, reactive, effectScope } from "../assets/reactivity@3.5.13.js"
import { Fragment } from "./vdom.js";
import { createElement } from "./vdom.js";
import { h, text, render } from "./vdom.js"

const isLazy = Symbol("lazy");
class Lazy { constructor(fn) { this.fn = fn };[isLazy] = true }
const unwrap = (v) => v[isLazy] ? v.fn() : v;

class Expression {
  static Cache = new Map();
  constructor(expression) {
    if (Expression.Cache.has(expression)) { this.call = Expression.Cache.get(expression); }
    const safeFunction = () => {
      try {
        let func = new Function(["scope"], `with (scope) {  return ${expression}; }`)
        Object.defineProperty(func, "name", {
          value: `[expression]: ${expression}`,
        })
        return func
      } catch (error) {
        console.log(`Error while compiling expression: ${expression}`, error)
        return () => ""
      }
    }
    Expression.Cache.set(expression, safeFunction())
    this.call = Expression.Cache.get(expression)
  }
}

function resolveScopePath(key, scope) {
  let segments = key.split(".")
  let value = scope
  for (let segment of segments) {
    value = value[segment]
  }
  return value
}

function compileIntermediary(element, scope) {

  if(!element) return null

  if (Array.isArray(element)) {
    return element.map(e => compileIntermediary(e, scope))
  }

  if (element.nodeType != 1) {
    return new text(element.nodeValue)
  }

  let tag = element.tagName.toLowerCase()

  let attributes = {}, children = [], show, eachStatement, eachVar, ifCondition, childExpression;

  for (let attr of element.attributes) {
    let key = attr.nodeName, value = attr.nodeValue, expression, modifier;
    if (attr.nodeName[0] === ":") {
      expression = true;
      key = attr.nodeName.slice(1)
    } else if (attr.nodeName.includes(":")) {
      expression = true;
      key = attr.nodeName.split(":")[0];
      modifier = attr.nodeName.split(":")[1];
    }

    if (expression) {
      if (key === "text") {
        childExpression = new Lazy(() => text(new Expression(value).call(scope)))
      } else if (key === "unsafe-inner-html") {
        attributes["unsafeInnerHtml"] = new Lazy(() => new Expression(value).call(scope))
      } else if (key === "show") {
        show = new Expression(attr.nodeValue)
      } else if (key === "if") {
        ifCondition = new Expression(attr.nodeValue)
      } else if (key === "each" && modifier) {
        eachStatement = new Expression(value)
        eachVar = modifier
      } else {
        attributes[key] = new Lazy(() => new Expression(value).call(scope))
      }
    } else {
      if (key[0] === "@") {
        attributes["on" + key.slice(1)] = new Lazy(() => resolveScopePath(value, scope))
      } else {
        attributes[key] = value
      }
    }
  }

  children.push(childExpression, ...(Array.from((tag == 'template' ? element.content : element).childNodes)))

  for (let i = 0; i < children.length; i++) {
    if (children[i] instanceof Lazy) continue;
    children[i] = compileIntermediary(children[i], scope)
  }

  return new Lazy(
    show ? (() => show(scope) ? createElement(tag, attributes, children) : null)
      : () => createElement(tag, attributes, children)
  )
}

function renderIntermediaryTemplate(lazy) {
  if(!lazy) return null
  if (Array.isArray(lazy)) {
    return lazy.map(l => renderIntermediaryTemplate(l))
  }

  let vnode = unwrap(lazy)
  if (!vnode) return null

  if (vnode.props) {
    for (let k in vnode.props) {
      if (vnode.props[k] instanceof Lazy) {
        vnode.props[k] = unwrap(vnode.props[k])
      }
    }
  }

  if (vnode.children) vnode.children = vnode.children.map(c => renderIntermediaryTemplate(c))

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
      this.rootEffectScope = effectScope()
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

      this.renderFn = compileIntermediary(Array.from(markup.children), data)

      this.rootEffectScope.run(() => {
        effect(() => {
          render(this.shadowRoot, renderIntermediaryTemplate(this.renderFn), { host: this })
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
