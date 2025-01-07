let SSR_NODE = 1, TEXT_NODE = 3, EMPTY_OBJ = {}, EMPTY_ARR = [], SVG_NS = "http://www.w3.org/2000/svg"

let listener = function (event) {
  // @ts-ignore
  this.events[event.type](event)
} // this is the host

let getKey = (vdom) => (vdom == null ? vdom : vdom.key)

let patchProperty = (node, key, oldValue, newValue, isSvg) => {
  if (key === "key") {
  } else if (key === "unsafe-inner-html") {
    node.__unsafe_innerHtml = newValue
  } else if (key === "ref" && typeof newValue === "object") {
    newValue.value = node
  } else if (key[0] === "o" && key[1] === "n") {
    key = key.toLowerCase()
    let host = renderOptions?.host ?? node
    // if(!node.events[key] = newValue ? newValue : undefined)
    if (!((node.events || (node.events = {}))[(key = key.slice(2))] = newValue ? (e) => newValue.call(host, e) : undefined)) {
      node.removeEventListener(key, listener)
    } else if (!oldValue) {
      node.addEventListener(key, listener)
    }
  } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
    node[key] = newValue == null ? "" : newValue
  } else if (newValue == null || newValue === false) {
    node.removeAttribute(key)
  } else {
    node.setAttribute(key, newValue)
  }
}

let createNode = (vdom, isSvg) => {
  let props = vdom.props;
  let node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is }) : document.createElement(vdom.tag, { is: props.is })
  for (var k in props) patchProperty(node, k, null, props[k], isSvg)
  if(node.__unsafe_innerHtml) {
    node.innerHTML = node.__unsafe_innerHtml
  } else {
    for (var i = 0; i < vdom.children.length; i++) node.appendChild(createNode((vdom.children[i] = vdomify(vdom.children[i])), isSvg))
  }
  return (vdom.node = node)
}

var patchNode = (parent, node, oldVNode, newVNode, isSvg) => {
  if (oldVNode === newVNode) {
  } else if (
    oldVNode != null &&
    oldVNode.type === TEXT_NODE &&
    newVNode.type === TEXT_NODE
  ) {
    if (oldVNode.tag !== newVNode.tag) node.nodeValue = newVNode.tag
  } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
    node = parent.insertBefore(
      createNode((newVNode = vdomify(newVNode)), isSvg),
      node
    )
    if (oldVNode != null) {
      parent.removeChild(oldVNode.node)
    }
  } else diff: {
    var tmpVKid,
      oldVKid,
      oldKey,
      newKey,
      oldProps = oldVNode.props,
      newProps = newVNode.props,
      oldVKids = oldVNode.children,
      newVKids = newVNode.children,
      oldHead = 0,
      newHead = 0,
      oldTail = oldVKids.length - 1,
      newTail = newVKids.length - 1

    isSvg = isSvg || newVNode.tag === "svg"

    for (var i in { ...oldProps, ...newProps }) {
      if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldProps[i]) !== newProps[i]) {
        patchProperty(node, i, oldProps[i], newProps[i], isSvg)
      }
    }

    if(node.__unsafe_innerHtml) {
      node.innerHTML = node.__unsafe_innerHtml
      break diff;
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldHead])) == null ||
        oldKey !== getKey(newVKids[newHead])
      ) {
        break
      }

      patchNode(
        node,
        oldVKids[oldHead].node,
        oldVKids[oldHead++],
        (newVKids[newHead] = vdomify(newVKids[newHead++])),
        isSvg
      )
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldTail])) == null ||
        oldKey !== getKey(newVKids[newTail])
      ) {
        break
      }

      patchNode(
        node,
        oldVKids[oldTail].node,
        oldVKids[oldTail--],
        (newVKids[newTail] = vdomify(newVKids[newTail--])),
        isSvg
      )
    }

    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(
          createNode((newVKids[newHead] = vdomify(newVKids[newHead++])), isSvg),
          (oldVKid = oldVKids[oldHead]) && oldVKid.node
        )
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        node.removeChild(oldVKids[oldHead++].node)
      }
    } else {
      for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i]
        }
      }

      while (newHead <= newTail) {
        oldKey = getKey((oldVKid = oldVKids[oldHead]))
        newKey = getKey((newVKids[newHead] = vdomify(newVKids[newHead])))

        if (
          newKeyed[oldKey] ||
          (newKey != null && newKey === getKey(oldVKids[oldHead + 1]))
        ) {
          if (oldKey == null) {
            node.removeChild(oldVKid.node)
          }
          oldHead++
          continue
        }

        if (newKey == null || oldVNode.type === SSR_NODE) {
          if (oldKey == null) {
            patchNode(
              node,
              oldVKid && oldVKid.node,
              oldVKid,
              newVKids[newHead],
              isSvg
            )
            newHead++
          }
          oldHead++
        } else {
          if (oldKey === newKey) {
            patchNode(node, oldVKid.node, oldVKid, newVKids[newHead], isSvg)
            newKeyed[newKey] = true
            oldHead++
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patchNode(
                node,
                node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),
                tmpVKid,
                newVKids[newHead],
                isSvg
              )
              newKeyed[newKey] = true
            } else {
              patchNode(
                node,
                oldVKid && oldVKid.node,
                null,
                newVKids[newHead],
                isSvg
              )
            }
          }
          newHead++
        }
      }

      while (oldHead <= oldTail) {
        if (getKey((oldVKid = oldVKids[oldHead++])) == null) {
          node.removeChild(oldVKid.node)
        }
      }

      for (var i in keyed) {
        if (newKeyed[i] == null) {
          node.removeChild(keyed[i].node)
        }
      }
    }
  }
  return (newVNode.node = node)
}

var vdomify = (newVNode) =>
  newVNode !== true && newVNode !== false && newVNode ? newVNode : text("")

var recycleNode = (node) =>
  node.nodeType === TEXT_NODE
    ? text(node.nodeValue, node)
    : createVNode(
      node.nodeName.toLowerCase(),
      EMPTY_OBJ,
      EMPTY_ARR.map.call(node.childNodes, recycleNode),
      SSR_NODE,
      node
    )

const v = Symbol.for("v-node")
var createVNode = (tag, props, children, type, node) => ({
  tag,
  props,
  key: props?.key,
  children,
  type,
  node,
  v,
})

export var text = (value, node) =>
  createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node)

export var _h = (tag, props, children = EMPTY_ARR) =>
  createVNode(tag, props ?? {}, (Array.isArray(children) ? children : [children]))

export function h(type, props, ...children) {
  if (props && typeof props === "object" && v in props) {
    children.unshift(props)
    props = {};
  }
  if (typeof props === "string" || typeof props === "number") {
    children.unshift(text(props))
    props = {}
  }
  if (typeof type === "function") return type(props, children)
  return _h(type, props || {}, children.flatMap((any) =>
    typeof any === "string" || typeof any === "number" ? text(any) : any
  ))
}

export var Fragment = ({ children }) => children

export var renderOptions = undefined;

export var patch = (node, vdom, renderOpt) => (
  renderOptions = renderOpt,
  ((node = patchNode(
    node.parentNode,
    node,
    node.vdom || recycleNode(node),
    vdom
  )).vdom = vdom),
  renderOptions = undefined,
  node
)

export const elementFactory = new Proxy({}, {
  get(target, prop) {
    return (props, children) => h(prop, props, children)
  }
})
