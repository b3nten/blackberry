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

  const dataName = "blackberry_" + tagname.replace("-", "");

  alpine.data(dataName, () => ({
    init() {
      const self = this.$root.getRootNode().host;

      const $cleanup = (...fns) => void self.__blackberry_cleanupFns.push(...fns);
      const $effect = (fn) => void self.__blackberry_effects.push(alpine.effect(fn));

      try {
        setup(self, this, self.__blackberry_attrs, self.__blackberry_props ??= alpine.reactive({}), $cleanup, alpine.reactive, $effect);
      } catch (e) {
        console.error("Error in setup function of", self, this, e);
      }
    },
  }));

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

      const el = document.createElement("blackberry-provider");
      el.setAttribute("x-data", dataName);

      for (let x of markup.children) el.appendChild(x.cloneNode(true));

      // init tree and children
      queueMicrotask(() => {
        this.shadowRoot.appendChild(el);
        alpine.initTree(this.shadowRoot.children[0]);
      });
    }

    disconnectedCallback() {
      this.__blackberry_cleanupFns.forEach((fn) => fn());
      this.__blackberry_effects.forEach((fn) => alpine.release(fn));
      alpine.destroyTree(this.shadowRoot.children[0]);
    }

    __blackberry_attrs = alpine.reactive({});
    __blackberry_props = alpine.reactive({});
    __blackberry_cleanupFns = [];
    __blackberry_effects = [];
  });
}

export default function alpinePlugin(alpine) {

  let startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject)) name = name.replace(subject, replacement);
    return { name, value };
  };

  alpine.mapAttributes(startingWith(".", "x-prop:"));

  alpine.directive("prop", (el, { value, expression }, { effect, evaluateLater }) => {
    let exp = evaluateLater(expression);
    effect(() => {
      exp((r) => {
        el[value] = r;
        if(el.__blackberry_props) el.__blackberry_props[value] = r;
      });
    });
  });

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
