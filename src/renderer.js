const EMPTY_ARR = [],
  EMPTY_OBJ = {},
  ROOT = 0,
  FRAGMENT = 1,
  TEXT = 2;

let render_context = EMPTY_OBJ;

let is_vnode = (v) => v instanceof vnode;

let is_prim = (p) => typeof p !== "object" || p === null;

let is_arr = (a) => Array.isArray(a);

let to_prim_val = (p) =>
  (p instanceof "string" || p instanceof "number") ? String(p) : ""

let to_vnode = (p) =>
  is_vnode(p) ? p : text(to_prim_val(p));

export let select_between = (prev_el, next_el) => {
  let result = [];
  while (prev_el.nextSibling && prev_el.nextSibling !== next_el) {
    result.push((prev_el = prev_el.nextSibling));
  }
  return result;
};

class vnode {
  constructor(type, props, children) {
    this.type = type;
    this.props = props ?? {};
    this.children = props.children ?? children;
    this.key = props.key;
  }
  first_el;
  last_el;
  key_map = {}
  is_element() { return typeof this.type === "string"; }
  is_text() { return this.type === TEXT; }
  is_fragment() { return this.type === FRAGMENT || this.type === Fragment }
  is_function() { return typeof this.type === "function"; }
  v_children;
}

export let text = (text) => {
  return new vnode(TEXT, { text });
};

export let h = (type, props, ...children) => {
  return new vnode(
    type,
    props ?? {},
    (is_arr(children[0]) ? children[0] : children).flatMap(to_vnode),
  );
};

export let Fragment = (props, ...children) => {
  return new vnode(FRAGMENT, props, props.children ?? children);
};

export let render = (v_dom, element, context = {}) => {
  render_context = context;
  if (!element.v_node) {
    element._vnode = new vnode(ROOT, {}, []);
  }
  diff(element, new vnode(ROOT, {}, [v_dom]));
  render_context = EMPTY_OBJ;
  return element;
};

let diff = (element, v_node) => {

  if (v_node.is_element()) {
    patch_props(element, element._vnode?.props ?? {}, v_node.props);
  }

  element._vnode = v_node;
  return element;
};

let listener_deligate = function (e) { this._vev[e.type](e); }

let patch_props = (el, old_props, new_props) => {
  for (let key in old_props) {
    if (!new_props[key]) {
      el[key] = null;
      el.removeAttribute(key);
    }
  }
  for (let key in new_props) {
    if (old_props[key] !== new_props[key]) {
      if (key.startsWith("on")) {
        let host = render_context.host ?? el;
        if (!((el._vev ?? (el._vev = {}))[key.slice(2)] = (new_props[key] ? (e) => new_props[key].call(host, e) : undefined))) {
          el.removeEventListener(key.slice(2), listener_deligate);
        } else if (!old_props[key]) {
          el.addEventListener(key.slice(2), listener_deligate);
        }
      } else if (key in el) {
        el[key] = new_props[key];
      } else {
        el.setAttribute(key, new_props[key]);
      }
    }
  }
}

let diff_vnodes = (old_vnode, new_vnode, first_el, last_el) => {



}

/*

Conceptually, diffing two nodes happens in the
section containing the nodes, not on a parent element.

<key={1}>    <key={2}>
<key={2}>    <key={3}>
<key={3}>    <key={1}>

*/
