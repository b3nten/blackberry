type RenderContext = {
    state: Record<PropertyKey, any>,
    attributes: Record<PropertyKey, any>,
    props: Record<PropertyKey, any>,
}

type RenderFn = (ctx: {
    element: HTMLElement,
    state: Record<PropertyKey, any>,
    attributes: Record<PropertyKey, any>,
    props: Record<PropertyKey, any>,
    cleanup: (f: Function) => void,
    effect: (f: Function) => void,
    store: <T>(x: T) => T,
}) => (renderCtx: RenderContext) => void;

type DefineComponentArgs = {
    tag: string,
    attributes?: string[],
    style?: string,
    render: RenderFn
}

declare const blackberry: {
    alpinePlugin: () => (alpine: any) => void;
    defineComponent: (args: DefineComponentArgs) => void,
    html: (strings: TemplateStringsArray, ...values: any[]) => string,
    css: (strings: TemplateStringsArray, ...values: any[]) => string,
}

export default blackberry;