import { isLazy, Lazy, unwrap } from "./renderer.js";
import { h, text } from "./vdom.js"

export function compile(element, scope = {}) {

  if(Array.isArray(element)) {
    return element.map(e => compile(e, scope))
  }

  if (element.nodeType != 1) {
    return new Lazy(() => text(element.nodeValue))
  }

  let tag = element.tagName.toLowerCase()

  let attributes = {};
  let children = [];

  const resolveScopePath = (key, scope) => {
    let segments = key.split(".")
    let value = scope
    for(let segment of segments) {
      value = value[segment]
    }
    return value
  }

  for(let attr of element.attributes) {
    if (attr.nodeName[0] === ":") {
      if(attr.nodeName === ":text") {
        children.push(new Lazy(() => text(resolveScopePath(attr.nodeValue, scope))))
      } else {
        attributes[attr.nodeName.slice(1)] = new Lazy(() => resolveScopePath(attr.nodeValue, scope))
      }
    } else if (attr.nodeName[0] === "@") {
      attributes["on" + attr.nodeName.slice(1)] = new Lazy(() => resolveScopePath(attr.nodeValue, scope))
    } else {
      attributes[attr.nodeName] = attr.nodeValue
    }
  }

  children.concat(Array.from((tag == 'template' ? element.content : element).childNodes))

  for (let i = 0; i < children.length; i++) {
    if(children[i] instanceof Lazy) continue;
    children[i] = compile(children[i])
  }

  return new Lazy(() => h(tag, attributes, ...children))
}

export function renderVirtual(lazy) {
  if(Array.isArray(lazy)) {
    return lazy.map(l => renderVirtual(l))
  }

  let vnode = unwrap(lazy)

  if(vnode.props) {
    for(let k in vnode.props) {
      if(vnode.props[k] instanceof Lazy) {
        vnode.props[k] = unwrap(vnode.props[k])
      }
    }
    vnode.children = vnode.children.map(c => renderVirtual(c))
  }

  return vnode
}
