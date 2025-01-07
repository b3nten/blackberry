import { compile } from "./template.js";
import { effect, reactive } from "../assets/reactivity@3.5.13.js"
import { render } from "./vdom.js"

function constructElementFromTemplate(element, alpine) {
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

      const data = reactive({});

      const cleanup = (...fns) => void this.__blackberry_cleanupFns.push(...fns);
      const effect = (fn) => void this.__blackberry_effects.push(alpine.effect(fn));

      setup(
        this,
        data,
        this.__blackberry_attrs,
        this.__blackberry_props,
        cleanup,
        reactive,
        effect
      );

      this.renderFn = compile(element, data)
    }

    connectedCallback() {
      effect(() => {
        render(this.shadowRoot, this.renderFn())
      })
    }

    disconnectedCallback() {
      this.__blackberry_cleanupFns.forEach((fn) => fn());
      this.__blackberry_effects.forEach((fn) => alpine.release(fn));
    }

    __blackberry_attrs = alpine.reactive({});
    __blackberry_props = alpine.reactive({});
    __blackberry_cleanupFns = [];
    __blackberry_effects = [];
  });
}

export default function initBlackberry(alpine) {
  document.querySelectorAll("template").forEach((element) => constructElementFromTemplate(element, alpine));
  document.body.removeAttribute("blackberry-cloak");
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "TEMPLATE") { constructElementFromTemplate(node, alpine); }
      });
    });
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}
