/* esm.sh - esbuild bundle(alpinejs@3.14.7) es2022 production */
var $e = !1,
	Pe = !1,
	N = [],
	Re = -1;
function Jn(e) {
	Vn(e);
}
function Vn(e) {
	N.includes(e) || N.push(e), Gn();
}
function Yn(e) {
	let t = N.indexOf(e);
	t !== -1 && t > Re && N.splice(t, 1);
}
function Gn() {
	!Pe && !$e && (($e = !0), queueMicrotask(Xn));
}
function Xn() {
	($e = !1), (Pe = !0);
	for (let e = 0; e < N.length; e++) N[e](), (Re = e);
	(N.length = 0), (Re = -1), (Pe = !1);
}
var q,
	D,
	W,
	It,
	je = !0;
function Zn(e) {
	(je = !1), e(), (je = !0);
}
function Qn(e) {
	(q = e.reactive),
		(W = e.release),
		(D = (t) =>
			e.effect(t, {
				scheduler: (n) => {
					je ? Jn(n) : n();
				},
			})),
		(It = e.raw);
}
function gt(e) {
	D = e;
}
function er(e) {
	let t = () => {};
	return [
		(r) => {
			let i = D(r);
			return (
				e._x_effects ||
					((e._x_effects = new Set()),
					(e._x_runEffects = () => {
						e._x_effects.forEach((o) => o());
					})),
				e._x_effects.add(i),
				(t = () => {
					i !== void 0 && (e._x_effects.delete(i), W(i));
				}),
				i
			);
		},
		() => {
			t();
		},
	];
}
function $t(e, t) {
	let n = !0,
		r,
		i = D(() => {
			let o = e();
			JSON.stringify(o),
				n
					? (r = o)
					: queueMicrotask(() => {
							t(o, r), (r = o);
						}),
				(n = !1);
		});
	return () => W(i);
}
var Pt = [],
	Rt = [],
	jt = [];
function tr(e) {
	jt.push(e);
}
function Ve(e, t) {
	typeof t == "function"
		? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
		: ((t = e), Rt.push(t));
}
function Nt(e) {
	Pt.push(e);
}
function Lt(e, t, n) {
	e._x_attributeCleanups || (e._x_attributeCleanups = {}),
		e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
		e._x_attributeCleanups[t].push(n);
}
function kt(e, t) {
	e._x_attributeCleanups &&
		Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
			(t === void 0 || t.includes(n)) &&
				(r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
		});
}
function nr(e) {
	for (e._x_effects?.forEach(Yn); e._x_cleanups?.length; )
		e._x_cleanups.pop()();
}
var Ye = new MutationObserver(Qe),
	Ge = !1;
function Xe() {
	Ye.observe(document, {
		subtree: !0,
		childList: !0,
		attributes: !0,
		attributeOldValue: !0,
	}),
		(Ge = !0);
}
function Ft() {
	rr(), Ye.disconnect(), (Ge = !1);
}
var G = [];
function rr() {
	let e = Ye.takeRecords();
	G.push(() => e.length > 0 && Qe(e));
	let t = G.length;
	queueMicrotask(() => {
		if (G.length === t) for (; G.length > 0; ) G.shift()();
	});
}
function g(e) {
	if (!Ge) return e();
	Ft();
	let t = e();
	return Xe(), t;
}
var Ze = !1,
	_e = [];
function ir() {
	Ze = !0;
}
function or() {
	(Ze = !1), Qe(_e), (_e = []);
}
function Qe(e) {
	if (Ze) {
		_e = _e.concat(e);
		return;
	}
	let t = [],
		n = new Set(),
		r = new Map(),
		i = new Map();
	for (let o = 0; o < e.length; o++)
		if (
			!e[o].target._x_ignoreMutationObserver &&
			(e[o].type === "childList" &&
				(e[o].removedNodes.forEach((s) => {
					s.nodeType === 1 && s._x_marker && n.add(s);
				}),
				e[o].addedNodes.forEach((s) => {
					if (s.nodeType === 1) {
						if (n.has(s)) {
							n.delete(s);
							return;
						}
						s._x_marker || t.push(s);
					}
				})),
			e[o].type === "attributes")
		) {
			let s = e[o].target,
				a = e[o].attributeName,
				u = e[o].oldValue,
				c = () => {
					r.has(s) || r.set(s, []),
						r.get(s).push({ name: a, value: s.getAttribute(a) });
				},
				l = () => {
					i.has(s) || i.set(s, []), i.get(s).push(a);
				};
			s.hasAttribute(a) && u === null
				? c()
				: s.hasAttribute(a)
					? (l(), c())
					: l();
		}
	i.forEach((o, s) => {
		kt(s, o);
	}),
		r.forEach((o, s) => {
			Pt.forEach((a) => a(s, o));
		});
	for (let o of n) t.some((s) => s.contains(o)) || Rt.forEach((s) => s(o));
	for (let o of t) o.isConnected && jt.forEach((s) => s(o));
	(t = null), (n = null), (r = null), (i = null);
}
function Bt(e) {
	return ie(z(e));
}
function re(e, t, n) {
	return (
		(e._x_dataStack = [t, ...z(n || e)]),
		() => {
			e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
		}
	);
}
function z(e) {
	return e._x_dataStack
		? e._x_dataStack
		: typeof ShadowRoot == "function" && e instanceof ShadowRoot
			? z(e.host)
			: e.parentNode
				? z(e.parentNode)
				: [];
}
function ie(e) {
	return new Proxy({ objects: e }, sr);
}
var sr = {
	ownKeys({ objects: e }) {
		return Array.from(new Set(e.flatMap((t) => Object.keys(t))));
	},
	has({ objects: e }, t) {
		return t == Symbol.unscopables
			? !1
			: e.some(
					(n) =>
						Object.prototype.hasOwnProperty.call(n, t) ||
						Reflect.has(n, t),
				);
	},
	get({ objects: e }, t, n) {
		return t == "toJSON"
			? ar
			: Reflect.get(e.find((r) => Reflect.has(r, t)) || {}, t, n);
	},
	set({ objects: e }, t, n, r) {
		let i =
				e.find((s) => Object.prototype.hasOwnProperty.call(s, t)) ||
				e[e.length - 1],
			o = Object.getOwnPropertyDescriptor(i, t);
		return o?.set && o?.get ? o.set.call(r, n) || !0 : Reflect.set(i, t, n);
	},
};
function ar() {
	return Reflect.ownKeys(this).reduce(
		(t, n) => ((t[n] = Reflect.get(this, n)), t),
		{},
	);
}
function Dt(e) {
	let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null,
		n = (r, i = "") => {
			Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(
				([o, { value: s, enumerable: a }]) => {
					if (
						a === !1 ||
						s === void 0 ||
						(typeof s == "object" && s !== null && s.__v_skip)
					)
						return;
					let u = i === "" ? o : `${i}.${o}`;
					typeof s == "object" && s !== null && s._x_interceptor
						? (r[o] = s.initialize(e, u, o))
						: t(s) && s !== r && !(s instanceof Element) && n(s, u);
				},
			);
		};
	return n(e);
}
function Kt(e, t = () => {}) {
	let n = {
		initialValue: void 0,
		_x_interceptor: !0,
		initialize(r, i, o) {
			return e(
				this.initialValue,
				() => ur(r, i),
				(s) => Ne(r, i, s),
				i,
				o,
			);
		},
	};
	return (
		t(n),
		(r) => {
			if (typeof r == "object" && r !== null && r._x_interceptor) {
				let i = n.initialize.bind(n);
				n.initialize = (o, s, a) => {
					let u = r.initialize(o, s, a);
					return (n.initialValue = u), i(o, s, a);
				};
			} else n.initialValue = r;
			return n;
		}
	);
}
function ur(e, t) {
	return t.split(".").reduce((n, r) => n[r], e);
}
function Ne(e, t, n) {
	if ((typeof t == "string" && (t = t.split(".")), t.length === 1))
		e[t[0]] = n;
	else {
		if (t.length === 0) throw error;
		return e[t[0]] || (e[t[0]] = {}), Ne(e[t[0]], t.slice(1), n);
	}
}
var zt = {};
function S(e, t) {
	zt[e] = t;
}
function Le(e, t) {
	let n = cr(t);
	return (
		Object.entries(zt).forEach(([r, i]) => {
			Object.defineProperty(e, `$${r}`, {
				get() {
					return i(t, n);
				},
				enumerable: !1,
			});
		}),
		e
	);
}
function cr(e) {
	let [t, n] = Vt(e),
		r = { interceptor: Kt, ...t };
	return Ve(e, n), r;
}
function lr(e, t, n, ...r) {
	try {
		return n(...r);
	} catch (i) {
		ne(i, e, t);
	}
}
function ne(e, t, n = void 0) {
	(e = Object.assign(e ?? { message: "No error message given." }, {
		el: t,
		expression: n,
	})),
		console.warn(
			`Alpine Expression Error: ${e.message}

${
	n
		? 'Expression: "' +
			n +
			`"

`
		: ""
}`,
			t,
		),
		setTimeout(() => {
			throw e;
		}, 0);
}
var de = !0;
function Ht(e) {
	let t = de;
	de = !1;
	let n = e();
	return (de = t), n;
}
function L(e, t, n = {}) {
	let r;
	return m(e, t)((i) => (r = i), n), r;
}
function m(...e) {
	return qt(...e);
}
var qt = Wt;
function fr(e) {
	qt = e;
}
function Wt(e, t) {
	let n = {};
	Le(n, e);
	let r = [n, ...z(e)],
		i = typeof t == "function" ? dr(r, t) : _r(r, t, e);
	return lr.bind(null, e, t, i);
}
function dr(e, t) {
	return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
		let o = t.apply(ie([r, ...e]), i);
		he(n, o);
	};
}
var Oe = {};
function pr(e, t) {
	if (Oe[e]) return Oe[e];
	let n = Object.getPrototypeOf(async function () {}).constructor,
		r =
			/^[\n\s]*if.*\(.*\)/.test(e.trim()) ||
			/^(let|const)\s/.test(e.trim())
				? `(async()=>{ ${e} })()`
				: e,
		o = (() => {
			try {
				let s = new n(
					["__self", "scope"],
					`with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`,
				);
				return (
					Object.defineProperty(s, "name", {
						value: `[Alpine] ${e}`,
					}),
					s
				);
			} catch (s) {
				return ne(s, t, e), Promise.resolve();
			}
		})();
	return (Oe[e] = o), o;
}
function _r(e, t, n) {
	let r = pr(t, n);
	return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
		(r.result = void 0), (r.finished = !1);
		let a = ie([o, ...e]);
		if (typeof r == "function") {
			let u = r(r, a).catch((c) => ne(c, n, t));
			r.finished
				? (he(i, r.result, a, s, n), (r.result = void 0))
				: u
						.then((c) => {
							he(i, c, a, s, n);
						})
						.catch((c) => ne(c, n, t))
						.finally(() => (r.result = void 0));
		}
	};
}
function he(e, t, n, r, i) {
	if (de && typeof t == "function") {
		let o = t.apply(n, r);
		o instanceof Promise
			? o.then((s) => he(e, s, n, r)).catch((s) => ne(s, i, t))
			: e(o);
	} else
		typeof t == "object" && t instanceof Promise
			? t.then((o) => e(o))
			: e(t);
}
var et = "x-";
function U(e = "") {
	return et + e;
}
function hr(e) {
	et = e;
}
var ge = {};
function y(e, t) {
	return (
		(ge[e] = t),
		{
			before(n) {
				if (!ge[n]) {
					console.warn(
						String.raw`Cannot find directive \`${n}\`. \`${e}\` will use the default order of execution`,
					);
					return;
				}
				let r = j.indexOf(n);
				j.splice(r >= 0 ? r : j.indexOf("DEFAULT"), 0, e);
			},
		}
	);
}
function gr(e) {
	return Object.keys(ge).includes(e);
}
function tt(e, t, n) {
	if (((t = Array.from(t)), e._x_virtualDirectives)) {
		let o = Object.entries(e._x_virtualDirectives).map(([a, u]) => ({
				name: a,
				value: u,
			})),
			s = Ut(o);
		(o = o.map((a) =>
			s.find((u) => u.name === a.name)
				? { name: `x-bind:${a.name}`, value: `"${a.value}"` }
				: a,
		)),
			(t = t.concat(o));
	}
	let r = {};
	return t
		.map(Xt((o, s) => (r[o] = s)))
		.filter(Qt)
		.map(vr(r, n))
		.sort(br)
		.map((o) => yr(e, o));
}
function Ut(e) {
	return Array.from(e)
		.map(Xt())
		.filter((t) => !Qt(t));
}
var ke = !1,
	Q = new Map(),
	Jt = Symbol();
