import{h as m,Fragment as g,reactive as b,Ivysaur as _,effect as v}from"ivysaur";export*from"ivysaur";let A=window.requestIdleCallback||(r=>setTimeout(r,0));class c{static Cache=new Map;constructor(e){c.Cache.has(e)&&(this.
call=c.Cache.get(e));let i=()=>{try{let a=new Function(["scope"],`with (scope) { return ${e}; }`);return Object.defineProperty(
a,"name",{value:`[expression]: ${e}`}),a}catch(a){return console.log(`Error while compiling expression: ${e}`,a),()=>""}};
c.Cache.set(e,i()),this.call=c.Cache.get(e)}}let h=(r,e)=>{if(Array.isArray(r))return m(g,{},r.flatMap(l=>h(l,e)));if(r.
nodeType!=1)return r.nodeValue;let i=r.tagName.toLowerCase(),a={},o=[],u;for(let l of r.attributes){let n=l.nodeName,t=l.
nodeValue;if(l.nodeName[0]===":"){let s=new c(l.nodeValue);l.nodeName===":text"?o.push(s.call(e)):l.nodeName===":html"?a.
dangerouslySetInnerHTML={__html:s.call(e)}:l.nodeName===":if"?u=s:l.nodeName===":ref"?a.ref=s.call(e):a["attr:"+l.nodeName.
slice(1)]=s.call(e)}else if(n[0]==="@"){let s=new c(t);a[`on${n[1].toUpperCase()}${n.slice(2)}`]=f=>s.call(e)(f)}else if(n[0]===
"."){let s=new c(t);a["prop:"+n.slice(1)]=s.call(e)}else a[n]=t}for(let l of Array.from((i=="template"?r.content:r).childNodes))
o.push(l.tagName?.toLowerCase()==="template"?N(l,e):h(l,e));return u&&!u.call(e)?null:m(i,a,...o)},N=(r,e)=>{let i,a,o;for(let n of r.
attributes)n.nodeName.startsWith("each")&&(i=n.nodeName.split(":")[1].trim(),a=new c(n.nodeValue)),n.nodeName===":if"&&(o=
new c(n.nodeValue));let u=[],l=Array.from(r.content.children);if(i){let n=a.call(e);for(let t=0;t<n.length;t++){let s=new Proxy(
{},{get:(f,d)=>d===i?n[t]:e[d],has:(f,d)=>d===i||d in e,set:(f,d,y)=>(e[d]=y,!0)});u.push(h(l,s))}}else u.push(h(l,e));return o&&
!o.call(e)?null:m(g,{},...u)},p=r=>{if(r.tagName!=="TEMPLATE"||typeof r.getAttribute("blackberry")!="string")return;let e=r.
getAttribute("blackberry");if(customElements.get(e))return;let i="",a="",o=[];for(let t of r.content.children)t.tagName===
"SCRIPT"?(i+=t.innerHTML,o.push(t)):t.tagName==="STYLE"&&(a+=t.innerText,o.push(t));o.forEach(t=>t.remove());const u=r.content,
l=r.getAttribute("attributes")?.split(",").map(t=>t.trim())??[];r.remove();const n=new Function("$element","$state","$at\
tributes","$cleanup","$reactive","$effect",i);customElements.define(e,class extends _{static get observedAttributes(){return l}static styles=a;onMount(){
const t=b({});t.$element=this,t.$attributes=this.observedAttributes;const s=(...f)=>void this.cleanup_fns.push(...f);n(this,
t,this.observedAttributes,s,b,v),this.__internal_data=t}render(){return h(Array.from(u.children),this.__internal_data).flat()}onUnmount(){
this.cleanup_fns.forEach(t=>t())}cleanup_fns=[]})},E=()=>{let r=new MutationObserver(i=>{i.forEach(a=>{a.addedNodes.forEach(
o=>{o.tagName==="TEMPLATE"&&p(o)})})}),e=()=>{document.querySelectorAll("template[blackberry]").forEach(p),document.body.
removeAttribute("blackberry-cloak"),r.observe(document.body,{childList:!0,subtree:!0})};switch(document.readyState){case"\
loading":case"interactive":addEventListener("DOMContentLoaded",e);break;case"complete":e()}};export{E as default};
