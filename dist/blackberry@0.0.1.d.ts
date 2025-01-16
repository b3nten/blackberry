// Generated by dts-bundle-generator v9.5.1

declare class VNode {
}
export declare type HFunction = (tag: string, props: Record<string, any> | VNode | string | number, ...children: any[]) => VNode;
export declare type Fragment = (props: Record<string, any>, ...children: any[]) => VNode;
export declare type RenderFunction = (vnode: VNode, container: Element) => void;
export declare type CSSFunction = (strings: TemplateStringsArray, ...values: string[]) => string;
/**
* @type { import("./types").HFunction }
*/
export let h: HFunction;
/**
* @type { import("./types").Fragment }
*/
declare let Fragment$1: Fragment;
/**
* @type { import("./types").RenderFunction }
*/
export let render: RenderFunction;
declare enum TrackOpTypes {
	GET = "get",
	HAS = "has",
	ITERATE = "iterate"
}
declare enum TriggerOpTypes {
	SET = "set",
	ADD = "add",
	DELETE = "delete",
	CLEAR = "clear"
}
export type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRefSimple<T>;
declare const ReactiveMarkerSymbol: unique symbol;
export interface ReactiveMarker {
	[ReactiveMarkerSymbol]?: void;
}
export type Reactive<T> = UnwrapNestedRefs<T> & (T extends readonly any[] ? ReactiveMarker : {});
/**
 * Returns a reactive proxy of the object.
 *
 * The reactive conversion is "deep": it affects all nested properties. A
 * reactive object also deeply unwraps any properties that are refs while
 * maintaining reactivity.
 *
 * @example
 * ```js
 * const obj = reactive({ count: 0 })
 * ```
 *
 * @param target - The source object.
 * @see {@link https://vuejs.org/api/reactivity-core.html#reactive}
 */
export declare function reactive<T extends object>(target: T): Reactive<T>;
declare const ShallowReactiveMarker: unique symbol;
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export type Builtin = Primitive | Function | Date | Error | RegExp;
export type EffectScheduler = (...args: any[]) => any;
export type DebuggerEvent = {
	effect: Subscriber;
} & DebuggerEventExtraInfo;
export type DebuggerEventExtraInfo = {
	target: object;
	type: TrackOpTypes | TriggerOpTypes;
	key: any;
	newValue?: any;
	oldValue?: any;
	oldTarget?: Map<any, any> | Set<any>;
};
export interface DebuggerOptions {
	onTrack?: (event: DebuggerEvent) => void;
	onTrigger?: (event: DebuggerEvent) => void;
}
export interface ReactiveEffectOptions extends DebuggerOptions {
	scheduler?: EffectScheduler;
	allowRecurse?: boolean;
	onStop?: () => void;
}
/**
 * Subscriber is a type that tracks (or subscribes to) a list of deps.
 */
export interface Subscriber extends DebuggerOptions {
}
declare class ReactiveEffect<T = any> implements Subscriber, ReactiveEffectOptions {
	fn: () => T;
	scheduler?: EffectScheduler;
	onStop?: () => void;
	onTrack?: (event: DebuggerEvent) => void;
	onTrigger?: (event: DebuggerEvent) => void;
	constructor(fn: () => T);
	pause(): void;
	resume(): void;
	run(): T;
	stop(): void;
	trigger(): void;
	get dirty(): boolean;
}
export interface ReactiveEffectRunner<T = any> {
	(): T;
	effect: ReactiveEffect;
}
export interface ReactiveEffectRunner<T = any> {
	(): T;
	effect: ReactiveEffect;
}
export declare function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions): ReactiveEffectRunner<T>;
declare const RefSymbol: unique symbol;
declare const RawSymbol: unique symbol;
export interface Ref<T = any, S = T> {
	get value(): T;
	set value(_: S);
	/**
	 * Type differentiator only.
	 * We need this to be in public d.ts but don't want it to show up in IDE
	 * autocomplete, so we use a private Symbol instead.
	 */
	[RefSymbol]: true;
}
declare const ShallowRefMarker: unique symbol;
export type ShallowRef<T = any, S = T> = Ref<T, S> & {
	[ShallowRefMarker]?: true;
};
/**
 * This is a special exported interface for other packages to declare
 * additional types that should bail out for ref unwrapping. For example
 * \@vue/runtime-dom can declare it like so in its d.ts:
 *
 * ``` ts
 * declare module '@vue/reactivity' {
 *   export interface RefUnwrapBailTypes {
 *     runtimeDOMBailTypes: Node | Window
 *   }
 * }
 * ```
 */
