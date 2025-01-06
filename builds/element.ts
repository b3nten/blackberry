import { reactive, effect } from "../assets/reactivity@3.5.13.js"
import { CreateBlackberryElement } from "../src/element.js"

// js api
export const BlackberryElement = CreateBlackberryElement({ reactive, effect });
export const Component = BlackberryElement;
export * from "../src/element.js"
// reactivity api
export * from "../assets/reactivity@3.5.13.js";
