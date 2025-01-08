import { Component, ref } from "./element.js";
import { h } from "./vdom";

const root = document.createElement("jsx-root");
document.body.prepend(root);

const count = ref(0);

const counterProvider = () => {
  return h(counter, { count })
}

const counter = ({ count }) => {
  return h("button", { onclick: () => count.value++ }, `the count is ${count.value}`)
}

class Test extends Component {

  render() {
    if(count.value > 5) {
      return h("div", {}, [
        h("p", {}, "The count is greater than 5",
          h("div", {}, [
            h(counterProvider, {}, [])
          ])
        )
      ])
    }
    return h("div", {}, [
      h(counterProvider, {}, [])
    ])
  }
}

Test.define("jsx-test")
root.appendChild(document.createElement("jsx-test"))