export interface RefUnwrapBailTypes {
}
export type UnwrapRef<T> = T extends ShallowRef<infer V, unknown> ? V : T extends Ref<infer V, unknown> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;
export type UnwrapRefSimple<T> = T extends Builtin | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] | {
	[RawSymbol]?: true;
} ? T : T extends Map<infer K, infer V> ? Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Map<any, any>>> : T extends WeakMap<infer K, infer V> ? WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakMap<any, any>>> : T extends Set<infer V> ? Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Set<any>>> : T extends WeakSet<infer V> ? WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakSet<any>>> : T extends ReadonlyArray<any> ? {
	[K in keyof T]: UnwrapRefSimple<T[K]>;
} : T extends object & {
	[ShallowReactiveMarker]?: never;
} ? {
	[P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>;
} : T;
declare class EffectScope {
	detached: boolean;
	private _isPaused;
	constructor(detached?: boolean);
	get active(): boolean;
	pause(): void;
	/**
	 * Resumes the effect scope, including all child scopes and effects.
	 */
	resume(): void;
	run<T>(fn: () => T): T | undefined;
	stop(fromParent?: boolean): void;
}
/**
 * Creates an effect scope object which can capture the reactive effects (i.e.
 * computed and watchers) created within it so that these effects can be
 * disposed together. For detailed use cases of this API, please consult its
 * corresponding {@link https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md | RFC}.
 *
 * @param detached - Can be used to create a "detached" effect scope.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#effectscope}
 */
export declare function effectScope(detached?: boolean): EffectScope;
/**
 * @description A custom element base class with reactive state and attributes.
 * @extends { HTMLElement }
 */
export class Ivysaur extends HTMLElement {
	/**
	 * @description The css for the element.
	 * @type { string | string[] }
	 */
	static styles: string | string[];
	/**
	 * @description Whether to use global document styles.
	 */
	static use_global_styles: boolean;
	static set useGlobalStyles(val: boolean);
	/**
	 * @description Whether to use global document styles.
	 */
	static get useGlobalStyles(): boolean;
	/**
	 * @description Whether to use light dom. This will disable component
	 * styles and the render function should no longer return vnodes.
	 */
	static light_dom: boolean;
	static set lightDom(val: boolean);
	/**
	 * @description Whether to use light dom. This will disable component
	 * styles and the render function should no longer return vnodes.
	 */
	static get lightDom(): boolean;
	/**
	 * @description Define this element in the custom elements registry. Must contain a '-'.
	 * @param { string } name
	 */
	static define_self(name: string): void;
	/**
	 * @description Define this element in the custom elements registry. Must contain a '-'.
	 * @param { string } name
	 */
	static get defineSelf(): typeof Ivysaur.define_self;
	static get observedAttributes(): string[];
	/**
	 * @description A reactive map of observed attributes.
	 * @readonly
	 * @type { Record<string, string> }
	 */
	readonly observed_attributes: Record<string, string>;
	/**
	 * @description A reactive map of observed attributes.
	 * @type { Record<string, string> }
	 */
	get observedAttributes(): Record<string, string>;
	/**
	 * @internal
	 * @param { string } name
	 * @param { string } oldValue
	 * @param { string } newValue
	 * @returns { void }
	 */
	attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
	/**
	 * @description Get an attribute from the element.
	 * @type { (name: string) => string | null }
	 */
	get_attribute: (name: string) => string | null;
	/**
	 * @description Set an attribute on the element.
	 * @type { (name: string, value: string) => void }
	 */
	set_attribute: (name: string, value: string) => void;
	/**
	 * @description Remove an attribute on the element.
	 * @type { (name: string) => void }
	 */
	remove_attribute: (name: string) => void;
	/**
	 * @description Called when the element is added to the dom, before rendering.
	 */
	on_mount(): void;
	/**
	 * @description Called when the element is added to the dom, before rendering.
	 */
	onMount(): void;
	/**
	 * @description Called when the element is added to the dom, after rendering.
	 */
	on_mounted(): void;
	/**
	 * @description Called when the element is added to the dom, after rendering.
	 */
	onMounted(): void;
	/**
	 * @description Called when the element is removed from the dom.
	 */
	on_unmount(): void;
	/**
	 * @description Called when the element is removed from the dom.
	 */
	onUnmount(): void;
	/**
	 * @description The render method for the element. Must return a VNode from h() or compiled JSX.
	 * @returns { import("./types").VNode }
	 */
	render(): VNode;
	/**
	 * @internal
	 */
	connectedCallback(): void;
	/**
	 * @protected
	 * @type { ReturnType<import("./reactive").effectScope> }
	 */
	protected _rootEffectScope: ReturnType<typeof effectScope>;
	/**
	 * @internal
	 */
	disconnectedCallback(): void;
	/**
	 * @protected
	 * @param { Error } e - The error to log & throw in dev.
	 * @param { string } method - The method that the error occurred in.
	 */
	protected _log_error: (e: Error, method: string) => void;
	/**
	 * @protected
	 */
	protected _construct_shadow_dom(): void;
	raw_styles: string[];
	root_node: HTMLElement;
	/**
	 * @protected
	 * @type { Record<string, any> }
	 */
	protected _reactive_states: Record<string, any>;
}
/**
 * @type { import("./types").CSSFunction }
 */
export let css: CSSFunction;
export function state(): <This, T>(value: ClassAccessorDecoratorTarget<This, T>, context: ClassAccessorDecoratorContext<This, T>) => void;
export function attribute<T>(name: string, options?: {
	converter?: (val: string | null | undefined) => T;
}): <This, T_1>(value: ClassAccessorDecoratorTarget<This, T_1> | Function, context: ClassAccessorDecoratorContext<This, T_1> | ClassGetterDecoratorContext<This, T_1>) => void;
/**
 * @function set_dev
 * @description Set the runtime mode of ivysaur
 * @param { boolean } val
 */
export function set_dev(val: boolean): boolean;
/**
 * @description The runtime mode of ivysaur
 * @type { boolean }
 */
export let IS_DEV: boolean;
declare let mod: () => void;

export {
	Ivysaur as ivysaur,
	mod as default,
	set_dev as setDev,
};

export {};
