import { reactive, effect } from "@vue/reactivity";
import { h, Fragment } from "preact";
import { BlackberryElement } from "./element.js";

class expression {
  static Cache = new Map();
  constructor(str) {
    if (expression.Cache.has(str)) { this.call = expression.Cache.get(str); }
    let safeFunction = () => {
      try {
        let func = new Function(["scope"], `with (scope) { return ${str}; }`)
        Object.defineProperty(func, "name", {
          value: `[expression]: ${str}`,
        })
        return func
      } catch (error) {
        console.log(`Error while compiling expression: ${str}`, error)
        return () => ""
      }
    }
    expression.Cache.set(str, safeFunction())
    this.call = expression.Cache.get(str)
  }
}

function resolve_scoped_path(key, scope) {
  let segments = key.split(".")
  let value = scope
  for (let segment of segments) {
    value = value[segment]
  }
  return value
}

const compile_node = (element, scope) => {
  if (Array.isArray(element)) {
    return h(Fragment, {}, element.flatMap((el) => compile_node(el, scope)))
  }

  if (element.nodeType != 1) {
    return element.nodeValue
  }

  let tag = element.tagName.toLowerCase()

  let attributes = {}, children = [], if_expression;

  for (let attr of element.attributes) {
    let key = attr.nodeName, value = attr.nodeValue;
    if (attr.nodeName[0] === ":") {
      let exp = new expression(attr.nodeValue)
      if (attr.nodeName === ":text") {
        children.push(exp.call(scope))
      } else if (attr.nodeName === ":html") {
        attributes.dangerouslySetInnerHTML = { __html: exp.call(scope) }
      } else if (attr.nodeName === ":if") {
        if_expression = exp
      } else {
        attributes[attr.nodeName.slice(1)] = exp.call(scope)
      }
    } else if (key[0] === "@") {
      attributes[`on${key[1].toUpperCase()}${key.slice(2)}`] = (e) => resolve_scoped_path(value, scope)(e)
    } else {
      attributes[key] = value
    }
  }

  for (let child of Array.from((tag == 'template' ? element.content : element).childNodes)) {
    children.push(child.tagName?.toLowerCase() === "template" ? compile_template(child, scope) : compile_node(child, scope))
  }

  return if_expression && !if_expression.call(scope) ? [] : h(tag, attributes, children)
}

const compile_template = (element, scope) => {
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
      let new_scope = { ...scope, [each_key]: values[i] };
      children.push(compile_node(nodes, new_scope ));
    }
  }

  return if_expression && !if_expression.call(scope) ? [] : children
}

function construct_from_element(element) {
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

  const setup = new Function(
    "$element",
    "$state",
    "$attributes",
    "$cleanup",
    "$reactive",
    "$effect",
    script,
  );

  customElements.define(tagname, class extends BlackberryElement {
    static get observedAttributes() { return attrs; }
    static styles = style;

    onMount() {
      const data = reactive({});

      data.$element = this;
      data.$attributes = this.attrs;

      const cleanup = (...fns) => void this.cleanup_fns.push(...fns);

      setup(
        this,
        data,
        this.attrs,
        cleanup,
        reactive,
        effect
      );

      this.__internal_data = data;
    }

    render() {
      return compile_node(Array.from(markup.children), this.__internal_data)
    }

    onUnmount() {
      this.cleanup_fns.forEach((fn) => fn());
    }

    cleanup_fns = [];
  })
}

export default function init_blackberry() {
  requestIdleCallback(() => {
    document.querySelectorAll("template").forEach((element) => construct_from_element(element));
    document.body.removeAttribute("blackberry-cloak");
  })

  let mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "TEMPLATE") { construct_from_element(node); }
      });
    });
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}
