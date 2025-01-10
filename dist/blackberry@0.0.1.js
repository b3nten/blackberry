function Q(e){let t=Object.create(null);for(let n of e.split(","))t[n]=1;return n=>n in t}var ee=Object.assign;var Ge=Object.prototype.hasOwnProperty,K=(e,t)=>Ge.call(e,t),T=Array.isArray,L=e=>Se(e)==="[object Map]";var be=e=>typeof e=="function",Ye=e=>typeof e=="string",x=e=>typeof e=="symbol",k=e=>e!==null&&typeof e=="object";var Be=Object.prototype.toString,Se=e=>Be.call(e),Te=e=>Se(e).slice(8,-1);var $=e=>Ye(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e;var W=e=>{let t=Object.create(null);return n=>t[n]||(t[n]=e(n))},qe=/-(\w)/g,At=W(e=>e.replace(qe,(t,n)=>n?n.toUpperCase():
"")),Xe=/\B([A-Z])/g,xt=W(e=>e.replace(Xe,"-$1").toLowerCase()),Je=W(e=>e.charAt(0).toUpperCase()+e.slice(1)),Ot=W(e=>e?
`on${Je(e)}`:""),w=(e,t)=>!Object.is(e,t);var Ze="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";var Nt=Q(Ze+",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,s\
eamless,checked,muted,multiple,selected");var _,se=class{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.
parent=_,!t&&_&&(this.index=(_.scopes||(_.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){
this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.
length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)
for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){
if(this._active){let n=_;try{return _=this,t()}finally{_=n}}}on(){_=this}off(){_=this.parent}stop(t){if(this._active){this.
_active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.
length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].
stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let r=this.parent.scopes.pop();r&&r!==this&&(this.parent.
scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}};function xe(e){return new se(e)}var p;var te=new WeakSet,Y=class{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,
this.cleanup=void 0,this.scheduler=void 0,_&&_.active&&_.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&
(this.flags&=-65,te.has(this)&&(te.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||
Ne(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,we(this),Re(this);let t=p,n=y;p=this,y=!0;try{return this.
fn()}finally{De(this),p=t,y=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)_e(t);this.deps=
this.depsTail=void 0,we(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?te.add(this):this.scheduler?
this.scheduler():this.runIfDirty()}runIfDirty(){ie(this)&&this.run()}get dirty(){return ie(this)}},Oe=0,I,P;function Ne(e,t=!1){
if(e.flags|=8,t){e.next=P,P=e;return}e.next=I,I=e}function ge(){Oe++}function me(){if(--Oe>0)return;if(P){let t=P;for(P=
void 0;t;){let n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;I;){let t=I;for(I=void 0;t;){let n=t.next;if(t.next=void 0,
t.flags&=-9,t.flags&1)try{t.trigger()}catch(s){e||(e=s)}t=n}}if(e)throw e}function Re(e){for(let t=e.deps;t;t=t.nextDep)
t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function De(e){let t,n=e.depsTail,s=n;for(;s;){let r=s.
prevDep;s.version===-1?(s===n&&(n=r),_e(s),Qe(s)):t=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}e.deps=
t,e.depsTail=n}function ie(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Ce(t.dep.computed)||
t.dep.version!==t.version))return!0;return!!e._dirty}function Ce(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===
F))return;e.globalVersion=F;let t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&e.deps&&!ie(e)){e.flags&=-3;return}let n=p,
s=y;p=e,y=!0;try{Re(e);let r=e.fn(e._value);(t.version===0||w(r,e._value))&&(e._value=r,t.version++)}catch(r){throw t.version++,
r}finally{p=n,y=s,De(e),e.flags&=-3}}function _e(e,t=!1){let{dep:n,prevSub:s,nextSub:r}=e;if(s&&(s.nextSub=r,e.prevSub=void 0),
r&&(r.prevSub=s,e.nextSub=void 0),n.subs===e&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=
i.nextDep)_e(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Qe(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=
void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function U(e,t){e.effect instanceof Y&&(e=e.effect.fn);let n=new Y(e);t&&ee(n,
t);try{n.run()}catch(r){throw n.stop(),r}let s=n.run.bind(n);return s.effect=n,s}var y=!0,Le=[];function et(){Le.push(y),y=!1}function tt(){let e=Le.pop();y=e===void 0?!0:e}function we(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let n=p;p=void 0;try{t()}finally{p=n}}}var F=0,oe=class{constructor(t,n){
this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},
H=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,
this.sc=0}track(t){if(!p||!y||p===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==p)n=this.activeLink=
new oe(p,this),p.deps?(n.prevDep=p.depsTail,p.depsTail.nextDep=n,p.depsTail=n):p.deps=p.depsTail=n,ke(n);else if(n.version===
-1&&(n.version=this.version,n.nextDep)){let s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=p.
depsTail,n.nextDep=void 0,p.depsTail.nextDep=n,p.depsTail=n,p.deps===n&&(p.deps=s)}return n}trigger(t){this.version++,F++,
this.notify(t)}notify(t){ge();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{me()}}};function ke(e){
if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let s=t.deps;s;s=s.nextDep)ke(s)}let n=e.
dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var ae=new WeakMap,A=Symbol(""),ce=Symbol(""),j=Symbol("");
function g(e,t,n){if(y&&p){let s=ae.get(e);s||ae.set(e,s=new Map);let r=s.get(n);r||(s.set(n,r=new H),r.map=s,r.key=n),r.
track()}}function b(e,t,n,s,r,i){let o=ae.get(e);if(!o){F++;return}let c=a=>{a&&a.trigger()};if(ge(),t==="clear")o.forEach(
c);else{let a=T(e),l=a&&$(n);if(a&&n==="length"){let u=Number(s);o.forEach((h,m)=>{(m==="length"||m===j||!x(m)&&m>=u)&&c(
h)})}else switch((n!==void 0||o.has(void 0))&&c(o.get(n)),l&&c(o.get(j)),t){case"add":a?l&&c(o.get("length")):(c(o.get(A)),
L(e)&&c(o.get(ce)));break;case"delete":a||(c(o.get(A)),L(e)&&c(o.get(ce)));break;case"set":L(e)&&c(o.get(A));break}}me()}function O(e){let t=f(e);return t===e?t:(g(t,"iterate",j),S(e)?t:t.map(d))}function ye(e){return g(e=f(e),"iterate",j),e}
var nt={__proto__:null,[Symbol.iterator](){return ne(this,Symbol.iterator,d)},concat(...e){return O(this).concat(...e.map(
t=>T(t)?O(t):t))},entries(){return ne(this,"entries",e=>(e[1]=d(e[1]),e))},every(e,t){return v(this,"every",e,t,void 0,arguments)},
filter(e,t){return v(this,"filter",e,t,n=>n.map(d),arguments)},find(e,t){return v(this,"find",e,t,d,arguments)},findIndex(e,t){
return v(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return v(this,"findLast",e,t,d,arguments)},findLastIndex(e,t){
return v(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return v(this,"forEach",e,t,void 0,arguments)},includes(...e){
return re(this,"includes",e)},indexOf(...e){return re(this,"indexOf",e)},join(e){return O(this).join(e)},lastIndexOf(...e){
return re(this,"lastIndexOf",e)},map(e,t){return v(this,"map",e,t,void 0,arguments)},pop(){return M(this,"pop")},push(...e){
return M(this,"push",e)},reduce(e,...t){return Ae(this,"reduce",e,t)},reduceRight(e,...t){return Ae(this,"reduceRight",e,
t)},shift(){return M(this,"shift")},some(e,t){return v(this,"some",e,t,void 0,arguments)},splice(...e){return M(this,"sp\
lice",e)},toReversed(){return O(this).toReversed()},toSorted(e){return O(this).toSorted(e)},toSpliced(...e){return O(this).
toSpliced(...e)},unshift(...e){return M(this,"unshift",e)},values(){return ne(this,"values",d)}};function ne(e,t,n){let s=ye(
e),r=s[t]();return s!==e&&!S(e)&&(r._next=r.next,r.next=()=>{let i=r._next();return i.value&&(i.value=n(i.value)),i}),r}
var rt=Array.prototype;function v(e,t,n,s,r,i){let o=ye(e),c=o!==e&&!S(e),a=o[t];if(a!==rt[t]){let h=a.apply(e,i);return c?
d(h):h}let l=n;o!==e&&(c?l=function(h,m){return n.call(this,d(h),m,e)}:n.length>2&&(l=function(h,m){return n.call(this,h,
m,e)}));let u=a.call(o,l,s);return c&&r?r(u):u}function Ae(e,t,n,s){let r=ye(e),i=n;return r!==e&&(S(e)?n.length>3&&(i=function(o,c,a){
return n.call(this,o,c,a,e)}):i=function(o,c,a){return n.call(this,o,d(c),a,e)}),r[t](i,...s)}function re(e,t,n){let s=f(
e);g(s,"iterate",j);let r=s[t](...n);return(r===-1||r===!1)&&mt(n[0])?(n[0]=f(n[0]),s[t](...n)):r}function M(e,t,n=[]){et(),
ge();let s=f(e)[t].apply(e,n);return me(),tt(),s}var st=Q("__proto__,__v_isRef,__isVue"),Me=new Set(Object.getOwnPropertyNames(
Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(x));function it(e){x(e)||(e=String(e));let t=f(
this);return g(t,"has",e),t.hasOwnProperty(e)}var B=class{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,s){
if(n==="__v_skip")return t.__v_skip;let r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__\
v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?ht:Fe:i?pt:Pe).get(t)||Object.getPrototypeOf(
t)===Object.getPrototypeOf(s)?t:void 0;let o=T(t);if(!r){let a;if(o&&(a=nt[n]))return a;if(n==="hasOwnProperty")return it}
let c=Reflect.get(t,n,N(t)?t:s);return(x(n)?Me.has(n):st(n))||(r||g(t,"get",n),i)?c:N(c)?o&&$(n)?c:c.value:k(c)?r?He(c):
E(c):c}},le=class extends B{constructor(t=!1){super(!1,t)}set(t,n,s,r){let i=t[n];if(!this._isShallow){let a=R(i);if(!S(
s)&&!R(s)&&(i=f(i),s=f(s)),!T(t)&&N(i)&&!N(s))return a?!1:(i.value=s,!0)}let o=T(t)&&$(n)?Number(n)<t.length:K(t,n),c=Reflect.
set(t,n,s,N(t)?t:r);return t===f(r)&&(o?w(s,i)&&b(t,"set",n,s,i):b(t,"add",n,s)),c}deleteProperty(t,n){let s=K(t,n),r=t[n],
i=Reflect.deleteProperty(t,n);return i&&s&&b(t,"delete",n,void 0,r),i}has(t,n){let s=Reflect.has(t,n);return(!x(n)||!Me.
has(n))&&g(t,"has",n),s}ownKeys(t){return g(t,"iterate",T(t)?"length":A),Reflect.ownKeys(t)}},fe=class extends B{constructor(t=!1){
super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}},ot=new le,at=new fe;var ue=e=>e,z=e=>Reflect.getPrototypeOf(e);function ct(e,t,n){return function(...s){let r=this.__v_raw,i=f(r),o=L(i),c=e===
"entries"||e===Symbol.iterator&&o,a=e==="keys"&&o,l=r[e](...s),u=n?ue:t?pe:d;return!t&&g(i,"iterate",a?ce:A),{next(){let{
value:h,done:m}=l.next();return m?{value:h,done:m}:{value:c?[u(h[0]),u(h[1])]:u(h),done:m}},[Symbol.iterator](){return this}}}}
function G(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function lt(e,t){let n={get(r){let i=this.
__v_raw,o=f(i),c=f(r);e||(w(r,c)&&g(o,"get",r),g(o,"get",c));let{has:a}=z(o),l=t?ue:e?pe:d;if(a.call(o,r))return l(i.get(
r));if(a.call(o,c))return l(i.get(c));i!==o&&i.get(r)},get size(){let r=this.__v_raw;return!e&&g(f(r),"iterate",A),Reflect.
get(r,"size",r)},has(r){let i=this.__v_raw,o=f(i),c=f(r);return e||(w(r,c)&&g(o,"has",r),g(o,"has",c)),r===c?i.has(r):i.
has(r)||i.has(c)},forEach(r,i){let o=this,c=o.__v_raw,a=f(c),l=t?ue:e?pe:d;return!e&&g(a,"iterate",A),c.forEach((u,h)=>r.
call(i,l(u),l(h),o))}};return ee(n,e?{add:G("add"),set:G("set"),delete:G("delete"),clear:G("clear")}:{add(r){!t&&!S(r)&&
!R(r)&&(r=f(r));let i=f(this);return z(i).has.call(i,r)||(i.add(r),b(i,"add",r,r)),this},set(r,i){!t&&!S(i)&&!R(i)&&(i=f(
i));let o=f(this),{has:c,get:a}=z(o),l=c.call(o,r);l||(r=f(r),l=c.call(o,r));let u=a.call(o,r);return o.set(r,i),l?w(i,u)&&
b(o,"set",r,i,u):b(o,"add",r,i),this},delete(r){let i=f(this),{has:o,get:c}=z(i),a=o.call(i,r);a||(r=f(r),a=o.call(i,r));
let l=c?c.call(i,r):void 0,u=i.delete(r);return a&&b(i,"delete",r,void 0,l),u},clear(){let r=f(this),i=r.size!==0,o=void 0,
c=r.clear();return i&&b(r,"clear",void 0,void 0,o),c}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=ct(
r,e,t)}),n}function Ie(e,t){let n=lt(e,t);return(s,r,i)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:
Reflect.get(K(n,r)&&r in s?n:s,r,i)}var ft={get:Ie(!1,!1)};var ut={get:Ie(!0,!1)};var Pe=new WeakMap,pt=new WeakMap,Fe=new WeakMap,ht=new WeakMap;function dt(e){switch(e){case"Object":case"Array":return 1;case"\
Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function gt(e){return e.__v_skip||!Object.isExtensible(
e)?0:dt(Te(e))}function E(e){return R(e)?e:je(e,!1,ot,ft,Pe)}function He(e){return je(e,!0,at,ut,Fe)}function je(e,t,n,s,r){if(!k(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;let i=r.get(e);if(i)return i;let o=gt(e);if(o===
0)return e;let c=new Proxy(e,o===2?s:n);return r.set(e,c),c}function R(e){return!!(e&&e.__v_isReadonly)}function S(e){return!!(e&&e.__v_isShallow)}function mt(e){return e?!!e.__v_raw:
!1}function f(e){let t=e&&e.__v_raw;return t?f(t):e}var d=e=>k(e)?E(e):e,pe=e=>k(e)?He(e):e;function N(e){return e?e.__v_isRef===!0:!1}function _t(e){return yt(e,!1)}function yt(e,t){return N(e)?e:new he(e,t)}var he=class{constructor(t,n){this.dep=new H,this.__v_isRef=!0,this.__v_isShallow=
!1,this._rawValue=n?t:f(t),this._value=n?t:d(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){
let n=this._rawValue,s=this.__v_isShallow||S(t)||R(t);t=s?t:f(t),w(t,n)&&(this._rawValue=t,this._value=s?t:d(t),this.dep.
trigger())}};var de=class{constructor(t,n,s){this.fn=t,this.setter=n,this._value=void 0,this.dep=new H(this),this.__v_isRef=!0,this.deps=
void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=F-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,
this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&p!==this)return Ne(this,!0),!0}get value(){let t=this.dep.track();
return Ce(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}};function vt(e,t,n=!1){
let s,r;return be(e)?s=e:(s=e.get,r=e.set),new de(s,r,n)}var D=(e,t,...n)=>({_type:e,_props:t,_children:n.filter(s=>s!==!1),key:t&&t.key}),X=e=>e.children,ve={},Ke=(e,t,n)=>{ve=
n;let s=Et(e,t,t._vnode||(t._vnode={}));return ve={},s},Et=(e,t,n=t._vnode||(t._vnode={}))=>q(D(X,{},[e]),t,n),q=(e,t,n,s)=>{
if(e.pop)return Ue(t,e,n);if(e._type.call){e._state=n._state||{};let r={children:e._children,...e._props},i=e._type(r,e.
_state,o=>(Object.assign(e._state,o),q(e,t,e)));return e._patched=q(i,t,n&&n._patched||{},s),t._vnode=e}else{let r=n.dom||
(e._type?document.createElement(e._type):new Text(e._props));if(e._props!=n._props)if(e._type){let{key:i,ref:o,...c}=e._props;
o&&(o.value=o.current=r);for(let a in c){let l=c[a];if(a==="style"&&!l.trim)for(let u in l)r.style[u]=l[u];else if(a.startsWith(
"on")){let u=ve.host??r;((r._vev??(r._vev={}))[a.slice(2).toLowerCase()]=c[a]?h=>c[a].call(u,h):void 0)?n?._props?.[i]||
r.addEventListener(a.slice(2).toLowerCase(),Ve):r.removeEventListener(a.slice(2).toLowerCase(),Ve)}else l!=(n._props&&n.
_props[a])&&(a.startsWith("prop:")?r[a.slice(5)]=l:a.startsWith("attr:")?r.setAttribute(a.slice(5),l):a in r||(a=a.toLowerCase())in
r?r[a]=l:l!=null?r.setAttribute(a,l):r.removeAttribute(a))}}else r.data=e._props;return e._props.dangerouslySetInnerHTML?
r.innerHTML=e._props.dangerouslySetInnerHTML.__html:Ue(r,e._children,n),(!n.dom||s!=null)&&t.insertBefore(e.dom=r,t.childNodes[s+
1]||null),t._vnode=Object.assign(n,e)}},Ue=(e,t,n)=>{let s=n._normalizedChildren||[];return n._normalizedChildren=t.concat.
apply([],t).map((r,i)=>{let o=r._children?r:D("",""+r),c=s.find((a,l)=>a&&a._type==o._type&&a.key==o.key&&(l==i&&(i=void 0),
s[l]=0,a))||{};return q(o,e,c,i)}),s.map($e),n},Ve=function(e){this._vev[e.type](e)};function $e(e){let{_children:t=[],_patched:n}=e;
t.concat(n).map(s=>s&&$e(s)),e.dom&&e.dom.remove()}Symbol.metadata??=Symbol("metadata");var J=new Map,Ee=null,bt=()=>(Ee===null&&(Ee=Array.from(document.styleSheets).map(e=>{
let t=new CSSStyleSheet,n=Array.from(e.cssRules).map(s=>s.cssText).join(" ");return t.replaceSync(n),t})),Ee),St=e=>{e.adoptedStyleSheets.
push(...bt())},V=class extends HTMLElement{static styles="";static useGlobalStyles=!1;static define(t){customElements.get(
t)||customElements.define(t,this)}static get observedAttributes(){return Array.from(J.get(this[Symbol.metadata])??[])}attributeChangedCallback(t,n,s){
n!==s&&(this.attrs[t]=s)}constructor(){super(),this.attachShadow({mode:"open"});let t=new CSSStyleSheet;t.replaceSync(this.
constructor.styles),this.shadowRoot.adoptedStyleSheets=[t],this.constructor.useGlobalStyles&&St(this.shadowRoot),this.rootEffectScope=
xe()}connectedCallback(){let t=this;this.rootEffectScope.run(()=>{this.onMount?.(),U(()=>{Ke(this.render.call(t),this.shadowRoot,
{host:this})}),this.onMounted?.()})}disconnectedCallback(){this.rootEffectScope.run(()=>{this.onUnmount?.()}),this.rootEffectScope.
stop()}render(){throw new Error("You must implement the render method in your custom element.")}attrs=E({});_decoratedStates=E(
{})},Kt=V,$t=String.raw;function Wt(){return function(e,{kind:t,name:n}){if(t==="accessor")return{get(){return this._decoratedStates[n]},
set(s){this._decoratedStates[n]=s},init(s){this._decoratedStates[n]=s}};throw new Error("Invalid decorator usage: @state\
 only works on class accessors.")}}function zt(e){return function(t,{kind:n,name:s,metadata:r}){let i=e??s;if(J.has(r)||
J.set(r,new Set),J.get(r).add(i),n==="accessor")return{get(){return this.attrs[i]},set(o){this.attrs[i]=o,this.setAttribute(
i,String(o))},init(o){this.attrs[i]=o}};if(n==="getter")return function(){return this.attrs[i]??t()};throw new Error("In\
valid decorator usage: @attr only works on class accessors and getters.")}}function Gt(e){return function(t){t.define(e)}}var C=class e{static Cache=new Map;constructor(t){e.Cache.has(t)&&(this.call=e.Cache.get(t));let n=()=>{try{let s=new Function(
["scope"],`with (scope) { return ${t}; }`);return Object.defineProperty(s,"name",{value:`[expression]: ${t}`}),s}catch(s){
return console.log(`Error while compiling expression: ${t}`,s),()=>""}};e.Cache.set(t,n()),this.call=e.Cache.get(t)}};function Tt(e,t){
let n=e.split("."),s=t;for(let r of n)s=s[r];return s}var Z=(e,t)=>{if(Array.isArray(e))return D(X,{},e.flatMap(o=>Z(o,t)));
if(e.nodeType!=1)return e.nodeValue;let n=e.tagName.toLowerCase(),s={},r=[],i;for(let o of e.attributes){let c=o.nodeName,
a=o.nodeValue;if(o.nodeName[0]===":"){let l=new C(o.nodeValue);o.nodeName===":text"?r.push(l.call(t)):o.nodeName===":htm\
l"?s.dangerouslySetInnerHTML={__html:l.call(t)}:o.nodeName===":if"?i=l:s["attr:"+o.nodeName.slice(1)]=l.call(t)}else if(c[0]===
"@")s[`on${c[1].toUpperCase()}${c.slice(2)}`]=l=>Tt(a,t)(l);else if(c[0]==="."){let u=new C(u).call(t);s["prop:"+c.slice(
1)]=u}else s[c]=a}for(let o of Array.from((n=="template"?e.content:e).childNodes))r.push(o.tagName?.toLowerCase()==="tem\
plate"?wt(o,t):Z(o,t));return i&&!i.call(t)?[]:D(n,s,r)},wt=(e,t)=>{let n,s,r;for(let c of e.attributes)c.nodeName.startsWith(
"each")&&(n=c.nodeName.split(":")[1].trim(),s=new C(c.nodeValue)),c.nodeName===":if"&&(r=new C(c.nodeValue));let i=[],o=Array.
from(e.content.children);if(n){let c=s.call(t);for(let a=0;a<c.length;a++){let l={...t,[n]:c[a]};i.push(Z(o,l))}}return r&&
!r.call(t)?[]:i};function We(e){if(e.tagName!=="TEMPLATE"||typeof e.getAttribute("blackberry")!="string")return;let t=e.
getAttribute("blackberry");if(customElements.get(t))return;let n="",s="",r=[];for(let a of e.content.children)a.tagName===
"SCRIPT"?(n+=a.innerHTML,r.push(a)):a.tagName==="STYLE"&&(s+=a.innerText,r.push(a));r.forEach(a=>a.remove());let i=e.content,
o=e.getAttribute("attributes")?.split(",").map(a=>a.trim())??[];e.remove();let c=new Function("$element","$state","$attr\
ibutes","$cleanup","$reactive","$effect",n);customElements.define(t,class extends V{static get observedAttributes(){return o}static styles=s;onMount(){
let a=E({});a.$element=this,a.$attributes=this.attrs;let l=(...u)=>void this.cleanup_fns.push(...u);c(this,a,this.attrs,
l,E,U),this.__internal_data=a}render(){return Z(Array.from(i.children),this.__internal_data)}onUnmount(){this.cleanup_fns.
forEach(a=>a())}cleanup_fns=[]})}function ze(){requestIdleCallback(()=>{document.querySelectorAll("template").forEach(t=>We(
t)),document.body.removeAttribute("blackberry-cloak")}),new MutationObserver(t=>{t.forEach(n=>{n.addedNodes.forEach(s=>{
s.tagName==="TEMPLATE"&&We(s)})})}).observe(document.body,{childList:!0,subtree:!0})}export{V as BlackberryElement,Kt as Component,X as Fragment,zt as attribute,Gt as component,vt as computed,$t as css,U as effect,
D as h,E as reactive,_t as ref,ze as start,Wt as state};
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
