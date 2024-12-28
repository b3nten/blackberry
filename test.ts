import Blackberry from "./src/blackberry"

Blackberry.defineComponent({
    tag: "defined-component",
    render: ({ state, store, effect, cleanup }) => {
        let count = store({ value: 0 })
        state.countLol = 0
        effect(() => console.log("count changed", count.value))
        cleanup(() => console.log("bye"))
        return () => Blackberry.html`
						<button @click="${() => count.value++}">
							count: ${count.value}
							countLol: ${state.countLol}
						</button>
					`
    },
    style: Blackberry.css`
					button { color: red; }
				`
})