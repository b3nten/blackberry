const EMPTY_ARR = [],
  EMPTY_OBJ = {},
  render_context = { value: null },
  ROOT = Symbol("root"),
  TEXT = Symbol("text");

let is_vnode = (v) => v instanceof vnode;

let is_prim = (p) => typeof p !== "object" || p === null;

let is_arr = (a) => Array.isArray(a);

let to_prim_val = (p) =>
  (p instanceof "string" || p instanceof "number") ? String(p) : ""

let to_vnode = (p) =>
  is_vnode(p) ? p : text(to_prim_val(p));

class vnode {
  static is(x) { return x instanceof vnode; }
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
  is_fragment() { return this.type === Fragment }
  is_function() { return typeof this.type === "function"; }
  computed;
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
  return new vnode(Fragment, props, props.children ?? children);
};

export let render = (v_dom, element, context = {}) => {
  render_context.value = context;
  if(!element._saved) element._saved = element.cloneNode(true);
  if (!element._vnode) element._vnode = new vnode(ROOT, {}, []);
  diff_element(element, h(ROOT, {}, [v_dom]) );
  render_context.value = {};
  return () => destroy_root(element);
};

let diff_element = (element, new_vnode) => {

  patch_props(element, element._vnode?.props ?? {}, new_vnode.props);

  let old_vnode = element._vnode,
    old_children = old_vnode?.children ?? EMPTY_ARR,
    new_children = new_vnode.children,
    len = Math.max(old_children.length, new_children.length);

  console.log({
    old_vnode,
    old_children,
    new_children,
    len
  })

  for (let i = 0; i < len; i++) {
    diff_node(element, old_children[i], new_children[i]);
  }

  element._vnode = new_vnode;
  return element;
};

let diff_node = (parent, old_vnode, new_vnode) => {

}

let listener_delegate = function (e) { this._vev[e.type](e); }
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
        if (
          !((el._vev ?? (el._vev = {}))[key.slice(2)]
            = (new_props[key]
              ? (e) => new_props[key].call(host, e)
              : undefined))) {
          el.removeEventListener(key.slice(2), listener_delegate);
        } else if (!old_props[key]) {
          el.addEventListener(key.slice(2), listener_delegate);
        }
      } else if (key in el) {
        el[key] = new_props[key];
      } else {
        el.setAttribute(key, new_props[key]);
      }
    }
  }
}

let destroy_root = (root) => {
  if(root._saved) {
    root.replaceWith(root._saved);
    root._saved = null;
  }
}
