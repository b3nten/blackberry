const{isArray:e}=Array,{getPrototypeOf:t,getOwnPropertyDescriptor:n}=Object,r=[],s=()=>document.createRange(),l=(e,t,n)=>(e.set(t,n),n),o=(e,t)=>t.reduceRight(i,e),i=(e,t)=>e.childNodes[t],{setPrototypeOf:c}=Object;let a;var u=(e,t,n)=>(a||(a=s()),n?a.setStartAfter(e):a.setStartBefore(e),a.setEndAfter(t),a.deleteContents(),e);const d=({firstChild:e,lastChild:t},n)=>u(e,t,n);let h=!1;const f=(e,t)=>h&&11===e.nodeType?1/t<0?t?d(e,!0):e.lastChild:t?e.valueOf():e.firstChild:e,p=e=>document.createComment(e);class g extends((e=>{function t(e){return c(e,new.target.prototype)}return t.prototype=e.prototype,t})(DocumentFragment)){#e=p("<>");#t=p("</>");#n=r;constructor(e){super(e),this.replaceChildren(this.#e,...e.childNodes,this.#t),h=!0}get firstChild(){return this.#e}get lastChild(){return this.#t}get parentNode(){return this.#e.parentNode}remove(){d(this,!1)}replaceWith(e){d(this,!0).replaceWith(e)}valueOf(){const{parentNode:e}=this;if(e===this)this.#n===r&&(this.#n=[...this.childNodes]);else{if(e){let{firstChild:e,lastChild:t}=this;for(this.#n=[e];e!==t;)this.#n.push(e=e.nextSibling)}this.replaceChildren(...this.#n)}return this}}const m=(e,t,n)=>e.setAttribute(t,n),b=(e,t)=>e.removeAttribute(t);let v;const C=(t,n,r)=>{r=r.slice(1),v||(v=new WeakMap);const s=v.get(t)||l(v,t,{});let o=s[r];return o&&o[0]&&t.removeEventListener(r,...o),o=e(n)?n:[n,!1],s[r]=o,o[0]&&t.addEventListener(r,...o),n},w=(e,t)=>{const{t:n,n:r}=e;let s=!1;switch(typeof t){case"object":if(null!==t){(r||n).replaceWith(e.n=t.valueOf());break}case"undefined":s=!0;default:n.data=s?"":t,r&&(e.n=null,r.replaceWith(n))}return t},x=(e,t,n)=>e[n]=t,y=(e,t,n)=>x(e,t,n.slice(1)),$=(e,t,n)=>null==t?(b(e,n),t):x(e,t,n),N=(e,t)=>("function"==typeof t?t(e):t.current=e,t),k=(e,t,n)=>(null==t?b(e,n):m(e,n,t),t),O=(e,t,n)=>(e.toggleAttribute(n.slice(1),t),t),W=(e,t,n)=>{const{length:s}=t;if(e.data=`[${s}]`,s)return((e,t,n,r,s)=>{const l=n.length;let o=t.length,i=l,c=0,a=0,u=null;for(;c<o||a<i;)if(o===c){const t=i<l?a?r(n[a-1],-0).nextSibling:r(n[i],0):s;for(;a<i;)e.insertBefore(r(n[a++],1),t)}else if(i===a)for(;c<o;)u&&u.has(t[c])||e.removeChild(r(t[c],-1)),c++;else if(t[c]===n[a])c++,a++;else if(t[o-1]===n[i-1])o--,i--;else if(t[c]===n[i-1]&&n[a]===t[o-1]){const s=r(t[--o],-0).nextSibling;e.insertBefore(r(n[a++],1),r(t[c++],-0).nextSibling),e.insertBefore(r(n[--i],1),s),t[o]=n[i]}else{if(!u){u=new Map;let e=a;for(;e<i;)u.set(n[e],e++)}if(u.has(t[c])){const s=u.get(t[c]);if(a<s&&s<i){let l=c,d=1;for(;++l<o&&l<i&&u.get(t[l])===s+d;)d++;if(d>s-a){const l=r(t[c],0);for(;a<s;)e.insertBefore(r(n[a++],1),l)}else e.replaceChild(r(n[a++],1),r(t[c++],-1))}else c++}else e.removeChild(r(t[c++],-1))}return n})(e.parentNode,n,t,f,e);switch(n.length){case 1:n[0].remove();case 0:break;default:u(f(n[0],0),f(n.at(-1),-0),!1)}return r},M=new Map([["aria",(e,t)=>{for(const n in t){const r=t[n],s="role"===n?n:`aria-${n}`;null==r?b(e,s):m(e,s,r)}return t}],["class",(e,t)=>$(e,t,null==t?"class":"className")],["data",(e,t)=>{const{dataset:n}=e;for(const e in t)null==t[e]?delete n[e]:n[e]=t[e];return t}],["ref",N],["style",(e,t)=>null==t?$(e,t,"style"):x(e.style,t,"cssText")]]),A=(e,r,s)=>{switch(r[0]){case".":return y;case"?":return O;case"@":return C;default:return s||"ownerSVGElement"in e?"ref"===r?N:k:M.get(r)||(r in e?r.startsWith("on")?x:((e,r)=>{let s;do{s=n(e,r)}while(!s&&(e=t(e)));return s})(e,r)?.set?$:k:k)}},S=(e,t)=>(e.textContent=null==t?"":t,t),E=(e,t,n)=>({a:e,b:t,c:n}),T=()=>E(null,null,r);var j=e=>(t,n)=>{const{a:s,b:l,c:i}=e(t,n),c=document.importNode(s,!0);let a=r;if(l!==r){a=[];for(let e,t,n=0;n<l.length;n++){const{a:s,b:i,c:p}=l[n],g=s===t?e:e=o(c,t=s);a[n]=(u=i,d=g,h=p,f=i===W?[]:i===w?T():null,{v:r,u:u,t:d,n:h,c:f})}}var u,d,h,f;return((e,t)=>({b:e,c:t}))(i?c.firstChild:new g(c),a)};const B=/^(?:plaintext|script|style|textarea|title|xmp)$/i,D=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,P=/<([a-zA-Z0-9]+[a-zA-Z0-9:._-]*)([^>]*?)(\/?)>/g,R=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,z=/[\x01\x02]/g;let F,L,Z=document.createElement("template");var G=(e,t)=>{if(t)return F||(F=document.createElementNS("http://www.w3.org/2000/svg","svg"),L=s(),L.selectNodeContents(F)),L.createContextualFragment(e);Z.innerHTML=e;const{content:n}=Z;return Z=Z.cloneNode(!1),n};const H=e=>{const t=[];let n;for(;n=e.parentNode;)t.push(t.indexOf.call(n.childNodes,e)),e=n;return t},V=()=>document.createTextNode(""),_=(t,n,s)=>{const o=G(((e,t,n)=>{let r=0;return e.join("").trim().replace(P,((e,t,r,s)=>`<${t}${r.replace(R,"=$2$1").trimEnd()}${s?n||D.test(t)?" /":`></${t}`:""}>`)).replace(z,(e=>""===e?`\x3c!--${t+r++}--\x3e`:t+r++))})(t,I,s),s),{length:i}=t;let c=r;if(i>1){const t=[],r=document.createTreeWalker(o,129);let l=0,a=`${I}${l++}`;for(c=[];l<i;){const o=r.nextNode();if(8===o.nodeType){if(o.data===a){const r=e(n[l-1])?W:w;r===w&&t.push(o),c.push(E(H(o),r,null)),a=`${I}${l++}`}}else{let e;for(;o.hasAttribute(a);){e||(e=H(o));const t=o.getAttribute(a);c.push(E(e,A(o,t,s),t)),b(o,a),a=`${I}${l++}`}!s&&B.test(o.localName)&&o.textContent.trim()===`\x3c!--${a}--\x3e`&&(c.push(E(e||H(o),S,null)),a=`${I}${l++}`)}}for(l=0;l<t.length;l++)t[l].replaceWith(V())}const{childNodes:a}=o;let{length:u}=a;return u<1?(u=1,o.appendChild(V())):1===u&&1!==i&&1!==a[0].nodeType&&(u=0),l(q,t,E(o,c,1===u))},q=new WeakMap,I="isµ";var J=e=>(t,n)=>q.get(t)||_(t,n,e);const K=j(J(!1)),Q=j(J(!0)),U=(e,{s:t,t:n,v:r})=>{if(e.a!==n){const{b:s,c:l}=(t?Q:K)(n,r);e.a=n,e.b=s,e.c=l}for(let{c:t}=e,n=0;n<t.length;n++){const e=r[n],s=t[n];switch(s.u){case W:s.v=W(s.t,X(s.c,e),s.v);break;case w:const t=e instanceof Y?U(s.c||(s.c=T()),e):(s.c=null,e);t!==s.v&&(s.v=w(s,t));break;default:e!==s.v&&(s.v=s.u(s.t,e,s.n,s.v))}}return e.b},X=(e,t)=>{let n=0,{length:r}=t;for(r<e.length&&e.splice(r);n<r;n++){const r=t[n];r instanceof Y?t[n]=U(e[n]||(e[n]=T()),r):e[n]=null}return t};class Y{constructor(e,t,n){this.s=e,this.t=t,this.v=n}toDOM(e=T()){return U(e,this)}}
/*! (c) Andrea Giammarchi - MIT */const ee=e=>(t,...n)=>new Y(e,t,n),te=ee(!1),ne=ee(!0),re=new WeakMap;var se=(e,t,n)=>{const r=re.get(e)||l(re,e,T()),{b:s}=r,o=t,i=o instanceof Y?o.toDOM(r):o;return s!==i&&e.replaceChildren((r.b=i).valueOf()),e};
/*! (c) Andrea Giammarchi - MIT */const le=new WeakMap,oe=e=>(t,n)=>{const r=le.get(t)||l(le,t,new Map);return r.get(n)||l(r,n,function(t,...n){return new Y(e,t,n).toDOM(this)}.bind(T()))},ie=oe(!1),ce=oe(!0),ae=new FinalizationRegistry((([e,t,n])=>{n&&console.debug(`%c${String(t)}`,"font-weight:bold","collected"),e(t)})),ue=Object.create(null),de=new WeakMap,he=e=>e();let fe=!0;const pe=e=>(t,n)=>{if(fe="function"!=typeof n,ge(t),fe)return se(t,n);fe=!0;const r=new WeakRef(t),s=e((()=>{se(r.deref(),n())}));return de.set(t,s),((e,t,{debug:n,handler:r,return:s,token:l=e}=ue)=>{const o=s||new Proxy(e,r||ue),i=[o,[t,e,!!n]];return!1!==l&&i.push(l),ae.register(...i),o})(s,he,{return:t})},ge=e=>{const t=de.get(e);var n;t&&(fe&&de.delete(e),n=t,ae.unregister(n),t())};export{Y as Hole,pe as attach,M as attr,ge as detach,te as html,ie as htmlFor,pe as reactive,ne as svg,ce as svgFor};