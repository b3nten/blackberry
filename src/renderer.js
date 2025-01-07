/** @type { import("./renderer").ToArray } */
const toArray = (a) => Array.isArray(a) ? a : [a];

const nil = Symbol("nil");
const is_vnode = Symbol("vnode");

export const isLazy = Symbol("lazy");
export class Lazy { constructor(fn) { this.fn = fn };[isLazy] = true }
export const unwrap = (v) => v[isLazy] ? v.fn() : v;


/** @type {import("./renderer").VirtualNode} */
class VirtualNode {
  [is_vnode] = true;
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = toArray(props.children ? props.children : children);
    this.key = props.key;
  }
  element;
  key;
}

/**
* @param {import("./renderer").HArgs}
* @returns {import("./renderer").VirtualNode}
*/
export function h(tag, propsOrVNodeOrPrimitive, ...children) {
  return new VirtualNode(tag, propsOrVNodeOrPrimitive, children);
}

export function Fragment({ children }) { return children; }

let renderOptions = null
function render(element, vdom, options) {
  renderOptions = options ?? {};
  if (!element._render_root) { element._render_root = []; }
  patchChildren(element, toArray(vdom), element._render_root);
  element._render_root = toArray(vdom);
  renderOptions = null;
}

function createNode(vnode) {
  if (typeof vnode !== "object") return (vnode && document.createTextNode(String(vnode)));
  let element = vnode.element = document.createElement(vnode.tag);
  element._vnode = vnode;
  for (let k in vnode.props) patchProperty(element, k, nil, vnode.props[k]);
  for (let child of vnode.children) element.appendChild(createNode(child));
  return element;
}

const swap = (a, b) => {
    let parent = a.parentNode, temp = a.nextSibling === b ? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    parent.insertBefore(b, temp);
};


function patchChildren(element, children, old_children) {
  if (!old_children.length) {
    for (let child of children) element.appendChild(createNode(child))
    return;
  }

  let i = 0;
  // PATCH CHILDREN THAT EXIST
  for (; i < Math.min(old_children.length, children.length); i++) {
    let old_child = old_children[i];
    let child = children[i];
    let keyedElement;

    if(child.key) {
      console.log(
        child.key,
      )
    }

    if (typeof old_child !== "object") {
      if (typeof child !== "object" && old_child !== child) {
        element.childNodes[i].nodeValue = child;
      } else {
        if (child.key && (keyedElement = old_children.find((c) => c.key === child.key && c.tag === child.tag))) {
          swap(element.childNodes[i], keyedElement.element);
          child.element = element.childNodes[i];
          element.childNodes[i]._vnode = child;
          for(let k in child.props) patchProperty(element.childNodes[i], k, old_child.props[k], child.props[k]);
          patchChildren(element.childNodes[i], child.children, old_child.children);
        } else {
          element.replaceChild(createNode(child), element.childNodes[i]);
        }
      }
    } else if (child.key && (keyedElement = old_children.find((c) => c.key === child.key && c.tag === child.tag))) {
      swap(element.childNodes[i], keyedElement.element);
      child.element = element.childNodes[i];
      element.childNodes[i]._vnode = child;
      for(let k in child.props) patchProperty(element.childNodes[i], k, old_child.props[k], child.props[k]);
      patchChildren(element.childNodes[i], child.children, old_child.children);
    } else if (child.tag === old_child.tag) {
      for(let k in child.props) patchProperty(element.childNodes[i], k, old_child.props[k], child.props[k]);
      patchChildren(element.childNodes[i], child.children, old_child.children);
      child.element = element.childNodes[i];
      element.childNodes[i]._vnode = child;
    } else {
      element.replaceChild(createNode(child), element.childNodes[i]);
    }
  }

  let to_remove = []
  for (; i < old_children.length; i++) {
    to_remove.push(old_children[i]);
  }
  for (let child of to_remove) {
    element.removeChild(child.element);
  }
  // ADD NEW CHILDREN
  for (; i < children.length; i++) {
    element.appendChild(createNode(children[i]));
  }
}

let listener = (e) => e.currentTarget.events[e.type](e);
function patchProperty(element, key, oldValue, newValue) {
  if (key === "key") {
  } else if (key === "ref" && typeof newValue === "object") {
    newValue.current = element;
  } else if (key[0] === "o" && key[1] === "n") {
    key = key.toLowerCase();
    if (!((element.events || (element.events = {}))[(key = key.slice(2))] = newValue ? (e) => newValue.call(renderOptions?.host ?? element, e) : undefined)) {
      element.removeEventListener(key, listener);
    } else if (!oldValue) {
      element.addEventListener(key, listener);
    }
  } else if ((newValue !== oldValue) || oldValue === nil) {
    if(key in element) {
      element[key] = newValue;
    }
    element.setAttribute(key, String(newValue));
  }
}
