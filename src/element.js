import * as superfine from "./vdom.js";

Symbol.metadata ??= Symbol('metadata');

const toKebabCase = (str) => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const observedAttributes = new Map()

let globalSheets = null;

function getGlobalStyleSheets() {
  if (globalSheets === null) {
    globalSheets = Array.from(document.styleSheets)
      .map(x => {
        const sheet = new CSSStyleSheet();
        const css = Array.from(x.cssRules).map(rule => rule.cssText).join(' ');
        sheet.replaceSync(css);
        return sheet;
      });
  }

  return globalSheets;
}

function addGlobalStylesToShadowRoot(shadowRoot) {
  shadowRoot.adoptedStyleSheets.push(
    ...getGlobalStyleSheets()
  );
}

export function CreateBlackberryElement(reactivity) {
  return class BlackberryElement extends HTMLElement {

    static styles = "";

    static useGlobalStyles = false;

    static define(name) {
      if(!customElements.get(name)) {
        customElements.define(name, this);
      }
    }

    static get observedAttributes() {
      return Array.from(observedAttributes.get(this[Symbol.metadata]) ?? []);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      this.attrs[name] = newValue;
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(this.constructor.styles);
      this.shadowRoot.adoptedStyleSheets = [sheet];

      if (this.constructor.useGlobalStyles) {
        addGlobalStylesToShadowRoot(this.shadowRoot);
      }

      this.rootEL = document.createElement("element-root");
      this.shadowRoot.appendChild(this.rootEL);
    }

    connectedCallback() {
      const self = this;
      const root = (child) => superfine.h("element-root", {}, child);
      this.onMount?.()
      reactivity.effect(() => {
        superfine.patch(this.rootEL, root(this.render.call(self)), { host: this });
      })
      this.onMounted?.();
    }

    disconnectedCallback() {
      this.onUnmount?.();
    }

    render() {
      throw new Error("You must implement the render method in your custom element.");
    }

    attrs = reactivity.reactive({});

    // stored @state values
    _decoratedStates = reactivity.reactive({});
  }
}

export const css = String.raw
export const h = superfine.h;
export const text = superfine.text;
export const Fragment = superfine.Fragment;
export const elementFactory = superfine.elementFactory;

export function state(_, { kind, name, }) {
  if (kind === "accessor") {
    return {
      get() {
        return this._decoratedStates[name];
      },
      set(val) {
        this._decoratedStates[name] = val;
      },
      init(initialValue) {
        this._decoratedStates[name] = initialValue;
      }
    };
  } else {
    throw new Error("Invalid decorator usage: @state only works on class accessors.");
  }
}

export function attribute(value, { kind, name, metadata }) {

  const attrName = toKebabCase(name);

  if(!observedAttributes.has(metadata)) observedAttributes.set(metadata, new Set());
  observedAttributes.get(metadata).add(attrName);

  if (kind === "accessor") {
    return {
      get() {
        return this.attrs[attrName];
      },
      set(val) {
        this.attrs[attrName] = val;
        this.setAttribute(attrName, String(val));
      },
      init(initialValue) {
        this.attrs[attrName] = initialValue;
      }
    };
  } else if(kind === "getter") {
    return function () {
      return this.attrs[attrName] ?? value();
    }
  } else {
    throw new Error("Invalid decorator usage: @attr only works on class accessors and getters.");
  }
}
