
/**
	* @description This is a function that initializes the blackberry module.
*/
export default function init()
{
	return function (alpine)
	{
		document.querySelectorAll("template").forEach(element =>
		{
			parseTemplate(element, alpine);
		})

		const mutationObserver = new MutationObserver((mutations) =>
		{
			mutations.forEach(mutation =>
			{
				mutation.addedNodes.forEach(node =>
				{
					if (node.tagName === "TEMPLATE")
					{
						parseTemplate(node, alpine);
					}
				})
			})
		})

		mutationObserver.observe(document.body, { childList: true, subtree: true });
	}
}

function parseTemplate(element, alpine)
{
	if (!(typeof element.getAttribute("blackberry") === "string") || element.tagName !== "TEMPLATE") return;

	const tagName = element.getAttribute("tag");
	if (customElements.get(tagName)) return;

	// parse and extract style and setup script's if available
	const script = element.content.querySelector("script[setup]");
	const style = element.content.querySelector("style[scoped]");
	const markup = element.content.querySelector('markup')
	const props = element.getAttribute("props")?.split(",").map(prop => prop.trim()) ?? [];

	define(alpine, tagName, { script, style, markup, props })
}

function define(alpine, tagname, { script, style, markup, props })
{
	if (customElements.get(tagname)) return;

	const scopedSheet = new CSSStyleSheet();
	scopedSheet.replaceSync(style.innerHTML ?? "");
	const sheets = [scopedSheet]

	const setup = new Function('$el', '$props', '$cleanup', "$state", "$effect", `

		${script.innerHTML ?? ""}

		return typeof $data === "undefined" ? {} : $data;
	`);

	customElements.define(tagname, class extends HTMLElement
	{

		static get observedAttributes() { return props }

		props = alpine.reactive({})

		attributeChangedCallback(name, oldValue, newValue)
		{
			if(oldValue === newValue) return;
			this.props[name] = newValue;
		}

		connectedCallback()
		{
			this.attachShadow({ mode: "open" });

			// css
			this.shadowRoot.adoptedStyleSheets = sheets;

			const dataName = 'blackberrycomp' + tagname.replace("-", "")

			if (!alpineDataRegisterMap.has(dataName)) {
				alpineDataRegisterMap.add(dataName);
				const self = this;
				alpine.data(dataName, () => {
					const $cleanup = (...fns) => void this.cleanupFns.push(...fns)
					const $effect = (fn) => void this.effects.push(alpine.effect(fn));
					return {
						init() {
							const data = setup.call(self, self, self.props, $cleanup, alpine.reactive, $effect)
							Object.assign(this, data);
							this.props = self.props
						},
					}
				})
			}

			const el = document.createElement('x-provider')
			el.setAttribute("x-data", dataName);
			for(let x of markup.children) el.appendChild(x.cloneNode(true))
			this.shadowRoot.appendChild(el);
			alpine.initTree(this.shadowRoot);
		}

		cleanupFns = []
		effects = []

		disconnectedCallback()
		{
			this.cleanupFns.forEach(fn => fn());
			this.effects.forEach(fn => alpine.release(fn));
		}
 	})
}

const alpineDataRegisterMap = new Set();
