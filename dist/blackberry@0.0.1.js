function Ct(t){let e=Object.create(null);for(let r of t.split(","))e[r]=1;return r=>r in e}var Be=Object.freeze({}),Ye=Object.
freeze([]),tt=Object.assign,te=Object.prototype.hasOwnProperty,ut=(t,e)=>te.call(t,e),j=Array.isArray,B=t=>Pt(t)==="[obj\
ect Map]",ee=t=>typeof t=="string",J=t=>typeof t=="symbol",rt=t=>t!==null&&typeof t=="object",re=Object.prototype.toString,
Pt=t=>re.call(t),jt=t=>Pt(t).slice(8,-1),bt=t=>ee(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,st=t=>{let e=Object.create(
null);return r=>e[r]||(e[r]=t(r))},se=/-(\w)/g,ze=st(t=>t.replace(se,(e,r)=>r?r.toUpperCase():"")),ie=/\B([A-Z])/g,Fe=st(
t=>t.replace(ie,"-$1").toLowerCase()),$t=st(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ne=st(t=>t?`on${$t(t)}`:""),Y=(t,e)=>!Object.
is(t,e),ne="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ue=Ct(ne+",async,autofocus,auto\
play,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,sel\
ected");function O(t,...e){console.warn(`[Vue warn] ${t}`,...e)}var S,ae=class{constructor(t=!1){this.detached=t,this._active=
!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=S,!t&&S&&(this.index=(S.scopes||(S.scopes=[])).push(this)-
1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.
length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&
this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=
0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){let e=S;try{return S=this,t()}finally{
S=e}}else O("cannot run an inactive effect scope.")}on(){S=this}off(){S=this.parent}stop(t){if(this._active){this._active=
!1;let e,r;for(e=0,r=this.effects.length;e<r;e++)this.effects[e].stop();for(this.effects.length=0,e=0,r=this.cleanups.length;e<
r;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,r=this.scopes.length;e<r;e++)this.scopes[e].stop(
!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){let i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.
index]=i,i.index=this.index)}this.parent=void 0}}};function oe(t){return new ae(t)}var h,at=new WeakSet,Tt=class{constructor(t){
this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,
S&&S.active&&S.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,at.has(this)&&(at.delete(
this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||ce(this)}run(){if(!(this.flags&1))return this.
fn();this.flags|=2,wt(this),Bt(this);let t=h,e=y;h=this,y=!0;try{return this.fn()}finally{h!==this&&O("Active effect was\
 not restored correctly - this is likely a Vue internal bug."),Yt(this),h=t,y=e,this.flags&=-3}}stop(){if(this.flags&1){
for(let t=this.deps;t;t=t.nextDep)yt(t);this.deps=this.depsTail=void 0,wt(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){
this.flags&64?at.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ft(this)&&this.run()}get dirty(){
return ft(this)}},Wt=0,z,F;function ce(t,e=!1){if(t.flags|=8,e){t.next=F,F=t;return}t.next=z,z=t}function mt(){Wt++}function St(){
if(--Wt>0)return;if(F){let e=F;for(F=void 0;e;){let r=e.next;e.next=void 0,e.flags&=-9,e=r}}let t;for(;z;){let e=z;for(z=
void 0;e;){let r=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=r}}if(t)throw t}function Bt(t){
for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Yt(t){let e,r=t.
depsTail,i=r;for(;i;){let s=i.prevDep;i.version===-1?(i===r&&(r=s),yt(i),ue(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.
prevActiveLink=void 0,i=s}t.deps=e,t.depsTail=r}function ft(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||
e.dep.computed&&(le(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function le(t){if(t.flags&4&&!(t.
flags&16)||(t.flags&=-17,t.globalVersion===et))return;t.globalVersion=et;let e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&
t.deps&&!ft(t)){t.flags&=-3;return}let r=h,i=y;h=t,y=!0;try{Bt(t);let s=t.fn(t._value);(e.version===0||Y(s,t._value))&&(t.
_value=s,e.version++)}catch(s){throw e.version++,s}finally{h=r,y=i,Yt(t),t.flags&=-3}}function yt(t,e=!1){let{dep:r,prevSub:i,
nextSub:s}=t;if(i&&(i.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=i,t.nextSub=void 0),r.subsHead===t&&(r.subsHead=s),r.subs===
t&&(r.subs=i,!i&&r.computed)){r.computed.flags&=-5;for(let a=r.computed.deps;a;a=a.nextDep)yt(a,!0)}!e&&!--r.sc&&r.map&&
r.map.delete(r.key)}function ue(t){let{prevDep:e,nextDep:r}=t;e&&(e.nextDep=r,t.prevDep=void 0),r&&(r.prevDep=e,t.nextDep=
void 0)}function xt(t,e){t.effect instanceof Tt&&(t=t.effect.fn);let r=new Tt(t);e&&tt(r,e);try{r.run()}catch(s){throw r.
stop(),s}let i=r.run.bind(r);return i.effect=r,i}var y=!0,zt=[];function fe(){zt.push(y),y=!1}function he(){let t=zt.pop();
y=t===void 0?!0:t}function wt(t){let{cleanup:e}=t;if(t.cleanup=void 0,e){let r=h;h=void 0;try{e()}finally{h=r}}}var et=0,
pe=class{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=
this.prevActiveLink=void 0}},ve=class{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,
this.map=void 0,this.key=void 0,this.sc=0,this.subsHead=void 0}track(t){if(!h||!y||h===this.computed)return;let e=this.activeLink;
if(e===void 0||e.sub!==h)e=this.activeLink=new pe(h,this),h.deps?(e.prevDep=h.depsTail,h.depsTail.nextDep=e,h.depsTail=e):
h.deps=h.depsTail=e,Ft(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){let r=e.nextDep;r.prevDep=e.prevDep,
e.prevDep&&(e.prevDep.nextDep=r),e.prevDep=h.depsTail,e.nextDep=void 0,h.depsTail.nextDep=e,h.depsTail=e,h.deps===e&&(h.
deps=r)}return h.onTrack&&h.onTrack(tt({effect:h},t)),e}trigger(t){this.version++,et++,this.notify(t)}notify(t){mt();try{
for(let e=this.subsHead;e;e=e.nextSub)e.sub.onTrigger&&!(e.sub.flags&8)&&e.sub.onTrigger(tt({effect:e.sub},t));for(let e=this.
subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{St()}}};function Ft(t){if(t.dep.sc++,t.sub.flags&4){let e=t.
dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Ft(i)}let r=t.dep.subs;r!==t&&(t.prevSub=r,r&&
(r.nextSub=t)),t.dep.subsHead===void 0&&(t.dep.subsHead=t),t.dep.subs=t}}var ht=new WeakMap,D=Symbol("Object iterate"),pt=Symbol(
"Map keys iterate"),U=Symbol("Array iterate");function b(t,e,r){if(y&&h){let i=ht.get(t);i||ht.set(t,i=new Map);let s=i.
get(r);s||(i.set(r,s=new ve),s.map=i,s.key=r),s.track({target:t,type:e,key:r})}}function R(t,e,r,i,s,a){let n=ht.get(t);
if(!n){et++;return}let o=c=>{c&&c.trigger({target:t,type:e,key:r,newValue:i,oldValue:s,oldTarget:a})};if(mt(),e==="clear")
n.forEach(o);else{let c=j(t),l=c&&bt(r);if(c&&r==="length"){let v=Number(i);n.forEach((u,f)=>{(f==="length"||f===U||!J(f)&&
f>=v)&&o(u)})}else switch((r!==void 0||n.has(void 0))&&o(n.get(r)),l&&o(n.get(U)),e){case"add":c?l&&o(n.get("length")):(o(
n.get(D)),B(t)&&o(n.get(pt)));break;case"delete":c||(o(n.get(D)),B(t)&&o(n.get(pt)));break;case"set":B(t)&&o(n.get(D));break}}
St()}function C(t){let e=p(t);return e===t?e:(b(e,"iterate",U),I(t)?e:e.map(m))}function Et(t){return b(t=p(t),"iterate",
U),t}var _e={__proto__:null,[Symbol.iterator](){return ot(this,Symbol.iterator,m)},concat(...t){return C(this).concat(...t.
map(e=>j(e)?C(e):e))},entries(){return ot(this,"entries",t=>(t[1]=m(t[1]),t))},every(t,e){return E(this,"every",t,e,void 0,
arguments)},filter(t,e){return E(this,"filter",t,e,r=>r.map(m),arguments)},find(t,e){return E(this,"find",t,e,m,arguments)},
findIndex(t,e){return E(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return E(this,"findLast",t,e,m,arguments)},
findLastIndex(t,e){return E(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return E(this,"forEach",t,e,void 0,
arguments)},includes(...t){return ct(this,"includes",t)},indexOf(...t){return ct(this,"indexOf",t)},join(t){return C(this).
join(t)},lastIndexOf(...t){return ct(this,"lastIndexOf",t)},map(t,e){return E(this,"map",t,e,void 0,arguments)},pop(){return W(
this,"pop")},push(...t){return W(this,"push",t)},reduce(t,...e){return Dt(this,"reduce",t,e)},reduceRight(t,...e){return Dt(
this,"reduceRight",t,e)},shift(){return W(this,"shift")},some(t,e){return E(this,"some",t,e,void 0,arguments)},splice(...t){
return W(this,"splice",t)},toReversed(){return C(this).toReversed()},toSorted(t){return C(this).toSorted(t)},toSpliced(...t){
return C(this).toSpliced(...t)},unshift(...t){return W(this,"unshift",t)},values(){return ot(this,"values",m)}};function ot(t,e,r){
let i=Et(t),s=i[e]();return i!==t&&!I(t)&&(s._next=s.next,s.next=()=>{let a=s._next();return a.value&&(a.value=r(a.value)),
a}),s}var de=Array.prototype;function E(t,e,r,i,s,a){let n=Et(t),o=n!==t&&!I(t),c=n[e];if(c!==de[e]){let u=c.apply(t,a);
return o?m(u):u}let l=r;n!==t&&(o?l=function(u,f){return r.call(this,m(u),f,t)}:r.length>2&&(l=function(u,f){return r.call(
this,u,f,t)}));let v=c.call(n,l,i);return o&&s?s(v):v}function Dt(t,e,r,i){let s=Et(t),a=r;return s!==t&&(I(t)?r.length>
3&&(a=function(n,o,c){return r.call(this,n,o,c,t)}):a=function(n,o,c){return r.call(this,n,m(o),c,t)}),s[e](a,...i)}function ct(t,e,r){
let i=p(t);b(i,"iterate",U);let s=i[e](...r);return(s===-1||s===!1)&&Ie(r[0])?(r[0]=p(r[0]),i[e](...r)):s}function W(t,e,r=[]){
fe(),mt();let i=p(t)[e].apply(t,r);return St(),he(),i}var ge=Ct("__proto__,__v_isRef,__isVue"),Nt=new Set(Object.getOwnPropertyNames(
Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(J));function be(t){J(t)||(t=String(t));let e=p(
this);return b(e,"has",t),e.hasOwnProperty(t)}var Ut=class{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,r){
if(e==="__v_skip")return t.__v_skip;let i=this._isReadonly,s=this._isShallow;if(e==="__v_isReactive")return!i;if(e==="__\
v_isReadonly")return i;if(e==="__v_isShallow")return s;if(e==="__v_raw")return r===(i?s?we:Jt:s?Te:Gt).get(t)||Object.getPrototypeOf(
t)===Object.getPrototypeOf(r)?t:void 0;let a=j(t);if(!i){let o;if(a&&(o=_e[e]))return o;if(e==="hasOwnProperty")return be}
let n=Reflect.get(t,e,N(t)?t:r);return(J(e)?Nt.has(e):ge(e))||(i||b(t,"get",e),s)?n:N(n)?a&&bt(e)?n:n.value:rt(n)?i?Qt(n):
T(n):n}},me=class extends Ut{constructor(t=!1){super(!1,t)}set(t,e,r,i){let s=t[e];if(!this._isShallow){let o=q(s);if(!I(
r)&&!q(r)&&(s=p(s),r=p(r)),!j(t)&&N(s)&&!N(r))return o?!1:(s.value=r,!0)}let a=j(t)&&bt(e)?Number(e)<t.length:ut(t,e),n=Reflect.
set(t,e,r,N(t)?t:i);return t===p(i)&&(a?Y(r,s)&&R(t,"set",e,r,s):R(t,"add",e,r)),n}deleteProperty(t,e){let r=ut(t,e),i=t[e],
s=Reflect.deleteProperty(t,e);return s&&r&&R(t,"delete",e,void 0,i),s}has(t,e){let r=Reflect.has(t,e);return(!J(e)||!Nt.
has(e))&&b(t,"has",e),r}ownKeys(t){return b(t,"iterate",j(t)?"length":D),Reflect.ownKeys(t)}},Se=class extends Ut{constructor(t=!1){
super(!0,t)}set(t,e){return O(`Set operation on key "${String(e)}" failed: target is readonly.`,t),!0}deleteProperty(t,e){
return O(`Delete operation on key "${String(e)}" failed: target is readonly.`,t),!0}},ye=new me,xe=new Se,vt=t=>t,H=t=>Reflect.
getPrototypeOf(t);function Ee(t,e,r){return function(...i){let s=this.__v_raw,a=p(s),n=B(a),o=t==="entries"||t===Symbol.
iterator&&n,c=t==="keys"&&n,l=s[t](...i),v=r?vt:e?_t:m;return!e&&b(a,"iterate",c?pt:D),{next(){let{value:u,done:f}=l.next();
return f?{value:u,done:f}:{value:o?[v(u[0]),v(u[1])]:v(u),done:f}},[Symbol.iterator](){return this}}}}function k(t){return function(...e){
{let r=e[0]?`on key "${e[0]}" `:"";O(`${$t(t)} operation ${r}failed: target is readonly.`,p(this))}return t==="delete"?!1:
t==="clear"?void 0:this}}function Ae(t,e){let r={get(s){let a=this.__v_raw,n=p(a),o=p(s);t||(Y(s,o)&&b(n,"get",s),b(n,"g\
et",o));let{has:c}=H(n),l=e?vt:t?_t:m;if(c.call(n,s))return l(a.get(s));if(c.call(n,o))return l(a.get(o));a!==n&&a.get(s)},
get size(){let s=this.__v_raw;return!t&&b(p(s),"iterate",D),Reflect.get(s,"size",s)},has(s){let a=this.__v_raw,n=p(a),o=p(
s);return t||(Y(s,o)&&b(n,"has",s),b(n,"has",o)),s===o?a.has(s):a.has(s)||a.has(o)},forEach(s,a){let n=this,o=n.__v_raw,
c=p(o),l=e?vt:t?_t:m;return!t&&b(c,"iterate",D),o.forEach((v,u)=>s.call(a,l(v),l(u),n))}};return tt(r,t?{add:k("add"),set:k(
"set"),delete:k("delete"),clear:k("clear")}:{add(s){!e&&!I(s)&&!q(s)&&(s=p(s));let a=p(this);return H(a).has.call(a,s)||
(a.add(s),R(a,"add",s,s)),this},set(s,a){!e&&!I(a)&&!q(a)&&(a=p(a));let n=p(this),{has:o,get:c}=H(n),l=o.call(n,s);l?Ot(
n,o,s):(s=p(s),l=o.call(n,s));let v=c.call(n,s);return n.set(s,a),l?Y(a,v)&&R(n,"set",s,a,v):R(n,"add",s,a),this},delete(s){
let a=p(this),{has:n,get:o}=H(a),c=n.call(a,s);c?Ot(a,n,s):(s=p(s),c=n.call(a,s));let l=o?o.call(a,s):void 0,v=a.delete(
s);return c&&R(a,"delete",s,void 0,l),v},clear(){let s=p(this),a=s.size!==0,n=B(s)?new Map(s):new Set(s),o=s.clear();return a&&
R(s,"clear",void 0,void 0,n),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{r[s]=Ee(s,t,e)}),r}function qt(t,e){
let r=Ae(t,e);return(i,s,a)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?i:Reflect.get(ut(r,s)&&s in i?
r:i,s,a)}var Me={get:qt(!1,!1)},Re={get:qt(!0,!1)};function Ot(t,e,r){let i=p(r);if(i!==r&&e.call(t,i)){let s=jt(t);O(`R\
eactive ${s} contains both the raw and reactive versions of the same object${s==="Map"?" as keys":""}, which can lead to\
 inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive ver\
sion if possible.`)}}var Gt=new WeakMap,Te=new WeakMap,Jt=new WeakMap,we=new WeakMap;function De(t){switch(t){case"Objec\
t":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Oe(t){return t.
__v_skip||!Object.isExtensible(t)?0:De(jt(t))}function T(t){return q(t)?t:Xt(t,!1,ye,Me,Gt)}function Qt(t){return Xt(t,!0,
xe,Re,Jt)}function Xt(t,e,r,i,s){if(!rt(t))return O(`value cannot be made ${e?"readonly":"reactive"}: ${String(t)}`),t;if(t.
__v_raw&&!(e&&t.__v_isReactive))return t;let a=s.get(t);if(a)return a;let n=Oe(t);if(n===0)return t;let o=new Proxy(t,n===
2?i:r);return s.set(t,o),o}function q(t){return!!(t&&t.__v_isReadonly)}function I(t){return!!(t&&t.__v_isShallow)}function Ie(t){
return t?!!t.__v_raw:!1}function p(t){let e=t&&t.__v_raw;return e?p(e):t}var m=t=>rt(t)?T(t):t,_t=t=>rt(t)?Qt(t):t;function N(t){
return t?t.__v_isRef===!0:!1}var Zt=1,G=3,it={},At=[],Le="http://www.w3.org/2000/svg",It=function(t){this._vevents[t.type](
t)},M=t=>t==null?t:t.key,Ht=(t,e,r,i,s)=>{e==="key"||(e[0]==="o"&&e[1]==="n"?(e=e.toLowerCase().slice(2),t._vevents??={},
!i&&r&&t.removeEventListener(e,It),!r&&i&&t.addEventListener(e,It),r!==i&&(t._vevents[e]=i?a=>i.call(Pe.host??t,a):null)):
e==="ref"?typeof i=="function"?r||(t._vcleanup=i(t)):i.current=i.value=t:e.startsWith("attr:")?t.setAttribute(e.slice(5),
i):e.startsWith("prop:")?t[e.slice(5)]=i:!s&&e!=="list"&&e!=="form"&&e in t?t[e]=i??"":i==null||i===!1?t.removeAttribute(
e):t.setAttribute(e,i))},dt=(t,e)=>{var r=t.props,i=t.type===G?document.createTextNode(t.tag):(e=e||t.tag==="svg")?document.
createElementNS(Le,t.tag,{is:r.is}):document.createElement(t.tag,{is:r.is});for(var s in r)Ht(i,s,null,r[s],e);if(r.dangerouslySetInnerHTML)
return i.innerHTML=r.dangerouslySetInnerHTML.__html,t.node=i;for(var a=0;a<t.children.length;a++)i.appendChild(dt(t.children[a]=
P(t.children[a]),e));return t.node=i},w=(t,e,r,i,s)=>{if(r!==i)if(r!=null&&r.type===G&&i.type===G)r.tag!==i.tag&&(e.nodeValue=
i.tag);else if(r==null||r.tag!==i.tag)e=t.insertBefore(dt(i=P(i),s),e),r!=null&&t.removeChild(r.node);else{var a,n,o,c,l=r.
props,v=i.props,u=r.children,f=i.children,d=0,_=0,x=u.length-1,A=f.length-1;s=s||i.tag==="svg";for(var g in{...l,...v})(g===
"value"||g==="selected"||g==="checked"?e[g]:l[g])!==v[g]&&Ht(e,g,l[g],v[g],s);if(i.props?.dangerouslySetInnerHTML)return e.
innerHTML=i.props.dangerouslySetInnerHTML.__html,i.node=e;for(;_<=A&&d<=x&&!((o=M(u[d]))==null||o!==M(f[_]));)w(e,u[d].node,
u[d++],f[_]=P(f[_++]),s);for(;_<=A&&d<=x&&!((o=M(u[x]))==null||o!==M(f[A]));)w(e,u[x].node,u[x--],f[A]=P(f[A--]),s);if(d>
x)for(;_<=A;)e.insertBefore(dt(f[_]=P(f[_++]),s),(n=u[d])&&n.node);else if(_>A)for(;d<=x;)e.removeChild(u[d++].node);else{
for(var X={},Z={},g=d;g<=x;g++)(o=u[g].key)!=null&&(X[o]=u[g]);for(;_<=A;){if(o=M(n=u[d]),c=M(f[_]=P(f[_])),Z[o]||c!=null&&
c===M(u[d+1])){o==null&&e.removeChild(n.node),d++;continue}c==null||r.type===Zt?(o==null&&(w(e,n&&n.node,n,f[_],s),_++),
d++):(o===c?(w(e,n.node,n,f[_],s),Z[c]=!0,d++):(a=X[c])!=null?(w(e,e.insertBefore(a.node,n&&n.node),a,f[_],s),Z[c]=!0):w(
e,n&&n.node,null,f[_],s),_++)}for(;d<=x;)M(n=u[d++])==null&&e.removeChild(n.node);for(var g in X)Z[g]==null&&e.removeChild(
X[g].node)}}return i.node=e},P=t=>t!==!0&&t!==!1&&t?t:Rt(""),kt=t=>t.nodeType===G?Rt(t.nodeValue,t):Mt(t.nodeName.toLowerCase(),
it,At.map.call(t.childNodes,kt),Zt,t),Mt=(t,e,r,i,s)=>({tag:t,props:e,key:e.key,children:r,type:i,node:s}),Ce=(t,e,r=At)=>Mt(
t,e,Array.isArray(r)?r:[r]),Rt=(t,e)=>Mt(t,it,At,G,e),nt=(t,e)=>e.flat(),$=(t,e,...r)=>typeof t=="function"?t(e,r):Ce(t,
e||{},r.flatMap(i=>typeof i=="string"||typeof i=="number"?Rt(i):i)),Pe=it,gt=(t,e,r={})=>(gt.ctx=r,(e=w(e.parentNode,e,e.
vdom||kt(e),t)).vdom=t,gt.ctx=it,e);Symbol.metadata??=Symbol("metadata");var K=new Map,lt=null,je=()=>(lt===null&&(lt=Array.
from(document.styleSheets).map(t=>{let e=new CSSStyleSheet,r=Array.from(t.cssRules).map(i=>i.cssText).join(" ");return e.
replaceSync(r),e})),lt),V=!0,qe=t=>V=t,Lt=!1,Kt=class extends HTMLElement{static styles="";static use_global_styles=!1;static define_self(t){
customElements.get(t)||customElements.define(t,this)}static get observedAttributes(){return Array.from(K.get(this[Symbol.
metadata])??[])}observed_attributes=T({});get observedAttributes(){return this.observed_attributes}attributeChangedCallback(t,e,r){
e!==r&&(this.observedAttributes[t]=r)}get_attribute=this.getAttribute.bind(this);set_attribute=this.setAttribute.bind(this);remove_attribute=this.
removeAttribute.bind(this);on_mount(){}onMount(){}on_mounted(){}onMounted(){}on_unmount(){}onUnmount(){}constructor(){if(super(),
typeof document>"u")return;this.attachShadow({mode:"open"});let t=this.constructor.styles;typeof t!="string"&&!Array.isArray(
t)&&(this._log_error(new Error("Static styles property must be a string or string array."),"constructor"),this.raw_styles=
[""]),Array.isArray(t)||(t=[t]);let e=t.map(r=>{let i=new CSSStyleSheet;return i.replaceSync(r),i});if(this.shadowRoot.adoptedStyleSheets=
e,this.constructor.useGlobalStyles||this.constructor.use_global_styles)try{this.adoptedStyleSheets.push(...je())}catch(r){
this._log_error(r,"adding global stylesheets")}this.root_node=document.createElement("shadow-root"),this.shadowRoot.appendChild(
this.root_node),V&&!Lt&&(console.warn("Ivysaur is running in development mode. Call set_dev(false) to disable this warni\
ng."),Lt=!0)}render(){return V&&console.warn("No render method defined for",this.constructor.name),$(nt,{},[])}connectedCallback(){
this._rootEffectScope?.active&&this._rootEffectScope.stop(),this._rootEffectScope=oe(),this._rootEffectScope.run(()=>{try{
this.onMount?.(),this.on_mount?.()}catch(t){this._log_error(t,"on mount")}xt(()=>{let t;try{t=this.render.call(this)}catch(e){
this._log_error(e,"render")}try{gt($("shadow-root",{},t),this.root_node,{host:this})}catch(e){this._log_error(e,"dom upd\
ate")}});try{this.onMounted?.(),this.on_mounted?.()}catch(t){this._log_error(t,"on mounted")}})}disconnectedCallback(){this.
_rootEffectScope.run(()=>{try{this.onUnmount?.(),this.on_unmount?.()}catch(t){this._log_error(t,"on unmount")}}),this._rootEffectScope.
stop()}_log_error=(t,e)=>{if(console.error("Error in",e,"of",this.constructor.name,t),V)throw t};_rootEffectScope;_reactive_states=T(
{})},Ge=String.raw;function Je(){return function(t,{kind:e,name:r}){if(e==="accessor")return{get(){return this._reactive_states[r]},
set(i){this._reactive_states[r]=i},init(i){this._reactive_states??=T({}),this._reactive_states[r]=i}};throw new Error("I\
nvalid decorator usage: @state only works on class accessors.")}}var $e=t=>t;function Qe(t,e={}){return function(r,{kind:i,
name:s,metadata:a}){let n=t??s,o=e.converter??$e;if(K.has(a)||K.set(a,new Set),K.get(a).add(n),i==="accessor")return{get(){
return o(this.observed_attributes[n])},set(c){this.observed_attributes[n]=c,this.setAttribute(n,String(c))},init(c){this.
observed_attributes[n]=c}};if(i==="getter")return function(){let c=this.observed_attributes[n];return typeof c<"u"?o(c):
r()};throw new Error("Invalid decorator usage: @attribute only works on class accessors and getters.")}}var ir=window.requestIdleCallback||(t=>setTimeout(t,0)),L=class t{static Cache=new Map;constructor(e){t.Cache.has(e)&&(this.
call=t.Cache.get(e));let r=()=>{try{let i=new Function(["scope"],`with (scope) { return ${e}; }`);return Object.defineProperty(
i,"name",{value:`[expression]: ${e}`}),i}catch(i){return console.log(`Error while compiling expression: ${e}`,i),()=>""}};
t.Cache.set(e,r()),this.call=t.Cache.get(e)}},Q=(t,e)=>{if(Array.isArray(t))return $(nt,{},t.flatMap(n=>Q(n,e)));if(t.nodeType!=
1)return t.nodeValue;let r=t.tagName.toLowerCase(),i={},s=[],a;for(let n of t.attributes){let o=n.nodeName,c=n.nodeValue;
if(n.nodeName[0]===":"){let l=new L(n.nodeValue);n.nodeName===":text"?s.push(l.call(e)):n.nodeName===":html"?i.dangerouslySetInnerHTML=
{__html:l.call(e)}:n.nodeName===":if"?a=l:n.nodeName===":ref"?i.ref=l.call(e):i["attr:"+n.nodeName.slice(1)]=l.call(e)}else if(o[0]===
"@"){let l=new L(c);i[`on${o[1].toUpperCase()}${o.slice(2)}`]=v=>l.call(e)(v)}else if(o[0]==="."){let l=new L(c);i["prop\
:"+o.slice(1)]=l.call(e)}else i[o]=c}for(let n of Array.from((r=="template"?t.content:t).childNodes))s.push(n.tagName?.toLowerCase()===
"template"?We(n,e):Q(n,e));return a&&!a.call(e)?null:$(r,i,...s)},We=(t,e)=>{let r,i,s;for(let o of t.attributes)o.nodeName.
startsWith("each")&&(r=o.nodeName.split(":")[1].trim(),i=new L(o.nodeValue)),o.nodeName===":if"&&(s=new L(o.nodeValue));
let a=[],n=Array.from(t.content.children);if(r){let o=i.call(e);for(let c=0;c<o.length;c++){let l=new Proxy({},{get:(v,u)=>u===
r?o[c]:e[u],has:(v,u)=>u===r||u in e,set:(v,u,f)=>(e[u]=f,!0)});a.push(Q(n,l))}}else a.push(Q(n,e));return s&&!s.call(e)?
null:$(nt,{},...a)},Vt=t=>{if(t.tagName!=="TEMPLATE"||typeof t.getAttribute("blackberry")!="string")return;let e=t.getAttribute(
"blackberry");if(customElements.get(e))return;let r="",i="",s=[];for(let c of t.content.children)c.tagName==="SCRIPT"?(r+=
c.innerHTML,s.push(c)):c.tagName==="STYLE"&&(i+=c.innerText,s.push(c));s.forEach(c=>c.remove());let a=t.content,n=t.getAttribute(
"attributes")?.split(",").map(c=>c.trim())??[];t.remove();let o=new Function("$element","$state","$attributes","$cleanup",
"$reactive","$effect",r);customElements.define(e,class extends Kt{static get observedAttributes(){return n}static styles=i;onMount(){
let c=T({});c.$element=this,c.$attributes=this.observedAttributes;let l=(...v)=>void this.cleanup_fns.push(...v);o(this,
c,this.observedAttributes,l,T,xt),this.__internal_data=c}render(){return Q(Array.from(a.children),this.__internal_data).
flat()}onUnmount(){this.cleanup_fns.forEach(c=>c())}cleanup_fns=[]})},nr=()=>{let t=new MutationObserver(r=>{r.forEach(i=>{
i.addedNodes.forEach(s=>{s.tagName==="TEMPLATE"&&Vt(s)})})}),e=()=>{document.querySelectorAll("template[blackberry]").forEach(
Vt),document.body.removeAttribute("blackberry-cloak"),t.observe(document.body,{childList:!0,subtree:!0})};switch(document.
readyState){case"loading":case"interactive":addEventListener("DOMContentLoaded",e);break;case"complete":e()}};export{nt as Fragment,V as IS_DEV,Kt as Ivysaur,Qe as attribute,Ge as css,nr as default,xt as effect,oe as effectScope,$ as h,
Kt as ivysaur,T as reactive,gt as render,qe as setDev,qe as set_dev,Je as state};
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
