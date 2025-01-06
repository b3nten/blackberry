function T(t,e){if(t.tagName!=="TEMPLATE"||typeof t.getAttribute("blackberry")!="string")return;let s=t.getAttribute("blackberry");if(customElements.get(s))return;let r="",a="",o=[];for(let c of t.content.children)c.tagName==="SCRIPT"?(r+=c.innerHTML,o.push(c)):c.tagName==="STYLE"&&(a+=c.innerText,o.push(c));o.forEach(c=>c.remove());let n=t.content,l=t.getAttribute("attributes")?.split(",").map(c=>c.trim())??[];t.remove();let p=new CSSStyleSheet;p.replaceSync(a??"");let m=[p],v=new Function("$element","$state","$attributes","$props","$cleanup","$reactive","$effect",r),f="blackberry_"+s.replace("-","");e.data(f,()=>({init(){let c=this.$root.getRootNode().host,u=(...b)=>void c.__blackberry_cleanupFns.push(...b),i=b=>void c.__blackberry_effects.push(e.effect(b));try{v(c,this,c.__blackberry_attrs,c.__blackberry_props??=e.reactive({}),u,e.reactive,i)}catch(b){console.error("Error in setup function of",c,this,b)}}})),customElements.define(s,class extends HTMLElement{static get observedAttributes(){return l}attributeChangedCallback(c,u,i){u!==i&&(this.__blackberry_attrs[c]=i)}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=m;let c=document.createElement("blackberry-provider");c.setAttribute("x-data",f);for(let u of n.children)c.appendChild(u.cloneNode(!0));queueMicrotask(()=>{this.shadowRoot.appendChild(c),e.initTree(this.shadowRoot.children[0])})}disconnectedCallback(){this.__blackberry_cleanupFns.forEach(c=>c()),this.__blackberry_effects.forEach(c=>e.release(c)),e.destroyTree(this.shadowRoot.children[0])}__blackberry_attrs=e.reactive({});__blackberry_props=e.reactive({});__blackberry_cleanupFns=[];__blackberry_effects=[]})}function R(t){let e=(r,a)=>({name:o,value:n})=>(o.startsWith(r)&&(o=o.replace(r,a)),{name:o,value:n});t.mapAttributes(e(".","x-prop:")),t.directive("prop",(r,{value:a,expression:o},{effect:n,evaluateLater:l})=>{let p=l(o);n(()=>{p(m=>{r[a]=m,r.__blackberry_props&&(r.__blackberry_props[a]=m)})})}),document.querySelectorAll("template").forEach(r=>T(r,t)),document.body.removeAttribute("blackberry-cloak"),new MutationObserver(r=>{r.forEach(a=>{a.addedNodes.forEach(o=>{o.tagName==="TEMPLATE"&&T(o,t)})})}).observe(document.body,{childList:!0,subtree:!0})}var P=1,x=3,Y={},$=[],H="http://www.w3.org/2000/svg",G=function(t){this.events[t.type](t)},g=t=>t==null?t:t.key,D=(t,e,s,r,a)=>{if(e==="key")e==="ref"&&typeof r=="object"&&(r.value=t);else if(e[0]==="o"&&e[1]==="n"){e=e.toLowerCase();let o=M?.host??t;((t.events||(t.events={}))[e=e.slice(2)]=n=>r.call(o,n))?s||t.addEventListener(e,G):t.removeEventListener(e,G)}else!a&&e!=="list"&&e!=="form"&&e in t?t[e]=r??"":r==null||r===!1?t.removeAttribute(e):t.setAttribute(e,r)},F=(t,e)=>{var s=t.props,r=t.type===x?document.createTextNode(t.tag):(e=e||t.tag==="svg")?document.createElementNS(H,t.tag,{is:s.is}):document.createElement(t.tag,{is:s.is});for(var a in s)D(r,a,null,s[a],e);for(var o=0;o<t.children.length;o++)r.appendChild(F(t.children[o]=y(t.children[o]),e));return t.node=r},E=(t,e,s,r,a)=>{if(s!==r)if(s!=null&&s.type===x&&r.type===x)s.tag!==r.tag&&(e.nodeValue=r.tag);else if(s==null||s.tag!==r.tag)e=t.insertBefore(F(r=y(r),a),e),s!=null&&t.removeChild(s.node);else{var o,n,l,p,m=s.props,v=r.props,f=s.children,c=r.children,u=0,i=0,b=f.length-1,_=c.length-1;a=a||r.tag==="svg";for(var h in{...m,...v})(h==="value"||h==="selected"||h==="checked"?e[h]:m[h])!==v[h]&&D(e,h,m[h],v[h],a);for(;i<=_&&u<=b&&!((l=g(f[u]))==null||l!==g(c[i]));)E(e,f[u].node,f[u++],c[i]=y(c[i++]),a);for(;i<=_&&u<=b&&!((l=g(f[b]))==null||l!==g(c[_]));)E(e,f[b].node,f[b--],c[_]=y(c[_--]),a);if(u>b)for(;i<=_;)e.insertBefore(F(c[i]=y(c[i++]),a),(n=f[u])&&n.node);else if(i>_)for(;u<=b;)e.removeChild(f[u++].node);else{for(var C={},A={},h=u;h<=b;h++)(l=f[h].key)!=null&&(C[l]=f[h]);for(;i<=_;){if(l=g(n=f[u]),p=g(c[i]=y(c[i])),A[l]||p!=null&&p===g(f[u+1])){l==null&&e.removeChild(n.node),u++;continue}p==null||s.type===P?(l==null&&(E(e,n&&n.node,n,c[i],a),i++),u++):(l===p?(E(e,n.node,n,c[i],a),A[p]=!0,u++):(o=C[p])!=null?(E(e,e.insertBefore(o.node,n&&n.node),o,c[i],a),A[p]=!0):E(e,n&&n.node,null,c[i],a),i++)}for(;u<=b;)g(n=f[u++])==null&&e.removeChild(n.node);for(var h in C)A[h]==null&&e.removeChild(C[h].node)}}return r.node=e},y=t=>t!==!0&&t!==!1&&t?t:S(""),I=t=>t.nodeType===x?S(t.nodeValue,t):B(t.nodeName.toLowerCase(),Y,$.map.call(t.childNodes,I),P,t),j=Symbol.for("v-node"),B=(t,e,s,r,a)=>({tag:t,props:e,key:e?.key,children:s,type:r,node:a,v:j}),S=(t,e)=>B(t,Y,$,x,e),w=(t,e,s=$)=>B(t,e??{},Array.isArray(s)?s:[s]);function k(t,e,...s){return e&&typeof e=="object"&&j in e&&(s.unshift(e),e={}),(typeof e=="string"||typeof e=="number")&&(s.unshift(S(e)),e={}),typeof t=="function"?t(e,s):w(t,e||{},s.flatMap(r=>typeof r=="string"||typeof r=="number"?S(r):r))}var M=void 0,q=(t,e,s)=>(M=s,(t=E(t.parentNode,t,t.vdom||I(t),e)).vdom=e,M=void 0,t),W=new Proxy({},{get(t,e){return(s,r)=>k(e,s,r)}});Symbol.metadata??=Symbol("metadata");function Z(t){return class extends HTMLElement{static styles="";static DefineElement(s){customElements.get(s)||customElements.define(s,this)}static useGlobalStyles=!0;static get observedAttributes(){return Array.from(L.get(this[Symbol.metadata])??[])}attributeChangedCallback(s,r,a){r!==a&&(this.attrs[s]=a)}constructor(){super(),this.attachShadow({mode:"open"});let s=new CSSStyleSheet;s.replaceSync(this.constructor.styles),this.shadowRoot.adoptedStyleSheets=[s],this.constructor.useGlobalStyles&&d(this.shadowRoot),this.rootEL=document.createElement("element-root"),this.shadowRoot.appendChild(this.rootEL)}connectedCallback(){let s=this,r=a=>k("element-root",{},a);t.effect(()=>{q(this.rootEL,r(this.render.call(s)),{host:this})}),this.onMount?.()}disconnectedCallback(){this.onUnmount?.()}render(){throw new Error("You must implement the render method in your custom element.")}attrs=t.reactive({});_decoratedStates=t.reactive({})}}var O=null;function V(){return O===null&&(O=Array.from(document.styleSheets).map(t=>{let e=new CSSStyleSheet,s=Array.from(t.cssRules).map(r=>r.cssText).join(" ");return e.replaceSync(s),e})),O}function d(t){t.adoptedStyleSheets.push(...V())}function z(t,{kind:e,name:s}){if(e==="accessor")return{get(){return this._decoratedStates[s]},set(r){this._decoratedStates[s]=r},init(r){this._decoratedStates[s]=r}};throw new Error("Invalid decorator usage: @state only works on class accessors.")}var tt=t=>t.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase(),L=new Map;function J(t,{kind:e,name:s,metadata:r}){let a=tt(s);if(L.has(r)||L.set(r,new Set),L.get(r).add(a),e==="accessor")return{get(){return this.attrs[a]},set(o){this.attrs[a]=o,this.setAttribute(a,String(o))},init(o){this.attrs[a]=o}};if(e==="getter")return function(){return this.attrs[a]??t()};throw new Error("Invalid decorator usage: @attr only works on class accessors and getters.")}var U=String.raw,X=k,Q=S;var N=W;var ut={alpinePlugin:R,CreateBlackberryElement:Z,h:X,text:Q,css:U,elementFactory:N,state:z,attribute:J};export{ut as default};
