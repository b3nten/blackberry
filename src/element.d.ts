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

export const Component: typeof BlackberryElement;

export const h: (tag: string, props: Record<string, any> | VNode | string | number, ...children: any[]) => VNode;

export const text: (value: string | number) => VNode;

export const css: (strings: TemplateStringsArray, ...values: string[]) => string;

export const Fragment: (props: Record<string, any>, ...children: any[]) => VNode;

export const elementFactory: (tag: string) => (props: Record<string, any>, ...children: any[]) => VNode;

export const state: () => <This, T>(
  value: ClassAccessorDecoratorTarget<This, T>,
  context: ClassAccessorDecoratorContext<This, T>,
) => void;

export const attribute: (name: string) => <This, T>(
  value: ClassAccessorDecoratorTarget<This, T> | Function,
  context: ClassAccessorDecoratorContext<This, T> | ClassGetterDecoratorContext<This, T>,
) => void;

export const component: (name: string) => <Class extends abstract new (...args: any) => any = abstract new (...args: any) => any>(
  value: Class,
  context: ClassDecoratorContext<Class>,
) => Class | void;
