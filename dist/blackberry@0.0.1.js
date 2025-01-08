// assets/reactivity@3.5.13.js
function de(e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
var Ie = {};
var Pe = () => {
};
var ge = Object.assign;
var Ve = (e, t) => {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
};
var ct = Object.prototype.hasOwnProperty;
var U = (e, t) => ct.call(e, t);
var T = Array.isArray;
var k = (e) => Q(e) === "[object Map]";
var Fe = (e) => Q(e) === "[object Set]";
var I = (e) => typeof e == "function";
var lt = (e) => typeof e == "string";
var P = (e) => typeof e == "symbol";
var D = (e) => e !== null && typeof e == "object";
var ft = Object.prototype.toString;
var Q = (e) => ft.call(e);
var je = (e) => Q(e).slice(8, -1);
var He = (e) => Q(e) === "[object Object]";
var ee = (e) => lt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
var te = (e) => {
  let t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
};
var ut = /-(\w)/g;
var jt = te((e) => e.replace(ut, (t, n) => n ? n.toUpperCase() : ""));
var pt = /\B([A-Z])/g;
var Ht = te((e) => e.replace(pt, "-$1").toLowerCase());
var ht = te((e) => e.charAt(0).toUpperCase() + e.slice(1));
var Kt = te((e) => e ? `on${ht(e)}` : "");
var w = (e, t) => !Object.is(e, t);
var Ke = (e, t, n, s = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: s, value: n });
};
var dt = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
var Ut = de(dt + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function gt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
var _;
var ve = class {
  constructor(t = false) {
    this.detached = t, this._active = true, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = _, !t && _ && (this.index = (_.scopes || (_.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      let n = _;
      try {
        return _ = this, t();
      } finally {
        _ = n;
      }
    }
  }
  on() {
    _ = this;
  }
  off() {
    _ = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = false;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        let i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
};
function Yt(e) {
  return new ve(e);
}
function _t() {
  return _;
}
function Bt(e, t = false) {
  _ && _.cleanups.push(e);
}
var u;
var $t = { ACTIVE: 1, 1: "ACTIVE", RUNNING: 2, 2: "RUNNING", TRACKING: 4, 4: "TRACKING", NOTIFIED: 8, 8: "NOTIFIED", DIRTY: 16, 16: "DIRTY", ALLOW_RECURSE: 32, 32: "ALLOW_RECURSE", PAUSED: 64, 64: "PAUSED" };
var _e = /* @__PURE__ */ new WeakSet();
var F = class {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _ && _.active && _.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, _e.has(this) && (_e.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || We(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Ue(this), Ye(this);
    let t = u, n = y;
    u = this, y = true;
    try {
      return this.fn();
    } finally {
      Be(this), u = t, y = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Le(t);
      this.deps = this.depsTail = void 0, Ue(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? _e.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    ye(this) && this.run();
  }
  get dirty() {
    return ye(this);
  }
};
var Ge = 0;
var G;
var W;
function We(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = W, W = e;
    return;
  }
  e.next = G, G = e;
}
function De() {
  Ge++;
}
function Ce() {
  if (--Ge > 0) return;
  if (W) {
    let t = W;
    for (W = void 0; t; ) {
      let n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; G; ) {
    let t = G;
    for (G = void 0; t; ) {
      let n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (s) {
        e || (e = s);
      }
      t = n;
    }
  }
  if (e) throw e;
}
function Ye(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Be(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    let i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), Le(s), mt(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function ye(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && ($e(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function $e(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === B)) return;
  e.globalVersion = B;
  let t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !ye(e)) {
    e.flags &= -3;
    return;
  }
  let n = u, s = y;
  u = e, y = true;
  try {
    Ye(e);
    let i = e.fn(e._value);
    (t.version === 0 || w(i, e._value)) && (e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    u = n, y = s, Be(e), e.flags &= -3;
  }
}
function Le(e, t = false) {
  let { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep) Le(r, true);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function mt(e) {
  let { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function qt(e, t) {
  e.effect instanceof F && (e = e.effect.fn);
  let n = new F(e);
  t && ge(n, t);
  try {
    n.run();
  } catch (i) {
    throw n.stop(), i;
  }
  let s = n.run.bind(n);
  return s.effect = n, s;
}
function Xt(e) {
  e.effect.stop();
}
var y = true;
var Me = [];
function qe() {
  Me.push(y), y = false;
}
function Jt() {
  Me.push(y), y = true;
}
function Xe() {
  let e = Me.pop();
  y = e === void 0 ? true : e;
}
function Zt(e, t = false) {
  u instanceof F && (u.cleanup = e);
}
function Ue(e) {
  let { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    let n = u;
    u = void 0;
    try {
      t();
    } finally {
      u = n;
    }
  }
}
var B = 0;
var be = class {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
};
var j = class {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!u || !y || u === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== u) n = this.activeLink = new be(u, this), u.deps ? (n.prevDep = u.depsTail, u.depsTail.nextDep = n, u.depsTail = n) : u.deps = u.depsTail = n, Je(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      let s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = u.depsTail, n.nextDep = void 0, u.depsTail.nextDep = n, u.depsTail = n, u.deps === n && (u.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, B++, this.notify(t);
  }
  notify(t) {
    De();
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ce();
    }
  }
};
function Je(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    let t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) Je(s);
    }
    let n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
var re = /* @__PURE__ */ new WeakMap();
var C = Symbol("");
var Se = Symbol("");
var $ = Symbol("");
function E(e, t, n) {
  if (y && u) {
    let s = re.get(e);
    s || re.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new j()), i.map = s, i.key = n), i.track();
  }
}
function R(e, t, n, s, i, r) {
  let o = re.get(e);
  if (!o) {
    B++;
    return;
  }
  let a = (c) => {
    c && c.trigger();
  };
  if (De(), t === "clear") o.forEach(a);
  else {
    let c = T(e), d = c && ee(n);
    if (c && n === "length") {
      let g = Number(s);
      o.forEach((l, h3) => {
        (h3 === "length" || h3 === $ || !P(h3) && h3 >= g) && a(l);
      });
    } else switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), d && a(o.get($)), t) {
      case "add":
        c ? d && a(o.get("length")) : (a(o.get(C)), k(e) && a(o.get(Se)));
        break;
      case "delete":
        c || (a(o.get(C)), k(e) && a(o.get(Se)));
        break;
      case "set":
        k(e) && a(o.get(C));
        break;
    }
  }
  Ce();
}
function Et(e, t) {
  let n = re.get(e);
  return n && n.get(t);
}
function V(e) {
  let t = p(e);
  return t === e ? t : (E(t, "iterate", $), b(e) ? t : t.map(m));
}
function ke(e) {
  return E(e = p(e), "iterate", $), e;
}
var vt = { __proto__: null, [Symbol.iterator]() {
  return me(this, Symbol.iterator, m);
}, concat(...e) {
  return V(this).concat(...e.map((t) => T(t) ? V(t) : t));
}, entries() {
  return me(this, "entries", (e) => (e[1] = m(e[1]), e));
}, every(e, t) {
  return N(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return N(this, "filter", e, t, (n) => n.map(m), arguments);
}, find(e, t) {
  return N(this, "find", e, t, m, arguments);
}, findIndex(e, t) {
  return N(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return N(this, "findLast", e, t, m, arguments);
}, findLastIndex(e, t) {
  return N(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return N(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return Ee(this, "includes", e);
}, indexOf(...e) {
  return Ee(this, "indexOf", e);
}, join(e) {
  return V(this).join(e);
}, lastIndexOf(...e) {
  return Ee(this, "lastIndexOf", e);
}, map(e, t) {
  return N(this, "map", e, t, void 0, arguments);
}, pop() {
  return z(this, "pop");
}, push(...e) {
  return z(this, "push", e);
}, reduce(e, ...t) {
  return ze(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return ze(this, "reduceRight", e, t);
}, shift() {
  return z(this, "shift");
}, some(e, t) {
  return N(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return z(this, "splice", e);
}, toReversed() {
  return V(this).toReversed();
}, toSorted(e) {
  return V(this).toSorted(e);
}, toSpliced(...e) {
  return V(this).toSpliced(...e);
}, unshift(...e) {
  return z(this, "unshift", e);
}, values() {
  return me(this, "values", m);
} };
function me(e, t, n) {
  let s = ke(e), i = s[t]();
  return s !== e && !b(e) && (i._next = i.next, i.next = () => {
    let r = i._next();
    return r.value && (r.value = n(r.value)), r;
  }), i;
}
var yt = Array.prototype;
function N(e, t, n, s, i, r) {
  let o = ke(e), a = o !== e && !b(e), c = o[t];
  if (c !== yt[t]) {
    let l = c.apply(e, r);
    return a ? m(l) : l;
  }
  let d = n;
  o !== e && (a ? d = function(l, h3) {
    return n.call(this, m(l), h3, e);
  } : n.length > 2 && (d = function(l, h3) {
    return n.call(this, l, h3, e);
  }));
  let g = c.call(o, d, s);
  return a && i ? i(g) : g;
}
function ze(e, t, n, s) {
  let i = ke(e), r = n;
  return i !== e && (b(e) ? n.length > 3 && (r = function(o, a, c) {
    return n.call(this, o, a, c, e);
  }) : r = function(o, a, c) {
    return n.call(this, o, m(a), c, e);
  }), i[t](r, ...s);
}
function Ee(e, t, n) {
  let s = p(e);
  E(s, "iterate", $);
  let i = s[t](...n);
  return (i === -1 || i === false) && It(n[0]) ? (n[0] = p(n[0]), s[t](...n)) : i;
}
function z(e, t, n = []) {
  qe(), De();
  let s = p(e)[t].apply(e, n);
  return Ce(), Xe(), s;
}
var bt = de("__proto__,__v_isRef,__isVue");
var Ze = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(P));
function St(e) {
  P(e) || (e = String(e));
  let t = p(this);
  return E(t, "has", e), t.hasOwnProperty(e);
}
var oe = class {
  constructor(t = false, n = false) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    let i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive") return !i;
    if (n === "__v_isReadonly") return i;
    if (n === "__v_isShallow") return r;
    if (n === "__v_raw") return s === (i ? r ? nt : tt : r ? et : Qe).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    let o = T(t);
    if (!i) {
      let c;
      if (o && (c = vt[n])) return c;
      if (n === "hasOwnProperty") return St;
    }
    let a = Reflect.get(t, n, v(t) ? t : s);
    return (P(n) ? Ze.has(n) : bt(n)) || (i || E(t, "get", n), r) ? a : v(a) ? o && ee(n) ? a : a.value : D(a) ? i ? st(a) : it(a) : a;
  }
};
var ae = class extends oe {
  constructor(t = false) {
    super(false, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    if (!this._isShallow) {
      let c = L(r);
      if (!b(s) && !L(s) && (r = p(r), s = p(s)), !T(t) && v(r) && !v(s)) return c ? false : (r.value = s, true);
    }
    let o = T(t) && ee(n) ? Number(n) < t.length : U(t, n), a = Reflect.set(t, n, s, v(t) ? t : i);
    return t === p(i) && (o ? w(s, r) && R(t, "set", n, s, r) : R(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    let s = U(t, n), i = t[n], r = Reflect.deleteProperty(t, n);
    return r && s && R(t, "delete", n, void 0, i), r;
  }
  has(t, n) {
    let s = Reflect.has(t, n);
    return (!P(n) || !Ze.has(n)) && E(t, "has", n), s;
  }
  ownKeys(t) {
    return E(t, "iterate", T(t) ? "length" : C), Reflect.ownKeys(t);
  }
};
var ce = class extends oe {
  constructor(t = false) {
    super(true, t);
  }
  set(t, n) {
    return true;
  }
  deleteProperty(t, n) {
    return true;
  }
};
var Tt = new ae();
var wt = new ce();
var Nt = new ae(true);
var Ot = new ce(true);
var Te = (e) => e;
var ne = (e) => Reflect.getPrototypeOf(e);
function Rt(e, t, n) {
  return function(...s) {
    let i = this.__v_raw, r = p(i), o = k(r), a = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = i[e](...s), g = n ? Te : t ? we : m;
    return !t && E(r, "iterate", c ? Se : C), { next() {
      let { value: l, done: h3 } = d.next();
      return h3 ? { value: l, done: h3 } : { value: a ? [g(l[0]), g(l[1])] : g(l), done: h3 };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function ie(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function At(e, t) {
  let n = { get(i) {
    let r = this.__v_raw, o = p(r), a = p(i);
    e || (w(i, a) && E(o, "get", i), E(o, "get", a));
    let { has: c } = ne(o), d = t ? Te : e ? we : m;
    if (c.call(o, i)) return d(r.get(i));
    if (c.call(o, a)) return d(r.get(a));
    r !== o && r.get(i);
  }, get size() {
    let i = this.__v_raw;
    return !e && E(p(i), "iterate", C), Reflect.get(i, "size", i);
  }, has(i) {
    let r = this.__v_raw, o = p(r), a = p(i);
    return e || (w(i, a) && E(o, "has", i), E(o, "has", a)), i === a ? r.has(i) : r.has(i) || r.has(a);
  }, forEach(i, r) {
    let o = this, a = o.__v_raw, c = p(a), d = t ? Te : e ? we : m;
    return !e && E(c, "iterate", C), a.forEach((g, l) => i.call(r, d(g), d(l), o));
  } };
  return ge(n, e ? { add: ie("add"), set: ie("set"), delete: ie("delete"), clear: ie("clear") } : { add(i) {
    !t && !b(i) && !L(i) && (i = p(i));
    let r = p(this);
    return ne(r).has.call(r, i) || (r.add(i), R(r, "add", i, i)), this;
  }, set(i, r) {
    !t && !b(r) && !L(r) && (r = p(r));
    let o = p(this), { has: a, get: c } = ne(o), d = a.call(o, i);
    d || (i = p(i), d = a.call(o, i));
    let g = c.call(o, i);
    return o.set(i, r), d ? w(r, g) && R(o, "set", i, r, g) : R(o, "add", i, r), this;
  }, delete(i) {
    let r = p(this), { has: o, get: a } = ne(r), c = o.call(r, i);
    c || (i = p(i), c = o.call(r, i));
    let d = a ? a.call(r, i) : void 0, g = r.delete(i);
    return c && R(r, "delete", i, void 0, d), g;
  }, clear() {
    let i = p(this), r = i.size !== 0, o = void 0, a = i.clear();
    return r && R(i, "clear", void 0, void 0, o), a;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    n[i] = Rt(i, e, t);
  }), n;
}
function fe(e, t) {
  let n = At(e, t);
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(U(n, i) && i in s ? n : s, i, r);
}
var xt = { get: fe(false, false) };
var Dt = { get: fe(false, true) };
var Ct = { get: fe(true, false) };
var Lt = { get: fe(true, true) };
var Qe = /* @__PURE__ */ new WeakMap();
var et = /* @__PURE__ */ new WeakMap();
var tt = /* @__PURE__ */ new WeakMap();
var nt = /* @__PURE__ */ new WeakMap();
function Mt(e) {
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
function kt(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Mt(je(e));
}
function it(e) {
  return L(e) ? e : ue(e, false, Tt, xt, Qe);
}
function Qt(e) {
  return ue(e, false, Nt, Dt, et);
}
function st(e) {
  return ue(e, true, wt, Ct, tt);
}
function en(e) {
  return ue(e, true, Ot, Lt, nt);
}
function ue(e, t, n, s, i) {
  if (!D(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  let r = i.get(e);
  if (r) return r;
  let o = kt(e);
  if (o === 0) return e;
  let a = new Proxy(e, o === 2 ? s : n);
  return i.set(e, a), a;
}
function Y(e) {
  return L(e) ? Y(e.__v_raw) : !!(e && e.__v_isReactive);
}
function L(e) {
  return !!(e && e.__v_isReadonly);
}
function b(e) {
  return !!(e && e.__v_isShallow);
}
function It(e) {
  return e ? !!e.__v_raw : false;
}
function p(e) {
  let t = e && e.__v_raw;
  return t ? p(t) : e;
}
function tn(e) {
  return !U(e, "__v_skip") && Object.isExtensible(e) && Ke(e, "__v_skip", true), e;
}
var m = (e) => D(e) ? it(e) : e;
var we = (e) => D(e) ? st(e) : e;
function v(e) {
  return e ? e.__v_isRef === true : false;
}
function Pt(e) {
  return rt(e, false);
}
function nn(e) {
  return rt(e, true);
}
function rt(e, t) {
  return v(e) ? e : new Ne(e, t);
}
var Ne = class {
  constructor(t, n) {
    this.dep = new j(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : p(t), this._value = n ? t : m(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    let n = this._rawValue, s = this.__v_isShallow || b(t) || L(t);
    t = s ? t : p(t), w(t, n) && (this._rawValue = t, this._value = s ? t : m(t), this.dep.trigger());
  }
};
function sn(e) {
  e.dep && e.dep.trigger();
}
function ot(e) {
  return v(e) ? e.value : e;
}
function rn(e) {
  return I(e) ? e() : ot(e);
}
var Vt = { get: (e, t, n) => t === "__v_raw" ? e : ot(Reflect.get(e, t, n)), set: (e, t, n, s) => {
  let i = e[t];
  return v(i) && !v(n) ? (i.value = n, true) : Reflect.set(e, t, n, s);
} };
function on(e) {
  return Y(e) ? e : new Proxy(e, Vt);
}
var Oe = class {
  constructor(t) {
    this.__v_isRef = true, this._value = void 0;
    let n = this.dep = new j(), { get: s, set: i } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = s, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
};
function an(e) {
  return new Oe(e);
}
function cn(e) {
  let t = T(e) ? new Array(e.length) : {};
  for (let n in e) t[n] = at(e, n);
  return t;
}
var Re = class {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = true, this._value = void 0;
  }
  get value() {
    let t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Et(p(this._object), this._key);
  }
};
var Ae = class {
  constructor(t) {
    this._getter = t, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
};
function ln(e, t, n) {
  return v(e) ? e : I(e) ? new Ae(e) : D(e) && arguments.length > 1 ? at(e, t, n) : Pt(e);
}
function at(e, t, n) {
  let s = e[t];
  return v(s) ? s : new Re(e, t, n);
}
var xe = class {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new j(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = B - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && u !== this) return We(this, true), true;
  }
  get value() {
    let t = this.dep.track();
    return $e(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
};
function fn(e, t, n = false) {
  let s, i;
  return I(e) ? s = e : (s = e.get, i = e.set), new xe(s, i, n);
}
var un = { GET: "get", HAS: "has", ITERATE: "iterate" };
var pn = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" };
var hn = { SKIP: "__v_skip", IS_REACTIVE: "__v_isReactive", IS_READONLY: "__v_isReadonly", IS_SHALLOW: "__v_isShallow", RAW: "__v_raw", IS_REF: "__v_isRef" };
var dn = { WATCH_GETTER: 2, 2: "WATCH_GETTER", WATCH_CALLBACK: 3, 3: "WATCH_CALLBACK", WATCH_CLEANUP: 4, 4: "WATCH_CLEANUP" };
var se = {};
var le = /* @__PURE__ */ new WeakMap();
var O;
function gn() {
  return O;
}
function Ft(e, t = false, n = O) {
  if (n) {
    let s = le.get(n);
    s || le.set(n, s = []), s.push(e);
  }
}
function _n(e, t, n = Ie) {
  let { immediate: s, deep: i, once: r, scheduler: o, augmentJob: a, call: c } = n, d = (f) => {
    (n.onWarn || gt)("Invalid watch source: ", f, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, g = (f) => i ? f : b(f) || i === false || i === 0 ? A(f, 1) : A(f), l, h3, H, q, X = false, J = false;
  if (v(e) ? (h3 = () => e.value, X = b(e)) : Y(e) ? (h3 = () => g(e), X = true) : T(e) ? (J = true, X = e.some((f) => Y(f) || b(f)), h3 = () => e.map((f) => {
    if (v(f)) return f.value;
    if (Y(f)) return g(f);
    if (I(f)) return c ? c(f, 2) : f();
  })) : I(e) ? t ? h3 = c ? () => c(e, 2) : e : h3 = () => {
    if (H) {
      qe();
      try {
        H();
      } finally {
        Xe();
      }
    }
    let f = O;
    O = l;
    try {
      return c ? c(e, 3, [q]) : e(q);
    } finally {
      O = f;
    }
  } : h3 = Pe, t && i) {
    let f = h3, S = i === true ? 1 / 0 : i;
    h3 = () => A(f(), S);
  }
  let pe = _t(), M = () => {
    l.stop(), pe && pe.active && Ve(pe.effects, l);
  };
  if (r && t) {
    let f = t;
    t = (...S) => {
      f(...S), M();
    };
  }
  let x = J ? new Array(e.length).fill(se) : se, K = (f) => {
    if (!(!(l.flags & 1) || !l.dirty && !f)) if (t) {
      let S = l.run();
      if (i || X || (J ? S.some((he, Z) => w(he, x[Z])) : w(S, x))) {
        H && H();
        let he = O;
        O = l;
        try {
          let Z = [S, x === se ? void 0 : J && x[0] === se ? [] : x, q];
          c ? c(t, 3, Z) : t(...Z), x = S;
        } finally {
          O = he;
        }
      }
    } else l.run();
  };
  return a && a(K), l = new F(h3), l.scheduler = o ? () => o(K, false) : K, q = (f) => Ft(f, false, l), H = l.onStop = () => {
    let f = le.get(l);
    if (f) {
      if (c) c(f, 4);
      else for (let S of f) S();
      le.delete(l);
    }
  }, t ? s ? K(true) : x = l.run() : o ? o(K.bind(null, true), true) : l.run(), M.pause = l.pause.bind(l), M.resume = l.resume.bind(l), M.stop = M, M;
}
function A(e, t = 1 / 0, n) {
  if (t <= 0 || !D(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e))) return e;
  if (n.add(e), t--, v(e)) A(e.value, t, n);
  else if (T(e)) for (let s = 0; s < e.length; s++) A(e[s], t, n);
  else if (Fe(e) || k(e)) e.forEach((s) => {
    A(s, t, n);
  });
  else if (He(e)) {
    for (let s in e) A(e[s], t, n);
    for (let s of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, s) && A(e[s], t, n);
  }
  return e;
}

// src/vdom.js
var SSR_NODE = 1;
var TEXT_NODE = 3;
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var SVG_NS = "http://www.w3.org/2000/svg";
var renderContext = null;
var VirtualNode = class {
  constructor(tag, props, children, type, node) {
    this.tag = tag;
    this.props = props;
    this.key = props.key;
    this.children = ensureArray(props.children ?? children);
    this.type = type;
    this.node = node;
  }
};
function listenerDelegate(event) {
  this.events[event.type](event);
}
var ensureArray = (x) => Array.isArray(x) ? x : [x];
var isStrNum = (x) => typeof x === "string" || typeof x === "number";
var getKey = (vdom) => vdom == null ? vdom : vdom.key;
function patchProperty(node, key, oldValue, newValue, isSvg) {
  if (key === "key" || key === "unsafeInnerHtml") {
  } else if (key === "ref" && typeof newValue === "object") {
    newValue.value = node;
  } else if (key[0] === "o" && key[1] === "n") {
    let host = renderContext.host ?? node;
    if (!((node.events ?? (node.events = {}))[key = key.slice(2)] = newValue ? (e) => newValue.call(host, e) : void 0)) {
      node.removeEventListener(key, listenerDelegate);
    } else if (!oldValue) {
      node.addEventListener(key, listenerDelegate);
    }
  } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
    node[key] = newValue == null ? "" : newValue;
  } else if (newValue == null || newValue === false) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, newValue);
  }
}
function createNode(vdom, isSvg) {
  while (typeof vdom.tag === "function") {
    vdom = vdom.tag(vdom.props, vdom.children);
  }
  let props = vdom.props, node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is }) : document.createElement(vdom.tag, { is: props.is });
  for (let k2 in props) {
    patchProperty(node, k2, null, props[k2], isSvg);
  }
  if (props.unsafeInnerHtml) {
    node.innerHTML = props.unsafeInnerHtml;
  } else {
    for (let i = 0; i < vdom.children.length; i++) {
      if (!vdom.children[i]) continue;
      while (typeof vdom.children[i].tag === "function") {
        vdom.children[i] = vdom.children[i].tag(vdom.children[i].props, vdom.children[i].children);
      }
    }
    for (let i = 0; i < vdom.children.length; i++) {
      node.appendChild(
        createNode(vdom.children[i] = vdomify(vdom.children[i]), isSvg)
      );
    }
    node._vchildren = vdom.children;
  }
  return vdom.node = node;
}
var vdomify = (newVNode) => newVNode !== true && newVNode !== false && newVNode ? newVNode : text("");
function patchChildren(node, newVKids, isSvg) {
  for (let i2 = 0; i2 < newVKids.length; i2++) {
    if (!newVKids[i2]) continue;
    while (typeof newVKids[i2].tag === "function") {
      newVKids[i2] = newVKids[i2].tag(newVKids[i2].props, newVKids[i2].children);
    }
  }
  let oldVKids = node._vchildren ??= [];
  let tmpVKid, oldVKid, oldKey, newKey, oldHead = 0, newHead = 0, oldTail = oldVKids.length - 1, newTail = newVKids.length - 1;
  while (newHead <= newTail && oldHead <= oldTail) {
    if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
      break;
    }
    patchNode(
      node,
      oldVKids[oldHead].node,
      oldVKids[oldHead++],
      newVKids[newHead] = vdomify(newVKids[newHead++]),
      isSvg
    );
  }
  while (newHead <= newTail && oldHead <= oldTail) {
    if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
      break;
    }
    patchNode(
      node,
      oldVKids[oldTail].node,
      oldVKids[oldTail--],
      newVKids[newTail] = vdomify(newVKids[newTail--]),
      isSvg
    );
  }
  if (oldHead > oldTail) {
    while (newHead <= newTail) {
      node.insertBefore(
        createNode(newVKids[newHead] = vdomify(newVKids[newHead++]), isSvg),
        (oldVKid = oldVKids[oldHead]) && oldVKid.node
      );
    }
  } else if (newHead > newTail) {
    while (oldHead <= oldTail) {
      node.removeChild(oldVKids[oldHead++].node);
    }
  } else {
    for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
      if ((oldKey = oldVKids[i].key) != null) {
        keyed[oldKey] = oldVKids[i];
      }
    }
    while (newHead <= newTail) {
      oldKey = getKey(oldVKid = oldVKids[oldHead]);
      newKey = getKey(newVKids[newHead] = vdomify(newVKids[newHead]));
      if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
        if (oldKey == null) {
          node.removeChild(oldVKid.node);
        }
        oldHead++;
        continue;
      }
      if (newKey == null || oldVNode.type === SSR_NODE) {
        if (oldKey == null) {
          patchNode(
            node,
            oldVKid && oldVKid.node,
            oldVKid,
            newVKids[newHead],
            isSvg
          );
          newHead++;
        }
        oldHead++;
      } else {
        if (oldKey === newKey) {
          patchNode(node, oldVKid.node, oldVKid, newVKids[newHead], isSvg);
          newKeyed[newKey] = true;
          oldHead++;
        } else {
          if ((tmpVKid = keyed[newKey]) != null) {
            patchNode(
              node,
              node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),
              tmpVKid,
              newVKids[newHead],
              isSvg
            );
            newKeyed[newKey] = true;
          } else {
            patchNode(
              node,
              oldVKid && oldVKid.node,
              null,
              newVKids[newHead],
              isSvg
            );
          }
        }
        newHead++;
      }
    }
    while (oldHead <= oldTail) {
      if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
        node.removeChild(oldVKid.node);
      }
    }
    for (var i in keyed) {
      if (newKeyed[i] == null) {
        node.removeChild(keyed[i].node);
      }
    }
  }
  node._vchildren = newVKids;
}
function patchNode(parent, node, oldVNode2, newVNode, isSvg) {
  if (oldVNode2 === newVNode) {
  } else if (oldVNode2 != null && oldVNode2.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
    if (oldVNode2.tag !== newVNode.tag) node.nodeValue = newVNode.tag;
  } else if (oldVNode2 == null || oldVNode2.tag !== newVNode.tag) {
    node = parent.insertBefore(
      createNode(newVNode = vdomify(newVNode), isSvg),
      node
    );
    if (oldVNode2 != null) {
      parent.removeChild(oldVNode2.node);
    }
  } else {
    let oldProps = oldVNode2.props, newProps = newVNode.props;
    isSvg = isSvg || newVNode.tag === "svg";
    for (let i in { ...oldProps, ...newProps }) {
      if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldProps[i]) !== newProps[i]) {
        patchProperty(node, i, oldProps[i], newProps[i], isSvg);
      }
    }
    if (newProps.unsafeInnerHtml) {
      node.innerHTML = newProps.unsafeInnerHtml;
    } else {
      patchChildren(node, newVNode.children, isSvg);
    }
  }
  return newVNode.node = node;
}
var text = (value, node) => new VirtualNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);
var createElement = (tag, props, children = EMPTY_ARR) => new VirtualNode(tag, props, children);
var h = (type, props, ...children) => createElement(type, props ?? {}, children.flatMap((any) => isStrNum(any) ? text(any) : any));
var Fragment = (_2, c) => c;
function render(element, children, ctx = {}) {
  renderContext = ctx;
  patchChildren(element, Array.isArray(children) ? children : [children]);
  renderContext = null;
}
var elementFactory = (tag) => (propsOrChild, ...children) => {
  if (propsOrChild instanceof VNode || isStrNum(propsOrChild)) {
    children.unshift(propsOrChild);
    propsOrChild = {};
  }
  return createElement(tag, propsOrChild, children);
};
var Box = elementFactory("div");
var Button = elementFactory("button");
var Link = elementFactory("link");
var Paragraph = elementFactory("p");
var Span = elementFactory("span");
var Image = elementFactory("img");
var Form = elementFactory("form");
var Input = elementFactory("input");
var Label = elementFactory("label");
var Heading = {
  H1: elementFactory("h1"),
  H2: elementFactory("h2"),
  H3: elementFactory("h3"),
  H4: elementFactory("h4"),
  H5: elementFactory("h5"),
  H6: elementFactory("h6")
};
var OrderedList = elementFactory("ol");
var List = elementFactory("ul");
var ListItem = elementFactory("li");
var Section = elementFactory("section");
var Main = elementFactory("main");
var Nav = elementFactory("nav");
var Footer = elementFactory("footer");

// src/template.js
var isLazy = Symbol("lazy");
var Lazy = class {
  constructor(fn2) {
    this.fn = fn2;
  }
  [isLazy] = true;
};
var unwrap = (v2) => v2[isLazy] ? v2.fn() : v2;
var Expression = class _Expression {
  static Cache = /* @__PURE__ */ new Map();
  constructor(expression) {
    if (_Expression.Cache.has(expression)) {
      this.call = _Expression.Cache.get(expression);
    }
    const safeFunction = () => {
      try {
        let func = new Function(["scope"], `with (scope) {  return ${expression}; }`);
        Object.defineProperty(func, "name", {
          value: `[expression]: ${expression}`
        });
        return func;
      } catch (error) {
        console.log(`Error while compiling expression: ${expression}`, error);
        return () => "";
      }
    };
    _Expression.Cache.set(expression, safeFunction());
    this.call = _Expression.Cache.get(expression);
  }
};
function resolveScopePath(key, scope) {
  let segments = key.split(".");
  let value = scope;
  for (let segment of segments) {
    value = value[segment];
  }
  return value;
}
function compileIntermediary(element, scope) {
  if (!element) return null;
  if (Array.isArray(element)) {
    return element.map((e) => compileIntermediary(e, scope));
  }
  if (element.nodeType != 1) {
    return new text(element.nodeValue);
  }
  let tag = element.tagName.toLowerCase();
  let attributes = {}, children = [], show, eachStatement, eachVar, ifCondition, childExpression;
  for (let attr of element.attributes) {
    let key = attr.nodeName, value = attr.nodeValue, expression, modifier;
    if (attr.nodeName[0] === ":") {
      expression = true;
      key = attr.nodeName.slice(1);
    } else if (attr.nodeName.includes(":")) {
      expression = true;
      key = attr.nodeName.split(":")[0];
      modifier = attr.nodeName.split(":")[1];
    }
    if (expression) {
      if (key === "text") {
        childExpression = new Lazy(() => text(new Expression(value).call(scope)));
      } else if (key === "unsafe-inner-html") {
        attributes["unsafeInnerHtml"] = new Lazy(() => new Expression(value).call(scope));
      } else if (key === "show") {
        show = new Expression(attr.nodeValue);
      } else if (key === "if") {
        ifCondition = new Expression(attr.nodeValue);
      } else if (key === "each" && modifier) {
        eachStatement = new Expression(value);
        eachVar = modifier;
      } else {
        attributes[key] = new Lazy(() => new Expression(value).call(scope));
      }
    } else {
      if (key[0] === "@") {
        attributes["on" + key.slice(1)] = new Lazy(() => resolveScopePath(value, scope));
      } else {
        attributes[key] = value;
      }
    }
  }
  children.push(childExpression, ...Array.from((tag == "template" ? element.content : element).childNodes));
  for (let i = 0; i < children.length; i++) {
    if (children[i] instanceof Lazy) continue;
    children[i] = compileIntermediary(children[i], scope);
  }
  return new Lazy(
    show ? () => show(scope) ? createElement(tag, attributes, children) : null : () => createElement(tag, attributes, children)
  );
}
function renderIntermediaryTemplate(lazy) {
  if (!lazy) return null;
  if (Array.isArray(lazy)) {
    return lazy.map((l) => renderIntermediaryTemplate(l));
  }
  let vnode = unwrap(lazy);
  if (!vnode) return null;
  if (vnode.props) {
    for (let k2 in vnode.props) {
      if (vnode.props[k2] instanceof Lazy) {
        vnode.props[k2] = unwrap(vnode.props[k2]);
      }
    }
  }
  if (vnode.children) vnode.children = vnode.children.map((c) => renderIntermediaryTemplate(c));
  return vnode;
}
function constructComponentFromElement(element) {
  if (element.tagName !== "TEMPLATE" || !(typeof element.getAttribute("blackberry") === "string")) {
    return;
  }
  let tagname = element.getAttribute("blackberry");
  if (customElements.get(tagname)) return;
  let script = "", style = "", els = [];
  for (let child of element.content.children) {
    if (child.tagName === "SCRIPT") {
      script += child.innerHTML;
      els.push(child);
    } else if (child.tagName === "STYLE") {
      style += child.innerText;
      els.push(child);
    }
  }
  els.forEach((el) => el.remove());
  const markup = element.content;
  const attrs = element.getAttribute("attributes")?.split(",").map((prop) => prop.trim()) ?? [];
  element.remove();
  const scopedSheet = new CSSStyleSheet();
  scopedSheet.replaceSync(style ?? "");
  const sheets = [scopedSheet];
  const setup = new Function(
    "$element",
    "$state",
    "$attributes",
    "$props",
    "$cleanup",
    "$reactive",
    "$effect",
    script
  );
  customElements.define(tagname, class extends HTMLElement {
    static get observedAttributes() {
      return attrs;
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      this.__blackberry_attrs[name] = newValue;
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.adoptedStyleSheets = sheets;
      this.rootEffectScope = Yt();
    }
    connectedCallback() {
      const data = it({});
      data.$element = this;
      data.$attributes = this.__blackberry_attrs;
      data.$props = this.__blackberry_props;
      const cleanup = (...fns) => void this.__blackberry_cleanupFns.push(...fns);
      setup(
        this,
        data,
        this.__blackberry_attrs,
        this.__blackberry_props,
        cleanup,
        it,
        qt
      );
      this.renderFn = compileIntermediary(Array.from(markup.children), data);
      this.rootEffectScope.run(() => {
        qt(() => {
          render(this.shadowRoot, renderIntermediaryTemplate(this.renderFn), { host: this });
        });
      });
    }
    disconnectedCallback() {
      this.__blackberry_cleanupFns.forEach((fn2) => fn2());
      this.renderEffect.effect.stop();
    }
    __blackberry_attrs = it({});
    __blackberry_props = it({});
    __blackberry_cleanupFns = [];
  });
}
function initBlackberry() {
  requestIdleCallback(() => {
    document.querySelectorAll("template").forEach((element) => constructComponentFromElement(element));
    document.body.removeAttribute("blackberry-cloak");
  });
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "TEMPLATE") {
          constructComponentFromElement(node);
        }
      });
    });
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

// src/element.js
Symbol.metadata ??= Symbol("metadata");
var observedAttributes = /* @__PURE__ */ new Map();
var globalSheets = null;
function getGlobalStyleSheets() {
  if (globalSheets === null) {
    globalSheets = Array.from(document.styleSheets).map((x) => {
      const sheet = new CSSStyleSheet();
      const css2 = Array.from(x.cssRules).map((rule) => rule.cssText).join(" ");
      sheet.replaceSync(css2);
      return sheet;
    });
  }
  return globalSheets;
}
function addGlobalStylesToShadowRoot(shadowRoot) {
  shadowRoot.adoptedStyleSheets.push(
    ...getGlobalStyleSheets()
  );
}
var BlackberryElement = class extends HTMLElement {
  static styles = "";
  static useGlobalStyles = false;
  static define(name) {
    if (!customElements.get(name)) {
      customElements.define(name, this);
    }
  }
  static get observedAttributes() {
    return Array.from(observedAttributes.get(this[Symbol.metadata]) ?? []);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.attrs[name] = newValue;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(this.constructor.styles);
    this.shadowRoot.adoptedStyleSheets = [sheet];
    if (this.constructor.useGlobalStyles) {
      addGlobalStylesToShadowRoot(this.shadowRoot);
    }
    this.rootEffectScope = Yt();
  }
  connectedCallback() {
    const self = this;
    this.rootEffectScope.run(() => {
      this.onMount?.();
      qt(() => {
        render(this.shadowRoot, this.render.call(self), { host: this });
      });
      this.onMounted?.();
    });
  }
  disconnectedCallback() {
    this.rootEffectScope.run(() => {
      this.onUnmount?.();
    });
    this.rootEffectScope.stop();
  }
  render() {
    throw new Error("You must implement the render method in your custom element.");
  }
  attrs = it({});
  // stored @state values
  _decoratedStates = it({});
};
var Component = BlackberryElement;
var css = String.raw;
var h2 = h;
var text2 = text;
var Fragment2 = Fragment;
var elementFactory2 = elementFactory;
function state() {
  return function(_2, { kind, name }) {
    if (kind === "accessor") {
      return {
        get() {
          return this._decoratedStates[name];
        },
        set(val) {
          this._decoratedStates[name] = val;
        },
        init(initialValue) {
          this._decoratedStates[name] = initialValue;
        }
      };
    } else {
      throw new Error("Invalid decorator usage: @state only works on class accessors.");
    }
  };
}
function attribute(overriddenName) {
  return function(value, { kind, name, metadata }) {
    const attrName = overriddenName ?? name;
    if (!observedAttributes.has(metadata)) observedAttributes.set(metadata, /* @__PURE__ */ new Set());
    observedAttributes.get(metadata).add(attrName);
    if (kind === "accessor") {
      return {
        get() {
          return this.attrs[attrName];
        },
        set(val) {
          this.attrs[attrName] = val;
          this.setAttribute(attrName, String(val));
        },
        init(initialValue) {
          this.attrs[attrName] = initialValue;
        }
      };
    } else if (kind === "getter") {
      return function() {
        return this.attrs[attrName] ?? value();
      };
    } else {
      throw new Error("Invalid decorator usage: @attr only works on class accessors and getters.");
    }
  };
}
function component(name) {
  return function(target) {
    target.define(name);
  };
}

// src/jsx.js
var root = document.createElement("jsx-root");
document.body.prepend(root);
var count = Pt(0);
var counterProvider = () => {
  return h(counter, { count });
};
var counter = ({ count: count2 }) => {
  return h("button", { onclick: () => count2.value++ }, `the count is ${count2.value}`);
};
var Test = class extends Component {
  render() {
    if (count.value > 5) {
      return h("div", {}, [
        h(
          "p",
          {},
          "The count is greater than 5",
          h("div", {}, [
            h(counterProvider, {}, [])
          ])
        )
      ]);
    }
    return h("div", {}, [
      h(counterProvider, {}, [])
    ]);
  }
};
Test.define("jsx-test");
root.appendChild(document.createElement("jsx-test"));
export {
  $ as ARRAY_ITERATE_KEY,
  BlackberryElement,
  Component,
  $t as EffectFlags,
  ve as EffectScope,
  Fragment2 as Fragment,
  C as ITERATE_KEY,
  Se as MAP_KEY_ITERATE_KEY,
  F as ReactiveEffect,
  hn as ReactiveFlags,
  un as TrackOpTypes,
  pn as TriggerOpTypes,
  dn as WatchErrorCodes,
  attribute,
  component,
  fn as computed,
  css,
  an as customRef,
  qt as effect,
  Yt as effectScope,
  elementFactory2 as elementFactory,
  Jt as enableTracking,
  _t as getCurrentScope,
  gn as getCurrentWatcher,
  h2 as h,
  It as isProxy,
  Y as isReactive,
  L as isReadonly,
  v as isRef,
  b as isShallow,
  tn as markRaw,
  Zt as onEffectCleanup,
  Bt as onScopeDispose,
  Ft as onWatcherCleanup,
  qe as pauseTracking,
  on as proxyRefs,
  it as reactive,
  V as reactiveReadArray,
  st as readonly,
  Pt as ref,
  Xe as resetTracking,
  Qt as shallowReactive,
  ke as shallowReadArray,
  en as shallowReadonly,
  nn as shallowRef,
  initBlackberry as start,
  state,
  Xt as stop,
  text2 as text,
  p as toRaw,
  m as toReactive,
  we as toReadonly,
  ln as toRef,
  cn as toRefs,
  rn as toValue,
  E as track,
  A as traverse,
  R as trigger,
  sn as triggerRef,
  ot as unref,
  _n as watch
};
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
  (*! #__NO_SIDE_EFFECTS__ *)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.5.13
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
