import { h, Fragment, reactive, Ivysaur, effect } from "ivysaur";
export * from "ivysaur";
let request_idle_callback = window.requestIdleCallback || ((fn) => setTimeout(fn, 0));
class expression {
  static Cache = /* @__PURE__ */ new Map();
  constructor(str) {
    if (expression.Cache.has(str)) {
      this.call = expression.Cache.get(str);
    }
    let safeFunction = () => {
      try {
        let func = new Function(["scope"], `with (scope) { return ${str}; }`);
        Object.defineProperty(func, "name", {
          value: `[expression]: ${str}`
        });
        return func;
      } catch (error) {
        console.log(`Error while compiling expression: ${str}`, error);
        return () => "";
      }
    };
    expression.Cache.set(str, safeFunction());
    this.call = expression.Cache.get(str);
  }
}
let compile_node = (element, scope) => {
  if (Array.isArray(element)) {
    return h(Fragment, {}, element.flatMap((el) => compile_node(el, scope)));
  }
  if (element.nodeType != 1) {
    return element.nodeValue;
  }
  let tag = element.tagName.toLowerCase();
  let attributes = {}, children = [], if_expression;
  for (let attr of element.attributes) {
    let key = attr.nodeName, value = attr.nodeValue;
    if (attr.nodeName[0] === ":") {
      let exp = new expression(attr.nodeValue);
      if (attr.nodeName === ":text") {
        children.push(exp.call(scope));
      } else if (attr.nodeName === ":html") {
        attributes.dangerouslySetInnerHTML = { __html: exp.call(scope) };
      } else if (attr.nodeName === ":if") {
        if_expression = exp;
      } else if (attr.nodeName === ":ref") {
        attributes.ref = exp.call(scope);
      } else {
        attributes["attr:" + attr.nodeName.slice(1)] = exp.call(scope);
      }
    } else if (key[0] === "@") {
      let exp = new expression(value);
      attributes[`on${key[1].toUpperCase()}${key.slice(2)}`] = (e) => exp.call(scope)(e);
    } else if (key[0] === ".") {
      let exp = new expression(value);
      attributes["prop:" + key.slice(1)] = exp.call(scope);
    } else {
      attributes[key] = value;
    }
  }
  for (let child of Array.from((tag == "template" ? element.content : element).childNodes)) {
    children.push(child.tagName?.toLowerCase() === "template" ? compile_template(child, scope) : compile_node(child, scope));
  }
  return if_expression && !if_expression.call(scope) ? null : h(tag, attributes, ...children);
};
let compile_template = (element, scope) => {
  let each_key, each_expression, if_expression;
  for (let attr of element.attributes) {
    if (attr.nodeName.startsWith("each")) {
      each_key = attr.nodeName.split(":")[1].trim();
      each_expression = new expression(attr.nodeValue);
    }
    if (attr.nodeName === ":if") {
      if_expression = new expression(attr.nodeValue);
    }
  }
  let children = [];
  let nodes = Array.from(element.content.children);
  if (each_key) {
    let values = each_expression.call(scope);
    for (let i = 0; i < values.length; i++) {
      let proxy = new Proxy({}, {
        get: (_, key) => key === each_key ? values[i] : scope[key],
        has: (_, key) => key === each_key || key in scope,
        set: (_, key, value) => {
          scope[key] = value;
          return true;
        }
      });
      children.push(compile_node(nodes, proxy));
    }
  } else {
    children.push(compile_node(nodes, scope));
  }
  return if_expression && !if_expression.call(scope) ? null : h(Fragment, {}, ...children);
};
let construct_from_element = (element) => {
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
  els.forEach((el) => el.remove());
  const markup = element.content;
  const attrs = element.getAttribute("attributes")?.split(",").map((prop) => prop.trim()) ?? [];
  element.remove();
  const setup = new Function(
    "$element",
    "$state",
    "$attributes",
    "$cleanup",
    "$reactive",
    "$effect",
    script
  );
  customElements.define(tagname, class extends Ivysaur {
    static get observedAttributes() {
      return attrs;
    }
    static styles = style;
    onMount() {
      const data = reactive({});
      data.$element = this;
      data.$attributes = this.observedAttributes;
      const cleanup = (...fns) => void this.cleanup_fns.push(...fns);
      setup(
        this,
        data,
        this.observedAttributes,
        cleanup,
        reactive,
        effect
      );
      this.__internal_data = data;
    }
    render() {
      return h("host", {}, compile_node(Array.from(markup.children), this.__internal_data));
    }
    onUnmount() {
      this.cleanup_fns.forEach((fn) => fn());
    }
    cleanup_fns = [];
  });
};
let init = () => {
  let mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "TEMPLATE") {
          construct_from_element(node);
        }
      });
    });
  });
  let start = () => {
    document.querySelectorAll("template[blackberry]").forEach(construct_from_element);
    document.body.removeAttribute("blackberry-cloak");
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  };
  switch (document.readyState) {
    case "loading":
    case "interactive":
      addEventListener("DOMContentLoaded", start);
      break;
    case "complete":
      start();
  }
};
export {
  init as default
};
