import * as uhtml from "../assets/uhtml@4.5.11.js";

globalThis.BlackberryLogo = "data:image/png;base64,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"

typeof window !== undefined &&
console.info(
	"%c %c Built with Blackberry.js",
	`padding-left: 136px; line-height: 136px; background-image: url("${globalThis.BlackberryLogo}"); background-size: 132px; background-repeat: no-repeat; background-position: 2px 2px`,
	"background: #2e3440; border-radius:0.5em; padding:.25rem; font-size:1rem; color:#d8dee9; font-family:sans-serif;",
);

function createAlpinePlugin() {
	return function (alpine) {

		let startingWith = (subject, replacement) => ({ name, value }) => {
			if (name.startsWith(subject)) name = name.replace(subject, replacement)
			return { name, value }
		}

		alpine.mapAttributes(startingWith('.', "x-prop:"))
		alpine.mapAttributes(startingWith('?', "x-bind:"))

		alpine.directive('prop', (el, { value, expression }, { effect, evaluateLater }) => {
			let exp = evaluateLater(expression)
			el.props = alpine.reactive({})
			effect(() => {
				exp((r) => void (el.props.value = r))
			})
		})

		document.querySelectorAll("template").forEach((element) => parseTemplateFromHtml(element, alpine));

		const mutationObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.tagName === "TEMPLATE") {
						parseTemplateFromHtml(node, alpine);
					}
				});
			});
		});
		mutationObserver.observe(document.body, { childList: true, subtree: true });
	};
}

function parseTemplateFromHtml(element, alpine) {
	if (!(typeof element.getAttribute("blackberry") === "string") || element.tagName !== "TEMPLATE") return;

	let tagName = element.getAttribute("blackberry");
	if (customElements.get(tagName)) return;

	let script = "", style = "";
	let els = []
	for(let child of element.content.children) {
		if (child.tagName === "SCRIPT") {
			script += child.innerHTML;
			els.push(child)
		} else if (child.tagName === "STYLE") {
			style += child.innerText;
			els.push(child)
		}
	}

	els.forEach(el => el.remove())

	const markup = element.content;
	const attrs = element.getAttribute("attributes")?.split(",").map((prop) => prop.trim()) ?? [];
	element.remove()
	createComponentFromTemplate(alpine, tagName, { script, style, markup, attrs });
}

function createComponentFromTemplate(alpine, tagname, { script, style, markup, attrs }) {
	if (customElements.get(tagname)) return;

	const scopedSheet = new CSSStyleSheet();
	scopedSheet.replaceSync(style ?? "");
	const sheets = [scopedSheet];

	const setup = typeof script === "function" ? script : new Function("$element", "$state", "$attributes", "$props", "$cleanup", "$store", "$effect", script );

	customElements.define(
		tagname,
		class extends HTMLElement {
			static get observedAttributes() {
				return attrs;
			}

			attrs = alpine.reactive({});

			attributeChangedCallback(name, oldValue, newValue) {
				if (oldValue === newValue) return;
				this.attrs[name] = newValue;
			}

			constructor() {
				super();

				const register = () => {

					this.attachShadow({mode: "open"});
					this.shadowRoot.adoptedStyleSheets = sheets;

					const dataName = "blackberry_" + tagname.replace("-", "");

					if (!alpineDataRegisterMap.has(dataName)) {
						const self = this;
						alpine.data(dataName, () => {
							const $cleanup = (...fns) => void this.cleanupFns.push(...fns);
							const $effect = (fn) => void this.effects.push(alpine.effect(fn));
							return {
								data: alpine.reactive({}),
								init() {
									setup.call(
										self, // CONTEXT
										self, // $el
										this, // $data
										self.attrs, // attributes
										self.props, // props
										$cleanup, // cleanup
										alpine.reactive, // state
										$effect, // effect
									);
								},
							};
						});
						alpineDataRegisterMap.add(dataName);
					}

					const el = document.createElement("blackberry-provider");
					el.setAttribute("x-data", dataName);

					if (typeof markup === "string") {
						el.innerHTML = markup;
					} else {
						for (let x of markup.children) el.appendChild(x.cloneNode(true));
					}

					queueMicrotask(() => {
						this.shadowRoot.appendChild(el);
						alpine.initTree(this.shadowRoot.children[0]);
					})
				}

				register();
			}

			cleanupFns = [];
			effects = [];

			disconnectedCallback() {
				this.cleanupFns.forEach((fn) => fn());
				this.effects.forEach((fn) => alpine.release(fn));
				alpine.destroyTree(this.shadowRoot.children[0]);
			}
		},
	);
}

function defineComponent({ tag, style, attributes, render }, alpine = window.Alpine) {

	if(customElements.get(tag)) return;

	const sheet = new CSSStyleSheet();
	sheet.replaceSync(style);

	customElements.define(tag, class extends HTMLElement {

		props = alpine.reactive({});
		attributes = alpine.reactive({});

		static get observedAttributes() {
			return attributes;
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue === newValue) return;
			this.attributes[name] = newValue;
		}

		constructor() {
			super();
			this.attachShadow({ mode: "open" });
			this.shadowRoot.adoptedStyleSheets = [sheet];
		}

		connectedCallback() {
			const cleanup = (...cleanup) => {
				this.cleanupFns.push(...cleanup);
			}
			const effect = (fn) => {
				this.effects.push(alpine.effect(fn));
			}
			const state = alpine.reactive({});
			const templateFn = render({
				element: this,
				state,
				attributes: this.attributes,
				props: this.props,
				cleanup,
				effect,
				store: alpine.reactive,
			});
			const renderFn = uhtml.reactive(alpine.effect)
			renderFn(this.shadowRoot, () => templateFn({ state, attributes: this.attributes, props: this.props }));
		}

		disconnectedCallback() {
			this.cleanupFns.forEach((fn) => fn());
			this.effects.forEach((fn) => alpine.release(fn));
		}

		cleanupFns = [];
		effects = [];
	})
}

const alpineDataRegisterMap = new Set();

export default {
	alpinePlugin: createAlpinePlugin,
	defineComponent,
	html: uhtml.html,
	css: String.raw,
	svg: uhtml.svg,
}