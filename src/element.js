import { effect, effectScope, reactive } from "@vue/reactivity"
import { render } from "preact"
export { h, Fragment } from "preact"

Symbol.metadata ??= Symbol('metadata');

let observedAttributes = new Map()

let globalSheets = null;

let getGlobalStyleSheets = () => {
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

let addGlobalStylesToShadowRoot = (shadowRoot) => {
  shadowRoot.adoptedStyleSheets.push(
    ...getGlobalStyleSheets()
  );
}

export class BlackberryElement extends HTMLElement {

  static styles = "";

  static useGlobalStyles = false;

  static define(name) {
    if (!customElements.get(name)) {
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

    this.rootEffectScope = effectScope()
  }

  connectedCallback() {
    const self = this;
    this.rootEffectScope.run(() => {
      this.onMount?.()
      effect(() => {
        render(this.render.call(self), this.shadowRoot, { host: this });
      })
      this.onMounted?.();
    })
  }

  disconnectedCallback() {
    this.rootEffectScope.run(() => {
      this.onUnmount?.();
    })
    this.rootEffectScope.stop();
  }

  render() {
    throw new Error("You must implement the render method in your custom element.");
  }

  attrs = reactive({});
  _decoratedStates = reactive({});
}

export const Component = BlackberryElement;

export const css = String.raw

export function state() {
  return function (_, { kind, name }) {
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
}

export function attribute(overriddenName) {
  return function (value, { kind, name, metadata }) {
    const attrName = overriddenName ?? name;
    if (!observedAttributes.has(metadata)) observedAttributes.set(metadata, new Set());
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
    } else if (kind === "getter") {
      return function () {
        return this.attrs[attrName] ?? value();
      }
    } else {
      throw new Error("Invalid decorator usage: @attr only works on class accessors and getters.");
    }
  }
}

export function component(name) {
  return function (target) {
    target.define(name);
  }
}
