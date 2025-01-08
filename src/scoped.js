import { reactive, effect } from "../assets/reactivity@3.5.13.js";
import { createElement } from "./vdom.js";

class Expression {
  static Cache = new Map();
  constructor(expression) {
    if (Expression.Cache.has(expression)) { this.call = Expression.Cache.get(expression); }
    const safeFunction = () => {
      try {
        let func = new Function(["scope"], `with (scope) {  return ${expression}; }`)
        Object.defineProperty(func, "name", {
          value: `[expression]: ${expression}`,
        })
        return func
      } catch (error) {
        console.log(`Error while compiling expression: ${expression}`, error)
        return () => ""
      }
    }
    Expression.Cache.set(expression, safeFunction())
    this.call = Expression.Cache.get(expression)
  }
}

function resolveScopePath(key, scope) {
  let segments = key.split(".")
  let value = scope
  for (let segment of segments) {
    value = value[segment]
  }
  return value
}

function compileTemplateNode(element, scope) {

}

function compileNode(element, scope) {
  const tag = element.tagName.toLowerCase()

  if (element.nodeType != 1) {
    return text(element.nodeValue)
  }

  let attributes = { }, children = [];

  for (let attr of element.attributes) {
    let key = attr.nodeName, value = attr.nodeValue;
    if (attr.nodeName[0] === ":") {
      if(attr.nodeName === ":text") {
        children.push(
          createElement(
            () => text(new Expression(attr.nodeValue).call(scope)),
            {}
          )
        )
      } else {
        Object.defineProperty(attributes, attr.nodeName.slice(1), {
          get() {
            return new Expression(attr.nodeValue).call(scope)
          }
        })
      }
    } else {
      attributes[key] = value
    }
  }

  return createElement(() => createElement(tag, attributes, children), {})
}
