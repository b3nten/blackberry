const SSR_NODE = 1, TEXT_NODE = 3, EMPTY_OBJ = {}, EMPTY_ARR = [], SVG_NS = "http://www.w3.org/2000/svg"

let renderContext = null;

class VirtualNode {
  constructor(tag, props, children, type, node) {
    this.tag = tag;
    this.props = props;
    this.key = props.key;
    this.children = props.children ?? children;
    this.type = type;
    this.node = node;
  }
}

function listenerDelegate(event) {
  this.events[event.type](event)
}

let isStrNum = (x) => typeof x === "string" || typeof x === "number"

let getKey = (vdom) => (vdom == null ? vdom : vdom.key)

function patchProperty(node, key, oldValue, newValue, isSvg) {
  if (key === "key" || key === "unsafeInnerHtml") {
  } else if (key === "ref" && typeof newValue === "object") {
    newValue.value = node
  } else if (key[0] === "o" && key[1] === "n") {
    let host = renderContext.host ?? node;
    if (
      !((node.events ?? (node.events = {}))[(key = key.slice(2))] = newValue ? (e) => newValue.call(host, e) : undefined)
    ) {
      node.removeEventListener(key, listenerDelegate)
    } else if (!oldValue) {
      node.addEventListener(key, listenerDelegate)
    }
  } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
    node[key] = newValue == null ? "" : newValue
  } else if (newValue == null || newValue === false) {
    node.removeAttribute(key)
  } else {
    node.setAttribute(key, newValue)
  }
}

function createNode(vdom, isSvg) {
  let props = vdom.props,
    node = vdom.type === TEXT_NODE
      ? document.createTextNode(vdom.tag)
      : (isSvg = isSvg || vdom.tag === "svg")
        ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is })
        : document.createElement(vdom.tag, { is: props.is })

  for (let k in props) {
    patchProperty(node, k, null, props[k], isSvg)
  }

  if (props.unsafeInnerHtml) {
    node.innerHTML = props.unsafeInnerHtml
  } else {
    for (let i = 0; i < vdom.children.length; i++) {
      node.appendChild(
        createNode((vdom.children[i] = vdomify(vdom.children[i])), isSvg)
      )
    }
  }

  return (vdom.node = node)
}

let vdomify = (newVNode) => newVNode !== true && newVNode !== false && newVNode ? newVNode : text("")

let recycleNode = (node) =>
  node.nodeType === TEXT_NODE ?
    text(node.nodeValue, node)
    : new VirtualNode(node.nodeName.toLowerCase(), EMPTY_OBJ, EMPTY_ARR.map.call(node.childNodes, recycleNode), SSR_NODE, node)

export function patchChildren(node, oldVKids, newVKids, isSvg) {
  let tmpVKid,
    oldVKid,
    oldKey,
    newKey,
    oldHead = 0,
    newHead = 0,
    oldTail = oldVKids.length - 1,
    newTail = newVKids.length - 1

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

function patchNode(parent, node, oldVNode, newVNode, isSvg) {
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
  } else diffChildren: {
    let tmpVKid,
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

    for (let i in { ...oldProps, ...newProps }) {
      if (
        (i === "value" || i === "selected" || i === "checked"
          ? node[i]
          : oldProps[i]) !== newProps[i]
      ) {
        patchProperty(node, i, oldProps[i], newProps[i], isSvg)
      }
    }

    if (newProps.unsafeInnerHtml) {
      node.innerHTML = newProps.unsafeInnerHtml;
      break diffChildren;
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

export let text = (value, node) => new VirtualNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node)

export let createElement = (tag, props, children = EMPTY_ARR) => new VirtualNode(tag, props, Array.isArray(children) ? children : [children])

export let h = (type, props, ...children) => typeof type === "function"
  ? type(props, children)
  : createElement(type, props ?? {}, children.flatMap((any) => isStrNum(any) ? text(any) : any))


export function render(element, vdom, ctx = {}) {
  renderContext = ctx
  let node = patchNode(
    element.parentNode,
    element,
    element.vdom || recycleNode(element),
    vdom
  )
  node.vdom = vdom;
  renderContext = null;
  return node;
}
