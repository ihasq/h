const PTR_BUFFER = {}

export const h = new Proxy((value, setterFn) => {

	const PTR = Symbol("");

	Object.defineProperty(h, PTR, {
		get() {
			
		}
	})

	return {
		toString() {
			return PTR;
		}
	}
}, {
	get(_, prop) {
		
	}
});

const Main = () => {

	const inputValue = h("", { open: true });

	return (
		h.div(
			h.input({ type: "text", value: inputValue }),
			h.button({ [on.click]: () => console.log(h[inputValue]) }),
		)
	)
}

export const on = Object.assign(h((value, ref) => {}), {
	click: h((value, ref) => ref.addEventListener("click", ))
})