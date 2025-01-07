declare class VNode{}

export declare abstract class BlackberryElement extends HTMLElement {
  static styles: string;
  static useGlobalStyles: boolean;
  static define(name: string): void;
  attrs: Record<string, string>;
  abstract render(): VNode;
  onMount?(): void;
  onMounted?(): void;
  onUnmount?(): void;
}

declare type ReactiveInput = {
  effect: typeof import("../assets/reactivity@3.5.13").effect,
  reactive: typeof import("../assets/reactivity@3.5.13").reactive,
};

export const h: (tag: string, props: Record<string, any> | VNode | string | number, ...children: any[]) => VNode;
export const text: (value: string | number) => VNode;
export const css: (strings: TemplateStringsArray, ...values: string[]) => string;
export const Fragment: (props: Record<string, any>, ...children: any[]) => VNode;
export const elementFactory: (tag: string) => (props: Record<string, any>, ...children: any[]) => VNode;
export const CreateBlackberryElement: (reactivity: ReactiveInput) => typeof BlackberryElement;
export const state: <This, T>(
  value: ClassAccessorDecoratorTarget<This, T>,
  context: ClassAccessorDecoratorContext<This, T>,
) => void;
export const attribute: <This, T>(
  value: ClassAccessorDecoratorTarget<This, T>,
  context: ClassAccessorDecoratorContext<This, T>,
) => void;
