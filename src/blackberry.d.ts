type RenderContext = {
    state: Record<PropertyKey, any>,
    attributes: Record<PropertyKey, any>,
    props: Record<PropertyKey, any>,
}

type RenderFn<Props> = (ctx: {
    element: HTMLElement,
    state: Record<PropertyKey, any>,
    attributes: Record<PropertyKey, any>,
    props: Partial<Props>,
    cleanup: (f: Function) => void,
    effect: (f: Function) => void,
    store: <T>(x: T) => T,
}) => (renderCtx: RenderContext) => void;

type DefineComponentArgs<Props> = {
    tag: string,
    attributes?: string[],
    style?: string,
    render: RenderFn<Props>
}

declare const blackberry: {
    alpinePlugin: () => (alpine: any) => void;
    defineComponent: <Props extends Record<PropertyKey, any>>(args: DefineComponentArgs<Props>) => (props: Props, ...children: any) => any,
    html: (strings: TemplateStringsArray, ...values: any[]) => string,
    css: (strings: TemplateStringsArray, ...values: any[]) => string,
}

export default blackberry;