function xr(e) {
	ke = !0;
	let t = Symbol();
	(Jt = t), Q.set(t, []);
	let n = () => {
			for (; Q.get(t).length; ) Q.get(t).shift()();
			Q.delete(t);
		},
		r = () => {
			(ke = !1), n();
		};
	e(n), r();
}
function Vt(e) {
	let t = [],
		n = (a) => t.push(a),
		[r, i] = er(e);
	return (
		t.push(i),
		[
			{
				Alpine: oe,
				effect: r,
				cleanup: n,
				evaluateLater: m.bind(m, e),
				evaluate: L.bind(L, e),
			},
			() => t.forEach((a) => a()),
		]
	);
}
function yr(e, t) {
	let n = () => {},
		r = ge[t.type] || n,
		[i, o] = Vt(e);
	Lt(e, t.original, o);
	let s = () => {
		e._x_ignore ||
			e._x_ignoreSelf ||
			(r.inline && r.inline(e, t, i),
			(r = r.bind(r, e, t, i)),
			ke ? Q.get(Jt).push(r) : r());
	};
	return (s.runCleanups = o), s;
}
var Yt =
		(e, t) =>
		({ name: n, value: r }) => (
			n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }
		),
	Gt = (e) => e;
function Xt(e = () => {}) {
	return ({ name: t, value: n }) => {
		let { name: r, value: i } = Zt.reduce((o, s) => s(o), {
			name: t,
			value: n,
		});
		return r !== t && e(r, t), { name: r, value: i };
	};
}
var Zt = [];
function nt(e) {
	Zt.push(e);
}
function Qt({ name: e }) {
	return en().test(e);
}
var en = () => new RegExp(`^${et}([^:^.]+)\\b`);
function vr(e, t) {
	return ({ name: n, value: r }) => {
		let i = n.match(en()),
			o = n.match(/:([a-zA-Z0-9\-_:]+)/),
			s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
			a = t || e[n] || n;
		return {
			type: i ? i[1] : null,
			value: o ? o[1] : null,
			modifiers: s.map((u) => u.replace(".", "")),
			expression: r,
			original: a,
		};
	};
}
var Fe = "DEFAULT",
	j = [
		"ignore",
		"ref",
		"data",
		"id",
		"anchor",
		"bind",
		"init",
		"for",
		"model",
		"modelable",
		"transition",
		"show",
		"if",
		Fe,
		"teleport",
	];
function br(e, t) {
	let n = j.indexOf(e.type) === -1 ? Fe : e.type,
		r = j.indexOf(t.type) === -1 ? Fe : t.type;
	return j.indexOf(n) - j.indexOf(r);
}
function ee(e, t, n = {}) {
	e.dispatchEvent(
		new CustomEvent(t, {
			detail: n,
			bubbles: !0,
			composed: !0,
			cancelable: !0,
		}),
	);
}
function B(e, t) {
	if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
		Array.from(e.children).forEach((i) => B(i, t));
		return;
	}
	let n = !1;
	if ((t(e, () => (n = !0)), n)) return;
	let r = e.firstElementChild;
	for (; r; ) B(r, t, !1), (r = r.nextElementSibling);
}
function E(e, ...t) {
	console.warn(`Alpine Warning: ${e}`, ...t);
}
var xt = !1;
function mr() {
	xt &&
		E(
			"Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.",
		),
		(xt = !0),
		document.body ||
			E(
				"Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?",
			),
		ee(document, "alpine:init"),
		ee(document, "alpine:initializing"),
		Xe(),
		tr((t) => C(t, B)),
		Ve((t) => V(t)),
		Nt((t, n) => {
			tt(t, n).forEach((r) => r());
		});
	let e = (t) => !ye(t.parentElement, !0);
	Array.from(document.querySelectorAll(rn().join(",")))
		.filter(e)
		.forEach((t) => {
			C(t);
		}),
		ee(document, "alpine:initialized"),
		setTimeout(() => {
			Sr();
		});
}
var rt = [],
	tn = [];
function nn() {
	return rt.map((e) => e());
}
function rn() {
	return rt.concat(tn).map((e) => e());
}
function on(e) {
	rt.push(e);
}
function sn(e) {
	tn.push(e);
}
function ye(e, t = !1) {
	return J(e, (n) => {
		if ((t ? rn() : nn()).some((i) => n.matches(i))) return !0;
	});
}
function J(e, t) {
	if (e) {
		if (t(e)) return e;
		if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
			return J(e.parentElement, t);
	}
}
function wr(e) {
	return nn().some((t) => e.matches(t));
}
var an = [];
function Er(e) {
	an.push(e);
}
var Ar = 1;
function C(e, t = B, n = () => {}) {
	J(e, (r) => r._x_ignore) ||
		xr(() => {
			t(e, (r, i) => {
				r._x_marker ||
					(n(r, i),
					an.forEach((o) => o(r, i)),
					tt(r, r.attributes).forEach((o) => o()),
					r._x_ignore || (r._x_marker = Ar++),
					r._x_ignore && i());
			});
		});
}
function V(e, t = B) {
	t(e, (n) => {
		nr(n), kt(n), delete n._x_marker;
	});
}
function Sr() {
	[
		["ui", "dialog", ["[x-dialog], [x-popover]"]],
		["anchor", "anchor", ["[x-anchor]"]],
		["sort", "sort", ["[x-sort]"]],
	].forEach(([t, n, r]) => {
		gr(n) ||
			r.some((i) => {
				if (document.querySelector(i))
					return E(`found "${i}", but missing ${t} plugin`), !0;
			});
	});
}
var Be = [],
	it = !1;
function ot(e = () => {}) {
	return (
		queueMicrotask(() => {
			it ||
				setTimeout(() => {
					De();
				});
		}),
		new Promise((t) => {
			Be.push(() => {
				e(), t();
			});
		})
	);
}
function De() {
	for (it = !1; Be.length; ) Be.shift()();
}
function Or() {
	it = !0;
}
function st(e, t) {
	return Array.isArray(t)
		? yt(e, t.join(" "))
		: typeof t == "object" && t !== null
			? Cr(e, t)
			: typeof t == "function"
				? st(e, t())
				: yt(e, t);
}
function yt(e, t) {
	let n = (o) => o.split(" ").filter(Boolean),
		r = (o) =>
			o
				.split(" ")
				.filter((s) => !e.classList.contains(s))
				.filter(Boolean),
		i = (o) => (
			e.classList.add(...o),
			() => {
				e.classList.remove(...o);
			}
		);
	return (t = t === !0 ? (t = "") : t || ""), i(r(t));
}
function Cr(e, t) {
	let n = (a) => a.split(" ").filter(Boolean),
		r = Object.entries(t)
			.flatMap(([a, u]) => (u ? n(a) : !1))
			.filter(Boolean),
		i = Object.entries(t)
			.flatMap(([a, u]) => (u ? !1 : n(a)))
			.filter(Boolean),
		o = [],
		s = [];
	return (
		i.forEach((a) => {
			e.classList.contains(a) && (e.classList.remove(a), s.push(a));
		}),
		r.forEach((a) => {
			e.classList.contains(a) || (e.classList.add(a), o.push(a));
		}),
		() => {
			s.forEach((a) => e.classList.add(a)),
				o.forEach((a) => e.classList.remove(a));
		}
	);
}
function ve(e, t) {
	return typeof t == "object" && t !== null ? Mr(e, t) : Tr(e, t);
}
function Mr(e, t) {
	let n = {};
	return (
		Object.entries(t).forEach(([r, i]) => {
			(n[r] = e.style[r]),
				r.startsWith("--") || (r = Ir(r)),
				e.style.setProperty(r, i);
		}),
		setTimeout(() => {
			e.style.length === 0 && e.removeAttribute("style");
		}),
		() => {
			ve(e, n);
		}
	);
}
function Tr(e, t) {
	let n = e.getAttribute("style", t);
	return (
		e.setAttribute("style", t),
		() => {
			e.setAttribute("style", n || "");
		}
	);
}
function Ir(e) {
	return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Ke(e, t = () => {}) {
	let n = !1;
	return function () {
		n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
	};
}
y(
	"transition",
	(e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
		typeof r == "function" && (r = i(r)),
			r !== !1 &&
				(!r || typeof r == "boolean" ? Pr(e, n, t) : $r(e, r, t));
	},
);
function $r(e, t, n) {
	un(e, st, ""),
		{
			enter: (i) => {
				e._x_transition.enter.during = i;
			},
			"enter-start": (i) => {
				e._x_transition.enter.start = i;
			},
			"enter-end": (i) => {
				e._x_transition.enter.end = i;
			},
			leave: (i) => {
				e._x_transition.leave.during = i;
			},
			"leave-start": (i) => {
				e._x_transition.leave.start = i;
			},
			"leave-end": (i) => {
				e._x_transition.leave.end = i;
			},
		}[n](t);
}
function Pr(e, t, n) {
	un(e, ve);
	let r = !t.includes("in") && !t.includes("out") && !n,
		i = r || t.includes("in") || ["enter"].includes(n),
		o = r || t.includes("out") || ["leave"].includes(n);
	t.includes("in") && !r && (t = t.filter((h, x) => x < t.indexOf("out"))),
		t.includes("out") &&
			!r &&
			(t = t.filter((h, x) => x > t.indexOf("out")));
	let s = !t.includes("opacity") && !t.includes("scale"),
		a = s || t.includes("opacity"),
		u = s || t.includes("scale"),
		c = a ? 0 : 1,
		l = u ? X(t, "scale", 95) / 100 : 1,
		d = X(t, "delay", 0) / 1e3,
		p = X(t, "origin", "center"),
		v = "opacity, transform",
		M = X(t, "duration", 150) / 1e3,
		se = X(t, "duration", 75) / 1e3,
		f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
	i &&
		((e._x_transition.enter.during = {
			transformOrigin: p,
			transitionDelay: `${d}s`,
			transitionProperty: v,
			transitionDuration: `${M}s`,
			transitionTimingFunction: f,
		}),
		(e._x_transition.enter.start = {
			opacity: c,
			transform: `scale(${l})`,
		}),
		(e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
		o &&
			((e._x_transition.leave.during = {
				transformOrigin: p,
				transitionDelay: `${d}s`,
				transitionProperty: v,
				transitionDuration: `${se}s`,
				transitionTimingFunction: f,
			}),
			(e._x_transition.leave.start = {
				opacity: 1,
				transform: "scale(1)",
			}),
			(e._x_transition.leave.end = {
				opacity: c,
				transform: `scale(${l})`,
			}));
}
function un(e, t, n = {}) {
	e._x_transition ||
		(e._x_transition = {
			enter: { during: n, start: n, end: n },
			leave: { during: n, start: n, end: n },
			in(r = () => {}, i = () => {}) {
				ze(
					e,
					t,
					{
						during: this.enter.during,
						start: this.enter.start,
						end: this.enter.end,
					},
					r,
					i,
				);
			},
			out(r = () => {}, i = () => {}) {
				ze(
					e,
					t,
					{
						during: this.leave.during,
						start: this.leave.start,
						end: this.leave.end,
					},
					r,
					i,
				);
			},
		});
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
	e,
	t,
	n,
	r,
) {
	let i =
			document.visibilityState === "visible"
				? requestAnimationFrame
				: setTimeout,
		o = () => i(n);
	if (t) {
		e._x_transition && (e._x_transition.enter || e._x_transition.leave)
			? e._x_transition.enter &&
				(Object.entries(e._x_transition.enter.during).length ||
					Object.entries(e._x_transition.enter.start).length ||
					Object.entries(e._x_transition.enter.end).length)
				? e._x_transition.in(n)
				: o()
			: e._x_transition
				? e._x_transition.in(n)
				: o();
		return;
	}
	(e._x_hidePromise = e._x_transition
		? new Promise((s, a) => {
				e._x_transition.out(
					() => {},
					() => s(r),
				),
					e._x_transitioning &&
						e._x_transitioning.beforeCancel(() =>
							a({ isFromCancelledTransition: !0 }),
						);
			})
		: Promise.resolve(r)),
		queueMicrotask(() => {
			let s = cn(e);
			s
				? (s._x_hideChildren || (s._x_hideChildren = []),
					s._x_hideChildren.push(e))
				: i(() => {
						let a = (u) => {
							let c = Promise.all([
								u._x_hidePromise,
								...(u._x_hideChildren || []).map(a),
							]).then(([l]) => l?.());
							return (
								delete u._x_hidePromise,
								delete u._x_hideChildren,
								c
							);
						};
						a(e).catch((u) => {
							if (!u.isFromCancelledTransition) throw u;
						});
					});
		});
};
function cn(e) {
	let t = e.parentNode;
	if (t) return t._x_hidePromise ? t : cn(t);
}
function ze(
	e,
	t,
	{ during: n, start: r, end: i } = {},
	o = () => {},
	s = () => {},
) {
	if (
		(e._x_transitioning && e._x_transitioning.cancel(),
		Object.keys(n).length === 0 &&
			Object.keys(r).length === 0 &&
			Object.keys(i).length === 0)
	) {
		o(), s();
		return;
	}
	let a, u, c;
	Rr(e, {
		start() {
			a = t(e, r);
		},
		during() {
			u = t(e, n);
		},
		before: o,
		end() {
			a(), (c = t(e, i));
		},
		after: s,
		cleanup() {
			u(), c();
		},
	});
}
function Rr(e, t) {
	let n,
		r,
		i,
		o = Ke(() => {
			g(() => {
				(n = !0),
					r || t.before(),
					i || (t.end(), De()),
					t.after(),
					e.isConnected && t.cleanup(),
					delete e._x_transitioning;
			});
		});
	(e._x_transitioning = {
		beforeCancels: [],
		beforeCancel(s) {
			this.beforeCancels.push(s);
		},
		cancel: Ke(function () {
			for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
			o();
		}),
		finish: o,
	}),
		g(() => {
			t.start(), t.during();
		}),
		Or(),
		requestAnimationFrame(() => {
			if (n) return;
			let s =
					Number(
						getComputedStyle(e)
							.transitionDuration.replace(/,.*/, "")
							.replace("s", ""),
					) * 1e3,
				a =
					Number(
						getComputedStyle(e)
							.transitionDelay.replace(/,.*/, "")
							.replace("s", ""),
					) * 1e3;
			s === 0 &&
				(s =
					Number(
						getComputedStyle(e).animationDuration.replace("s", ""),
					) * 1e3),
				g(() => {
					t.before();
				}),
				(r = !0),
				requestAnimationFrame(() => {
					n ||
						(g(() => {
							t.end();
						}),
						De(),
						setTimeout(e._x_transitioning.finish, s + a),
						(i = !0));
				});
		});
}
function X(e, t, n) {
	if (e.indexOf(t) === -1) return n;
	let r = e[e.indexOf(t) + 1];
	if (!r || (t === "scale" && isNaN(r))) return n;
	if (t === "duration" || t === "delay") {
		let i = r.match(/([0-9]+)ms/);
		if (i) return i[1];
	}
	return t === "origin" &&
		["top", "right", "left", "center", "bottom"].includes(
			e[e.indexOf(t) + 2],
		)
		? [r, e[e.indexOf(t) + 2]].join(" ")
		: r;
}
var I = !1;
function P(e, t = () => {}) {
	return (...n) => (I ? t(...n) : e(...n));
}
function jr(e) {
	return (...t) => I && e(...t);
}
var ln = [];
function be(e) {
	ln.push(e);
}
function Nr(e, t) {
	ln.forEach((n) => n(e, t)),
		(I = !0),
		fn(() => {
			C(t, (n, r) => {
				r(n, () => {});
			});
		}),
		(I = !1);
}
var He = !1;
function Lr(e, t) {
	t._x_dataStack || (t._x_dataStack = e._x_dataStack),
		(I = !0),
		(He = !0),
		fn(() => {
			kr(t);
		}),
		(I = !1),
		(He = !1);
}
function kr(e) {
	let t = !1;
	C(e, (r, i) => {
		B(r, (o, s) => {
			if (t && wr(o)) return s();
			(t = !0), i(o, s);
		});
	});
}
function fn(e) {
	let t = D;
	gt((n, r) => {
		let i = t(n);
		return W(i), () => {};
	}),
		e(),
		gt(t);
}
function dn(e, t, n, r = []) {
	switch (
		(e._x_bindings || (e._x_bindings = q({})),
		(e._x_bindings[t] = n),
		(t = r.includes("camel") ? Wr(t) : t),
		t)
	) {
		case "value":
			Fr(e, n);
			break;
		case "style":
			Dr(e, n);
			break;
		case "class":
			Br(e, n);
			break;
		case "selected":
		case "checked":
			Kr(e, t, n);
			break;
		default:
			pn(e, t, n);
			break;
	}
}
function Fr(e, t) {
	if (gn(e))
		e.attributes.value === void 0 && (e.value = t),
			window.fromModel &&
				(typeof t == "boolean"
					? (e.checked = pe(e.value) === t)
					: (e.checked = vt(e.value, t)));
	else if (at(e))
		Number.isInteger(t)
			? (e.value = t)
			: !Array.isArray(t) &&
				  typeof t != "boolean" &&
				  ![null, void 0].includes(t)
				? (e.value = String(t))
				: Array.isArray(t)
					? (e.checked = t.some((n) => vt(n, e.value)))
					: (e.checked = !!t);
	else if (e.tagName === "SELECT") qr(e, t);
	else {
		if (e.value === t) return;
		e.value = t === void 0 ? "" : t;
	}
}
function Br(e, t) {
	e._x_undoAddedClasses && e._x_undoAddedClasses(),
		(e._x_undoAddedClasses = st(e, t));
}
function Dr(e, t) {
	e._x_undoAddedStyles && e._x_undoAddedStyles(),
		(e._x_undoAddedStyles = ve(e, t));
}
function Kr(e, t, n) {
	pn(e, t, n), Hr(e, t, n);
}
function pn(e, t, n) {
	[null, void 0, !1].includes(n) && Jr(t)
		? e.removeAttribute(t)
		: (_n(t) && (n = t), zr(e, t, n));
}
function zr(e, t, n) {
	e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Hr(e, t, n) {
	e[t] !== n && (e[t] = n);
}
function qr(e, t) {
	let n = [].concat(t).map((r) => r + "");
	Array.from(e.options).forEach((r) => {
		r.selected = n.includes(r.value);
	});
}
function Wr(e) {
	return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function vt(e, t) {
	return e == t;
}
function pe(e) {
	return [1, "1", "true", "on", "yes", !0].includes(e)
		? !0
		: [0, "0", "false", "off", "no", !1].includes(e)
			? !1
			: e
				? !!e
				: null;
}
var Ur = new Set([
	"allowfullscreen",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"defer",
	"disabled",
	"formnovalidate",
	"inert",
	"ismap",
	"itemscope",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"selected",
	"shadowrootclonable",
	"shadowrootdelegatesfocus",
	"shadowrootserializable",
]);
function _n(e) {
	return Ur.has(e);
}
function Jr(e) {
	return ![
		"aria-pressed",
		"aria-checked",
		"aria-expanded",
		"aria-selected",
	].includes(e);
}
function Vr(e, t, n) {
	return e._x_bindings && e._x_bindings[t] !== void 0
		? e._x_bindings[t]
		: hn(e, t, n);
}
function Yr(e, t, n, r = !0) {
	if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
	if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
		let i = e._x_inlineBindings[t];
		return (i.extract = r), Ht(() => L(e, i.expression));
	}
	return hn(e, t, n);
}
function hn(e, t, n) {
	let r = e.getAttribute(t);
	return r === null
		? typeof n == "function"
			? n()
			: n
		: r === ""
			? !0
			: _n(t)
				? !![t, "true"].includes(r)
				: r;
}
function at(e) {
	return (
		e.type === "checkbox" ||
		e.localName === "ui-checkbox" ||
		e.localName === "ui-switch"
	);
}
function gn(e) {
	return e.type === "radio" || e.localName === "ui-radio";
}
function xn(e, t) {
	var n;
	return function () {
		var r = this,
			i = arguments,
			o = function () {
				(n = null), e.apply(r, i);
			};
		clearTimeout(n), (n = setTimeout(o, t));
	};
}
function yn(e, t) {
	let n;
	return function () {
		let r = this,
			i = arguments;
		n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
	};
}
function vn({ get: e, set: t }, { get: n, set: r }) {
	let i = !0,
		o,
		s,
		a = D(() => {
			let u = e(),
				c = n();
			if (i) r(Ce(u)), (i = !1);
			else {
				let l = JSON.stringify(u),
					d = JSON.stringify(c);
				l !== o ? r(Ce(u)) : l !== d && t(Ce(c));
			}
			(o = JSON.stringify(e())), (s = JSON.stringify(n()));
		});
	return () => {
		W(a);
	};
}
function Ce(e) {
	return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e;
}
function Gr(e) {
	(Array.isArray(e) ? e : [e]).forEach((n) => n(oe));
}
var R = {},
	bt = !1;
function Xr(e, t) {
	if ((bt || ((R = q(R)), (bt = !0)), t === void 0)) return R[e];
	(R[e] = t),
		Dt(R[e]),
		typeof t == "object" &&
			t !== null &&
			t.hasOwnProperty("init") &&
			typeof t.init == "function" &&
			R[e].init();
}
function Zr() {
	return R;
}
var bn = {};
function Qr(e, t) {
	let n = typeof t != "function" ? () => t : t;
	return e instanceof Element ? mn(e, n()) : ((bn[e] = n), () => {});
}
function ei(e) {
	return (
		Object.entries(bn).forEach(([t, n]) => {
			Object.defineProperty(e, t, {
				get() {
					return (...r) => n(...r);
				},
			});
		}),
		e
	);
}
function mn(e, t, n) {
	let r = [];
	for (; r.length; ) r.pop()();
	let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })),
		o = Ut(i);
	return (
		(i = i.map((s) =>
			o.find((a) => a.name === s.name)
				? { name: `x-bind:${s.name}`, value: `"${s.value}"` }
				: s,
		)),
		tt(e, i, n).map((s) => {
			r.push(s.runCleanups), s();
		}),
		() => {
			for (; r.length; ) r.pop()();
		}
	);
}
var wn = {};
function ti(e, t) {
	wn[e] = t;
}
function ni(e, t) {
	return (
		Object.entries(wn).forEach(([n, r]) => {
			Object.defineProperty(e, n, {
				get() {
					return (...i) => r.bind(t)(...i);
				},
				enumerable: !1,
			});
		}),
		e
	);
}
var ri = {
		get reactive() {
			return q;
		},
		get release() {
			return W;
		},
		get effect() {
			return D;
		},
		get raw() {
			return It;
		},
		version: "3.14.7",
		flushAndStopDeferringMutations: or,
		dontAutoEvaluateFunctions: Ht,
		disableEffectScheduling: Zn,
		startObservingMutations: Xe,
		stopObservingMutations: Ft,
		setReactivityEngine: Qn,
		onAttributeRemoved: Lt,
		onAttributesAdded: Nt,
		closestDataStack: z,
		skipDuringClone: P,
		onlyDuringClone: jr,
		addRootSelector: on,
		addInitSelector: sn,
		interceptClone: be,
		addScopeToNode: re,
		deferMutations: ir,
		mapAttributes: nt,
		evaluateLater: m,
		interceptInit: Er,
		setEvaluator: fr,
		mergeProxies: ie,
		extractProp: Yr,
		findClosest: J,
		onElRemoved: Ve,
		closestRoot: ye,
		destroyTree: V,
		interceptor: Kt,
		transition: ze,
		setStyles: ve,
		mutateDom: g,
		directive: y,
		entangle: vn,
		throttle: yn,
		debounce: xn,
		evaluate: L,
		initTree: C,
		nextTick: ot,
		prefixed: U,
		prefix: hr,
		plugin: Gr,
		magic: S,
		store: Xr,
		start: mr,
		clone: Lr,
		cloneNode: Nr,
		bound: Vr,
		$data: Bt,
		watch: $t,
		walk: B,
		data: ti,
		bind: Qr,
	},
	oe = ri;
function En(e, t) {
	let n = Object.create(null),
		r = e.split(",");
	for (let i = 0; i < r.length; i++) n[r[i]] = !0;
	return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var ii =
		"itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	io = En(
		ii +
			",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected",
	),
	oi = Object.freeze({}),
	oo = Object.freeze([]),
	si = Object.prototype.hasOwnProperty,
	me = (e, t) => si.call(e, t),
	k = Array.isArray,
	te = (e) => An(e) === "[object Map]",
	ai = (e) => typeof e == "string",
	ut = (e) => typeof e == "symbol",
	we = (e) => e !== null && typeof e == "object",
	ui = Object.prototype.toString,
	An = (e) => ui.call(e),
	Sn = (e) => An(e).slice(8, -1),
	ct = (e) =>
		ai(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	Ee = (e) => {
		let t = Object.create(null);
		return (n) => t[n] || (t[n] = e(n));
	},
	ci = /-(\w)/g,
	so = Ee((e) => e.replace(ci, (t, n) => (n ? n.toUpperCase() : ""))),
	li = /\B([A-Z])/g,
	ao = Ee((e) => e.replace(li, "-$1").toLowerCase()),
	On = Ee((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	uo = Ee((e) => (e ? `on${On(e)}` : "")),
	Cn = (e, t) => e !== t && (e === e || t === t),
	qe = new WeakMap(),
	Z = [],
	O,
	F = Symbol("iterate"),
	We = Symbol("Map key iterate");
function fi(e) {
	return e && e._isEffect === !0;
}
function di(e, t = oi) {
	fi(e) && (e = e.raw);
	let n = hi(e, t);
	return t.lazy || n(), n;
}
function pi(e) {
	e.active &&
		(Mn(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var _i = 0;
function hi(e, t) {
	let n = function () {
		if (!n.active) return e();
		if (!Z.includes(n)) {
			Mn(n);
			try {
				return xi(), Z.push(n), (O = n), e();
			} finally {
				Z.pop(), Tn(), (O = Z[Z.length - 1]);
			}
		}
	};
	return (
		(n.id = _i++),
		(n.allowRecurse = !!t.allowRecurse),
		(n._isEffect = !0),
		(n.active = !0),
		(n.raw = e),
		(n.deps = []),
		(n.options = t),
		n
	);
}
function Mn(e) {
	let { deps: t } = e;
	if (t.length) {
		for (let n = 0; n < t.length; n++) t[n].delete(e);
		t.length = 0;
	}
}
var H = !0,
	lt = [];
function gi() {
	lt.push(H), (H = !1);
}
function xi() {
	lt.push(H), (H = !0);
}
function Tn() {
	let e = lt.pop();
	H = e === void 0 ? !0 : e;
}
function A(e, t, n) {
	if (!H || O === void 0) return;
	let r = qe.get(e);
	r || qe.set(e, (r = new Map()));
	let i = r.get(n);
	i || r.set(n, (i = new Set())),
		i.has(O) ||
			(i.add(O),
			O.deps.push(i),
			O.options.onTrack &&
				O.options.onTrack({ effect: O, target: e, type: t, key: n }));
}
function $(e, t, n, r, i, o) {
	let s = qe.get(e);
	if (!s) return;
	let a = new Set(),
		u = (l) => {
			l &&
				l.forEach((d) => {
					(d !== O || d.allowRecurse) && a.add(d);
				});
		};
	if (t === "clear") s.forEach(u);
	else if (n === "length" && k(e))
		s.forEach((l, d) => {
			(d === "length" || d >= r) && u(l);
		});
	else
		switch ((n !== void 0 && u(s.get(n)), t)) {
			case "add":
				k(e)
					? ct(n) && u(s.get("length"))
					: (u(s.get(F)), te(e) && u(s.get(We)));
				break;
			case "delete":
				k(e) || (u(s.get(F)), te(e) && u(s.get(We)));
				break;
			case "set":
				te(e) && u(s.get(F));
				break;
		}
	let c = (l) => {
		l.options.onTrigger &&
			l.options.onTrigger({
				effect: l,
				target: e,
				key: n,
				type: t,
				newValue: r,
				oldValue: i,
				oldTarget: o,
			}),
			l.options.scheduler ? l.options.scheduler(l) : l();
	};
	a.forEach(c);
}
var yi = En("__proto__,__v_isRef,__isVue"),
	In = new Set(
		Object.getOwnPropertyNames(Symbol)
			.map((e) => Symbol[e])
			.filter(ut),
	),
	vi = $n(),
	bi = $n(!0),
	mt = mi();
function mi() {
	let e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach((t) => {
			e[t] = function (...n) {
				let r = _(this);
				for (let o = 0, s = this.length; o < s; o++)
					A(r, "get", o + "");
				let i = r[t](...n);
				return i === -1 || i === !1 ? r[t](...n.map(_)) : i;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
			e[t] = function (...n) {
				gi();
				let r = _(this)[t].apply(this, n);
				return Tn(), r;
			};
		}),
		e
	);
}
function $n(e = !1, t = !1) {
	return function (r, i, o) {
		if (i === "__v_isReactive") return !e;
		if (i === "__v_isReadonly") return e;
		if (i === "__v_raw" && o === (e ? (t ? ki : Nn) : t ? Li : jn).get(r))
			return r;
		let s = k(r);
		if (!e && s && me(mt, i)) return Reflect.get(mt, i, o);
		let a = Reflect.get(r, i, o);
		return (ut(i) ? In.has(i) : yi(i)) || (e || A(r, "get", i), t)
			? a
			: Ue(a)
				? !s || !ct(i)
					? a.value
					: a
				: we(a)
					? e
						? Ln(a)
						: _t(a)
					: a;
	};
}
var wi = Ei();
function Ei(e = !1) {
	return function (n, r, i, o) {
		let s = n[r];
		if (!e && ((i = _(i)), (s = _(s)), !k(n) && Ue(s) && !Ue(i)))
			return (s.value = i), !0;
		let a = k(n) && ct(r) ? Number(r) < n.length : me(n, r),
			u = Reflect.set(n, r, i, o);
		return (
			n === _(o) &&
				(a ? Cn(i, s) && $(n, "set", r, i, s) : $(n, "add", r, i)),
			u
		);
	};
}
function Ai(e, t) {
	let n = me(e, t),
		r = e[t],
		i = Reflect.deleteProperty(e, t);
	return i && n && $(e, "delete", t, void 0, r), i;
}
function Si(e, t) {
	let n = Reflect.has(e, t);
	return (!ut(t) || !In.has(t)) && A(e, "has", t), n;
}
function Oi(e) {
	return A(e, "iterate", k(e) ? "length" : F), Reflect.ownKeys(e);
}
var Ci = { get: vi, set: wi, deleteProperty: Ai, has: Si, ownKeys: Oi },
	Mi = {
		get: bi,
		set(e, t) {
			return (
				console.warn(
					`Set operation on key "${String(t)}" failed: target is readonly.`,
					e,
				),
				!0
			);
		},
		deleteProperty(e, t) {
			return (
				console.warn(
					`Delete operation on key "${String(t)}" failed: target is readonly.`,
					e,
				),
				!0
			);
		},
	},
	ft = (e) => (we(e) ? _t(e) : e),
	dt = (e) => (we(e) ? Ln(e) : e),
	pt = (e) => e,
	Ae = (e) => Reflect.getPrototypeOf(e);
function ae(e, t, n = !1, r = !1) {
	e = e.__v_raw;
	let i = _(e),
		o = _(t);
	t !== o && !n && A(i, "get", t), !n && A(i, "get", o);
	let { has: s } = Ae(i),
		a = r ? pt : n ? dt : ft;
	if (s.call(i, t)) return a(e.get(t));
	if (s.call(i, o)) return a(e.get(o));
	e !== i && e.get(t);
}
function ue(e, t = !1) {
	let n = this.__v_raw,
		r = _(n),
		i = _(e);
	return (
		e !== i && !t && A(r, "has", e),
		!t && A(r, "has", i),
		e === i ? n.has(e) : n.has(e) || n.has(i)
	);
}
function ce(e, t = !1) {
	return (
		(e = e.__v_raw), !t && A(_(e), "iterate", F), Reflect.get(e, "size", e)
	);
}
function wt(e) {
	e = _(e);
	let t = _(this);
	return Ae(t).has.call(t, e) || (t.add(e), $(t, "add", e, e)), this;
}
function Et(e, t) {
	t = _(t);
	let n = _(this),
		{ has: r, get: i } = Ae(n),
		o = r.call(n, e);
	o ? Rn(n, r, e) : ((e = _(e)), (o = r.call(n, e)));
	let s = i.call(n, e);
	return (
		n.set(e, t),
		o ? Cn(t, s) && $(n, "set", e, t, s) : $(n, "add", e, t),
		this
	);
}
function At(e) {
	let t = _(this),
		{ has: n, get: r } = Ae(t),
		i = n.call(t, e);
	i ? Rn(t, n, e) : ((e = _(e)), (i = n.call(t, e)));
	let o = r ? r.call(t, e) : void 0,
		s = t.delete(e);
	return i && $(t, "delete", e, void 0, o), s;
}
function St() {
	let e = _(this),
		t = e.size !== 0,
		n = te(e) ? new Map(e) : new Set(e),
		r = e.clear();
	return t && $(e, "clear", void 0, void 0, n), r;
}
function le(e, t) {
	return function (r, i) {
		let o = this,
			s = o.__v_raw,
			a = _(s),
			u = t ? pt : e ? dt : ft;
		return (
			!e && A(a, "iterate", F),
			s.forEach((c, l) => r.call(i, u(c), u(l), o))
		);
	};
}
function fe(e, t, n) {
	return function (...r) {
		let i = this.__v_raw,
			o = _(i),
			s = te(o),
			a = e === "entries" || (e === Symbol.iterator && s),
			u = e === "keys" && s,
			c = i[e](...r),
			l = n ? pt : t ? dt : ft;
		return (
			!t && A(o, "iterate", u ? We : F),
			{
				next() {
					let { value: d, done: p } = c.next();
					return p
						? { value: d, done: p }
						: { value: a ? [l(d[0]), l(d[1])] : l(d), done: p };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function T(e) {
	return function (...t) {
		{
			let n = t[0] ? `on key "${t[0]}" ` : "";
			console.warn(
				`${On(e)} operation ${n}failed: target is readonly.`,
				_(this),
			);
		}
		return e === "delete" ? !1 : this;
	};
}
function Ti() {
	let e = {
			get(o) {
				return ae(this, o);
			},
			get size() {
				return ce(this);
			},
			has: ue,
			add: wt,
			set: Et,
			delete: At,
			clear: St,
			forEach: le(!1, !1),
		},
		t = {
			get(o) {
				return ae(this, o, !1, !0);
			},
			get size() {
				return ce(this);
			},
			has: ue,
			add: wt,
			set: Et,
			delete: At,
			clear: St,
			forEach: le(!1, !0),
		},
		n = {
			get(o) {
				return ae(this, o, !0);
			},
			get size() {
				return ce(this, !0);
			},
			has(o) {
				return ue.call(this, o, !0);
			},
			add: T("add"),
			set: T("set"),
			delete: T("delete"),
			clear: T("clear"),
			forEach: le(!0, !1),
		},
		r = {
			get(o) {
				return ae(this, o, !0, !0);
			},
			get size() {
				return ce(this, !0);
			},
			has(o) {
				return ue.call(this, o, !0);
			},
			add: T("add"),
			set: T("set"),
			delete: T("delete"),
			clear: T("clear"),
			forEach: le(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach((o) => {
			(e[o] = fe(o, !1, !1)),
				(n[o] = fe(o, !0, !1)),
				(t[o] = fe(o, !1, !0)),
				(r[o] = fe(o, !0, !0));
		}),
		[e, n, t, r]
	);
}
var [Ii, $i, Pi, Ri] = Ti();
function Pn(e, t) {
	let n = t ? (e ? Ri : Pi) : e ? $i : Ii;
	return (r, i, o) =>
		i === "__v_isReactive"
			? !e
			: i === "__v_isReadonly"
				? e
				: i === "__v_raw"
					? r
					: Reflect.get(me(n, i) && i in r ? n : r, i, o);
}
var ji = { get: Pn(!1, !1) },
	Ni = { get: Pn(!0, !1) };
function Rn(e, t, n) {
	let r = _(n);
	if (r !== n && t.call(e, r)) {
		let i = Sn(e);
		console.warn(
			`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`,
		);
	}
}
var jn = new WeakMap(),
	Li = new WeakMap(),
	Nn = new WeakMap(),
	ki = new WeakMap();
function Fi(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function Bi(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Fi(Sn(e));
}
function _t(e) {
	return e && e.__v_isReadonly ? e : kn(e, !1, Ci, ji, jn);
}
function Ln(e) {
	return kn(e, !0, Mi, Ni, Nn);
}
function kn(e, t, n, r, i) {
	if (!we(e))
		return console.warn(`value cannot be made reactive: ${String(e)}`), e;
	if (e.__v_raw && !(t && e.__v_isReactive)) return e;
	let o = i.get(e);
	if (o) return o;
	let s = Bi(e);
	if (s === 0) return e;
	let a = new Proxy(e, s === 2 ? r : n);
	return i.set(e, a), a;
}
function _(e) {
	return (e && _(e.__v_raw)) || e;
}
function Ue(e) {
	return !!(e && e.__v_isRef === !0);
}
S("nextTick", () => ot);
S("dispatch", (e) => ee.bind(ee, e));
S("watch", (e, { evaluateLater: t, cleanup: n }) => (r, i) => {
	let o = t(r),
		a = $t(() => {
			let u;
			return o((c) => (u = c)), u;
		}, i);
	n(a);
});
S("store", Zr);
S("data", (e) => Bt(e));
S("root", (e) => ye(e));
S(
	"refs",
	(e) => (e._x_refs_proxy || (e._x_refs_proxy = ie(Di(e))), e._x_refs_proxy),
);
function Di(e) {
	let t = [];
	return (
		J(e, (n) => {
			n._x_refs && t.push(n._x_refs);
		}),
		t
	);
}
var Me = {};
function Fn(e) {
	return Me[e] || (Me[e] = 0), ++Me[e];
}
function Ki(e, t) {
	return J(e, (n) => {
		if (n._x_ids && n._x_ids[t]) return !0;
	});
}
function zi(e, t) {
	e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Fn(t));
}
S("id", (e, { cleanup: t }) => (n, r = null) => {
	let i = `${n}${r ? `-${r}` : ""}`;
	return Hi(e, i, t, () => {
		let o = Ki(e, n),
			s = o ? o._x_ids[n] : Fn(n);
		return r ? `${n}-${s}-${r}` : `${n}-${s}`;
	});
});
be((e, t) => {
	e._x_id && (t._x_id = e._x_id);
});
function Hi(e, t, n, r) {
	if ((e._x_id || (e._x_id = {}), e._x_id[t])) return e._x_id[t];
	let i = r();
	return (
		(e._x_id[t] = i),
		n(() => {
			delete e._x_id[t];
		}),
		i
	);
}
S("el", (e) => e);
Bn("Focus", "focus", "focus");
Bn("Persist", "persist", "persist");
function Bn(e, t, n) {
	S(t, (r) =>
		E(
			`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
			r,
		),
	);
}
y(
	"modelable",
	(e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
		let o = r(t),
			s = () => {
				let l;
				return o((d) => (l = d)), l;
			},
			a = r(`${t} = __placeholder`),
			u = (l) => a(() => {}, { scope: { __placeholder: l } }),
			c = s();
		u(c),
			queueMicrotask(() => {
				if (!e._x_model) return;
				e._x_removeModelListeners.default();
				let l = e._x_model.get,
					d = e._x_model.set,
					p = vn(
						{
							get() {
								return l();
							},
							set(v) {
								d(v);
							},
						},
						{
							get() {
								return s();
							},
							set(v) {
								u(v);
							},
						},
					);
				i(p);
			});
	},
);
y("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
	e.tagName.toLowerCase() !== "template" &&
		E("x-teleport can only be used on a <template> tag", e);
	let i = Ot(n),
		o = e.content.cloneNode(!0).firstElementChild;
	(e._x_teleport = o),
		(o._x_teleportBack = e),
		e.setAttribute("data-teleport-template", !0),
		o.setAttribute("data-teleport-target", !0),
		e._x_forwardEvents &&
			e._x_forwardEvents.forEach((a) => {
				o.addEventListener(a, (u) => {
					u.stopPropagation(),
						e.dispatchEvent(new u.constructor(u.type, u));
				});
			}),
		re(o, {}, e);
	let s = (a, u, c) => {
		c.includes("prepend")
			? u.parentNode.insertBefore(a, u)
			: c.includes("append")
				? u.parentNode.insertBefore(a, u.nextSibling)
				: u.appendChild(a);
	};
	g(() => {
		s(o, i, t),
			P(() => {
				C(o);
			})();
	}),
		(e._x_teleportPutBack = () => {
			let a = Ot(n);
			g(() => {
				s(e._x_teleport, a, t);
			});
		}),
		r(() =>
			g(() => {
				o.remove(), V(o);
			}),
		);
});
var qi = document.createElement("div");
function Ot(e) {
	let t = P(
		() => document.querySelector(e),
		() => qi,
	)();
	return t || E(`Cannot find x-teleport element for selector: "${e}"`), t;
}
var Dn = () => {};
Dn.inline = (e, { modifiers: t }, { cleanup: n }) => {
	t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
		n(() => {
			t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
		});
};
y("ignore", Dn);
y(
	"effect",
	P((e, { expression: t }, { effect: n }) => {
		n(m(e, t));
	}),
);
function Je(e, t, n, r) {
	let i = e,
		o = (u) => r(u),
		s = {},
		a = (u, c) => (l) => c(u, l);
	if (
		(n.includes("dot") && (t = Wi(t)),
		n.includes("camel") && (t = Ui(t)),
		n.includes("passive") && (s.passive = !0),
		n.includes("capture") && (s.capture = !0),
		n.includes("window") && (i = window),
		n.includes("document") && (i = document),
		n.includes("debounce"))
	) {
		let u = n[n.indexOf("debounce") + 1] || "invalid-wait",
			c = xe(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
		o = xn(o, c);
	}
	if (n.includes("throttle")) {
		let u = n[n.indexOf("throttle") + 1] || "invalid-wait",
			c = xe(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
		o = yn(o, c);
	}
	return (
		n.includes("prevent") &&
			(o = a(o, (u, c) => {
				c.preventDefault(), u(c);
			})),
		n.includes("stop") &&
			(o = a(o, (u, c) => {
				c.stopPropagation(), u(c);
			})),
		n.includes("once") &&
			(o = a(o, (u, c) => {
				u(c), i.removeEventListener(t, o, s);
			})),
		(n.includes("away") || n.includes("outside")) &&
			((i = document),
			(o = a(o, (u, c) => {
				e.contains(c.target) ||
					(c.target.isConnected !== !1 &&
						((e.offsetWidth < 1 && e.offsetHeight < 1) ||
							(e._x_isShown !== !1 && u(c))));
			}))),
		n.includes("self") &&
			(o = a(o, (u, c) => {
				c.target === e && u(c);
			})),
		(Vi(t) || Kn(t)) &&
			(o = a(o, (u, c) => {
				Yi(c, n) || u(c);
			})),
		i.addEventListener(t, o, s),
		() => {
			i.removeEventListener(t, o, s);
		}
	);
}
function Wi(e) {
	return e.replace(/-/g, ".");
}
function Ui(e) {
	return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function xe(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function Ji(e) {
	return [" ", "_"].includes(e)
		? e
		: e
				.replace(/([a-z])([A-Z])/g, "$1-$2")
				.replace(/[_\s]/, "-")
				.toLowerCase();
}
function Vi(e) {
	return ["keydown", "keyup"].includes(e);
}
function Kn(e) {
	return ["contextmenu", "click", "mouse"].some((t) => e.includes(t));
}
function Yi(e, t) {
	let n = t.filter(
		(o) =>
			![
				"window",
				"document",
				"prevent",
				"stop",
				"once",
				"capture",
				"self",
				"away",
				"outside",
				"passive",
			].includes(o),
	);
	if (n.includes("debounce")) {
		let o = n.indexOf("debounce");
		n.splice(o, xe((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
	}
	if (n.includes("throttle")) {
		let o = n.indexOf("throttle");
		n.splice(o, xe((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
	}
	if (n.length === 0 || (n.length === 1 && Ct(e.key).includes(n[0])))
		return !1;
	let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) =>
		n.includes(o),
	);
	return (
		(n = n.filter((o) => !i.includes(o))),
		!(
			i.length > 0 &&
			i.filter(
				(s) => (
					(s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`]
				),
			).length === i.length &&
			(Kn(e.type) || Ct(e.key).includes(n[0]))
		)
	);
}
function Ct(e) {
	if (!e) return [];
	e = Ji(e);
	let t = {
		ctrl: "control",
		slash: "/",
		space: " ",
		spacebar: " ",
		cmd: "meta",
		esc: "escape",
		up: "arrow-up",
		down: "arrow-down",
		left: "arrow-left",
		right: "arrow-right",
		period: ".",
		comma: ",",
		equal: "=",
		minus: "-",
		underscore: "_",
	};
	return (
		(t[e] = e),
		Object.keys(t)
			.map((n) => {
				if (t[n] === e) return n;
			})
			.filter((n) => n)
	);
}
y("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
	let o = e;
	t.includes("parent") && (o = e.parentNode);
	let s = m(o, n),
		a;
	typeof n == "string"
		? (a = m(o, `${n} = __placeholder`))
		: typeof n == "function" && typeof n() == "string"
			? (a = m(o, `${n()} = __placeholder`))
			: (a = () => {});
	let u = () => {
			let p;
			return s((v) => (p = v)), Mt(p) ? p.get() : p;
		},
		c = (p) => {
			let v;
			s((M) => (v = M)),
				Mt(v) ? v.set(p) : a(() => {}, { scope: { __placeholder: p } });
		};
	typeof n == "string" &&
		e.type === "radio" &&
		g(() => {
			e.hasAttribute("name") || e.setAttribute("name", n);
		});
	var l =
		e.tagName.toLowerCase() === "select" ||
		["checkbox", "radio"].includes(e.type) ||
		t.includes("lazy")
			? "change"
			: "input";
	let d = I
		? () => {}
		: Je(e, l, t, (p) => {
				c(Te(e, t, p, u()));
			});
	if (
		(t.includes("fill") &&
			([void 0, null, ""].includes(u()) ||
				(at(e) && Array.isArray(u())) ||
				(e.tagName.toLowerCase() === "select" && e.multiple)) &&
			c(Te(e, t, { target: e }, u())),
		e._x_removeModelListeners || (e._x_removeModelListeners = {}),
		(e._x_removeModelListeners.default = d),
		i(() => e._x_removeModelListeners.default()),
		e.form)
	) {
		let p = Je(e.form, "reset", [], (v) => {
			ot(
				() =>
					e._x_model && e._x_model.set(Te(e, t, { target: e }, u())),
			);
		});
		i(() => p());
	}
	(e._x_model = {
		get() {
			return u();
		},
		set(p) {
			c(p);
		},
	}),
		(e._x_forceModelUpdate = (p) => {
			p === void 0 && typeof n == "string" && n.match(/\./) && (p = ""),
				(window.fromModel = !0),
				g(() => dn(e, "value", p)),
				delete window.fromModel;
		}),
		r(() => {
			let p = u();
			(t.includes("unintrusive") &&
				document.activeElement.isSameNode(e)) ||
				e._x_forceModelUpdate(p);
		});
});
function Te(e, t, n, r) {
	return g(() => {
		if (n instanceof CustomEvent && n.detail !== void 0)
			return n.detail !== null && n.detail !== void 0
				? n.detail
				: n.target.value;
		if (at(e))
			if (Array.isArray(r)) {
				let i = null;
				return (
					t.includes("number")
						? (i = Ie(n.target.value))
						: t.includes("boolean")
							? (i = pe(n.target.value))
							: (i = n.target.value),
					n.target.checked
						? r.includes(i)
							? r
							: r.concat([i])
						: r.filter((o) => !Gi(o, i))
				);
			} else return n.target.checked;
		else {
			if (e.tagName.toLowerCase() === "select" && e.multiple)
				return t.includes("number")
					? Array.from(n.target.selectedOptions).map((i) => {
							let o = i.value || i.text;
							return Ie(o);
						})
					: t.includes("boolean")
						? Array.from(n.target.selectedOptions).map((i) => {
								let o = i.value || i.text;
								return pe(o);
							})
						: Array.from(n.target.selectedOptions).map(
								(i) => i.value || i.text,
							);
			{
				let i;
				return (
					gn(e)
						? n.target.checked
							? (i = n.target.value)
							: (i = r)
						: (i = n.target.value),
					t.includes("number")
						? Ie(i)
						: t.includes("boolean")
							? pe(i)
							: t.includes("trim")
								? i.trim()
								: i
				);
			}
		}
	});
}
function Ie(e) {
	let t = e ? parseFloat(e) : null;
	return Xi(t) ? t : e;
}
function Gi(e, t) {
	return e == t;
}
function Xi(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function Mt(e) {
	return (
		e !== null &&
		typeof e == "object" &&
		typeof e.get == "function" &&
		typeof e.set == "function"
	);
}
y("cloak", (e) => queueMicrotask(() => g(() => e.removeAttribute(U("cloak")))));
sn(() => `[${U("init")}]`);
y(
	"init",
	P((e, { expression: t }, { evaluate: n }) =>
		typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1),
	),
);
y("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
	let i = r(t);
	n(() => {
		i((o) => {
			g(() => {
				e.textContent = o;
			});
		});
	});
});
y("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
	let i = r(t);
	n(() => {
		i((o) => {
			g(() => {
				(e.innerHTML = o),
					(e._x_ignoreSelf = !0),
					C(e),
					delete e._x_ignoreSelf;
			});
		});
	});
});
nt(Yt(":", Gt(U("bind:"))));
var zn = (
	e,
	{ value: t, modifiers: n, expression: r, original: i },
	{ effect: o, cleanup: s },
) => {
	if (!t) {
		let u = {};
		ei(u),
			m(e, r)(
				(l) => {
					mn(e, l, i);
				},
				{ scope: u },
			);
		return;
	}
	if (t === "key") return Zi(e, r);
	if (
		e._x_inlineBindings &&
		e._x_inlineBindings[t] &&
		e._x_inlineBindings[t].extract
	)
		return;
	let a = m(e, r);
	o(() =>
		a((u) => {
			u === void 0 && typeof r == "string" && r.match(/\./) && (u = ""),
				g(() => dn(e, t, u, n));
		}),
	),
		s(() => {
			e._x_undoAddedClasses && e._x_undoAddedClasses(),
				e._x_undoAddedStyles && e._x_undoAddedStyles();
		});
};
zn.inline = (e, { value: t, modifiers: n, expression: r }) => {
	t &&
		(e._x_inlineBindings || (e._x_inlineBindings = {}),
		(e._x_inlineBindings[t] = { expression: r, extract: !1 }));
};
y("bind", zn);
function Zi(e, t) {
	e._x_keyExpression = t;
}
on(() => `[${U("data")}]`);
y("data", (e, { expression: t }, { cleanup: n }) => {
	if (Qi(e)) return;
	t = t === "" ? "{}" : t;
	let r = {};
	Le(r, e);
	let i = {};
	ni(i, r);
	let o = L(e, t, { scope: i });
	(o === void 0 || o === !0) && (o = {}), Le(o, e);
	let s = q(o);
	Dt(s);
	let a = re(e, s);
	s.init && L(e, s.init),
		n(() => {
			s.destroy && L(e, s.destroy), a();
		});
});
be((e, t) => {
	e._x_dataStack &&
		((t._x_dataStack = e._x_dataStack),
		t.setAttribute("data-has-alpine-state", !0));
});
function Qi(e) {
	return I ? (He ? !0 : e.hasAttribute("data-has-alpine-state")) : !1;
}
y("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
	let i = m(e, n);
	e._x_doHide ||
		(e._x_doHide = () => {
			g(() => {
				e.style.setProperty(
					"display",
					"none",
					t.includes("important") ? "important" : void 0,
				);
			});
		}),
		e._x_doShow ||
			(e._x_doShow = () => {
				g(() => {
					e.style.length === 1 && e.style.display === "none"
						? e.removeAttribute("style")
						: e.style.removeProperty("display");
				});
			});
	let o = () => {
			e._x_doHide(), (e._x_isShown = !1);
		},
		s = () => {
			e._x_doShow(), (e._x_isShown = !0);
		},
		a = () => setTimeout(s),
		u = Ke(
			(d) => (d ? s() : o()),
			(d) => {
				typeof e._x_toggleAndCascadeWithTransitions == "function"
					? e._x_toggleAndCascadeWithTransitions(e, d, s, o)
					: d
						? a()
						: o();
			},
		),
		c,
		l = !0;
	r(() =>
		i((d) => {
			(!l && d === c) ||
				(t.includes("immediate") && (d ? a() : o()),
				u(d),
				(c = d),
				(l = !1));
		}),
	);
});
y("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
	let i = to(t),
		o = m(e, i.items),
		s = m(e, e._x_keyExpression || "index");
	(e._x_prevKeys = []),
		(e._x_lookup = {}),
		n(() => eo(e, i, o, s)),
		r(() => {
			Object.values(e._x_lookup).forEach((a) =>
				g(() => {
					V(a), a.remove();
				}),
			),
				delete e._x_prevKeys,
				delete e._x_lookup;
		});
});
function eo(e, t, n, r) {
	let i = (s) => typeof s == "object" && !Array.isArray(s),
		o = e;
	n((s) => {
		no(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)),
			s === void 0 && (s = []);
		let a = e._x_lookup,
			u = e._x_prevKeys,
			c = [],
			l = [];
		if (i(s))
			s = Object.entries(s).map(([f, h]) => {
				let x = Tt(t, h, f, s);
				r(
					(b) => {
						l.includes(b) && E("Duplicate key on x-for", e),
							l.push(b);
					},
					{ scope: { index: f, ...x } },
				),
					c.push(x);
			});
		else
			for (let f = 0; f < s.length; f++) {
				let h = Tt(t, s[f], f, s);
				r(
					(x) => {
						l.includes(x) && E("Duplicate key on x-for", e),
							l.push(x);
					},
					{ scope: { index: f, ...h } },
				),
					c.push(h);
			}
		let d = [],
			p = [],
			v = [],
			M = [];
		for (let f = 0; f < u.length; f++) {
			let h = u[f];
			l.indexOf(h) === -1 && v.push(h);
		}
		u = u.filter((f) => !v.includes(f));
		let se = "template";
		for (let f = 0; f < l.length; f++) {
			let h = l[f],
				x = u.indexOf(h);
			if (x === -1) u.splice(f, 0, h), d.push([se, f]);
			else if (x !== f) {
				let b = u.splice(f, 1)[0],
					w = u.splice(x - 1, 1)[0];
				u.splice(f, 0, w), u.splice(x, 0, b), p.push([b, w]);
			} else M.push(h);
			se = h;
		}
		for (let f = 0; f < v.length; f++) {
			let h = v[f];
			h in a &&
				(g(() => {
					V(a[h]), a[h].remove();
				}),
				delete a[h]);
		}
		for (let f = 0; f < p.length; f++) {
			let [h, x] = p[f],
				b = a[h],
				w = a[x],
				K = document.createElement("div");
			g(() => {
				w || E('x-for ":key" is undefined or invalid', o, x, a),
					w.after(K),
					b.after(w),
					w._x_currentIfEl && w.after(w._x_currentIfEl),
					K.before(b),
					b._x_currentIfEl && b.after(b._x_currentIfEl),
					K.remove();
			}),
				w._x_refreshXForScope(c[l.indexOf(x)]);
		}
		for (let f = 0; f < d.length; f++) {
			let [h, x] = d[f],
				b = h === "template" ? o : a[h];
			b._x_currentIfEl && (b = b._x_currentIfEl);
			let w = c[x],
				K = l[x],
				Y = document.importNode(o.content, !0).firstElementChild,
				ht = q(w);
			re(Y, ht, o),
				(Y._x_refreshXForScope = (qn) => {
					Object.entries(qn).forEach(([Wn, Un]) => {
						ht[Wn] = Un;
					});
				}),
				g(() => {
					b.after(Y), P(() => C(Y))();
				}),
				typeof K == "object" &&
					E(
						"x-for key cannot be an object, it must be a string or an integer",
						o,
					),
				(a[K] = Y);
		}
		for (let f = 0; f < M.length; f++)
			a[M[f]]._x_refreshXForScope(c[l.indexOf(M[f])]);
		o._x_prevKeys = l;
	});
}
function to(e) {
	let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
		n = /^\s*\(|\)\s*$/g,
		r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
		i = e.match(r);
	if (!i) return;
	let o = {};
	o.items = i[2].trim();
	let s = i[1].replace(n, "").trim(),
		a = s.match(t);
	return (
		a
			? ((o.item = s.replace(t, "").trim()),
				(o.index = a[1].trim()),
				a[2] && (o.collection = a[2].trim()))
			: (o.item = s),
		o
	);
}
function Tt(e, t, n, r) {
	let i = {};
	return (
		/^\[.*\]$/.test(e.item) && Array.isArray(t)
			? e.item
					.replace("[", "")
					.replace("]", "")
					.split(",")
					.map((s) => s.trim())
					.forEach((s, a) => {
						i[s] = t[a];
					})
			: /^\{.*\}$/.test(e.item) &&
				  !Array.isArray(t) &&
				  typeof t == "object"
				? e.item
						.replace("{", "")
						.replace("}", "")
						.split(",")
						.map((s) => s.trim())
						.forEach((s) => {
							i[s] = t[s];
						})
				: (i[e.item] = t),
		e.index && (i[e.index] = n),
		e.collection && (i[e.collection] = r),
		i
	);
}
function no(e) {
	return !Array.isArray(e) && !isNaN(e);
}
function Hn() {}
Hn.inline = (e, { expression: t }, { cleanup: n }) => {
	let r = ye(e);
	r._x_refs || (r._x_refs = {}),
		(r._x_refs[t] = e),
		n(() => delete r._x_refs[t]);
};
y("ref", Hn);
y("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
	e.tagName.toLowerCase() !== "template" &&
		E("x-if can only be used on a <template> tag", e);
	let i = m(e, t),
		o = () => {
			if (e._x_currentIfEl) return e._x_currentIfEl;
			let a = e.content.cloneNode(!0).firstElementChild;
			return (
				re(a, {}, e),
				g(() => {
					e.after(a), P(() => C(a))();
				}),
				(e._x_currentIfEl = a),
				(e._x_undoIf = () => {
					g(() => {
						V(a), a.remove();
					}),
						delete e._x_currentIfEl;
				}),
				a
			);
		},
		s = () => {
			e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
		};
	n(() =>
		i((a) => {
			a ? o() : s();
		}),
	),
		r(() => e._x_undoIf && e._x_undoIf());
});
y("id", (e, { expression: t }, { evaluate: n }) => {
	n(t).forEach((i) => zi(e, i));
});
be((e, t) => {
	e._x_ids && (t._x_ids = e._x_ids);
});
nt(Yt("@", Gt(U("on:"))));
y(
	"on",
	P((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
		let o = r ? m(e, r) : () => {};
		e.tagName.toLowerCase() === "template" &&
			(e._x_forwardEvents || (e._x_forwardEvents = []),
			e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
		let s = Je(e, t, n, (a) => {
			o(() => {}, { scope: { $event: a }, params: [a] });
		});
		i(() => s());
	}),
);
Se("Collapse", "collapse", "collapse");
Se("Intersect", "intersect", "intersect");
Se("Focus", "trap", "focus");
Se("Mask", "mask", "mask");
function Se(e, t, n) {
	y(t, (r) =>
		E(
			`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,
			r,
		),
	);
}
oe.setEvaluator(Wt);
oe.setReactivityEngine({ reactive: _t, effect: di, release: pi, raw: _ });
var ro = oe,
	co = ro;
export { ro as Alpine, co as default };
//# sourceMappingURL=alpinejs.mjs.map
