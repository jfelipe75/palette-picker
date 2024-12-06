(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const r of c)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(c){const r={};return c.integrity&&(r.integrity=c.integrity),c.referrerPolicy&&(r.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?r.credentials="include":c.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(c){if(c.ep)return;c.ep=!0;const r=n(c);fetch(c.href,r)}})();const m={"5affd4e4-418d-4b62-beeb-1c0f7aaff753":{uuid:"5affd4e4-418d-4b62-beeb-1c0f7aaff753",title:"Marcy",colors:["#c92929","#2f5a8b","#327a5f"],temperature:"neutral"},"32521ef4-d64c-4906-b06d-f3d0d6b16e0f":{uuid:"32521ef4-d64c-4906-b06d-f3d0d6b16e0f",title:"Sleek and Modern",colors:["#3A5199","#2F2E33","#D5D6D2"],temperature:"cool"},"8b144d62-faa7-4226-87e1-096d7c1bedc7":{uuid:"8b144d62-faa7-4226-87e1-096d7c1bedc7",title:"Winter Reds",colors:["#A10115","#C0B2B5","#600A0A"],temperature:"warm"}},y=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},f=t=>{const e=localStorage.getItem(t);return JSON.parse(e)},g=t=>{const e={},n=t.target.elements;for(const o of n)o.type!=="submit"&&(o.type==="radio"?o.checked&&(e[o.name]=o.value):e[o.name]=o.value);return e},v=(t,e,n)=>{const o=document.createElement("ul");for(let c=1;c<=3;c++){const r=document.createElement("li");r.classList.add(`palette${c}`);const l=document.createElement("div");l.classList.add("overlaid");const d=document.createElement("div");d.classList.add("palette-color"),d.id=`color${c}`,d.name=`color-${c}`,d.style.background=t[`color${c}`],l.append(d),r.append(l),o.append(r)}n.append(o)},b=(t,e,n)=>{for(let o=1;o<=3;o++){const c=t[`color${o}`],r=document.createElement("button");r.classList.add("copyHexbutton"),r.name="copy-button",r.dataset.hex=c,r.textContent=`Copy ${c}`,r.addEventListener("click",()=>{const d=r.dataset.hex;navigator.clipboard.writeText(d),r.textContent="Copied hex",setTimeout(()=>{r.textContent=`Copy ${c}`},1e3)}),console.log(`paletteDiv: ${n.children,length}`);const l=n.querySelector(`.palette${o}`);console.log(`targetListItem: ${l}`),l?l.append(r):console.log(`Target list item .palette${o} not found!`)}},L=(t,e)=>{const n=document.createElement("div");n.classList.add(".temperature-div"),n.name="banner";const o=e.temperature;n.textContent=o,t.append(n)},x=(t,e)=>{const n=document.createElement("button");n.classList.add("delete-button"),n.name="delete",n.textContent="Delete",n.addEventListener("click",()=>{t.remove(),localStorage.removeItem(e)}),t.append(n)},C=(t,e)=>{const n=document.createElement("div");n.classList.add("palette-container"),n.dataset.paletteId=e;const o=document.createElement("h3");o.classList.add("name-palette"),o.textContent=t.title,n.append(o),v(t,e,n),b(t,e,n),x(n,e),L(n,t),document.querySelector("#palette-section").append(n)},E=()=>{for(let t=0;t<localStorage.length;t++){const e=localStorage.key(t),n=f(e);C(n,e)}},a=[];for(let t=0;t<256;++t)a.push((t+256).toString(16).slice(1));function h(t,e=0){return(a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]).toLowerCase()}let s;const S=new Uint8Array(16);function $(){if(!s){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");s=crypto.getRandomValues.bind(crypto)}return s(S)}const D=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),u={randomUUID:D};function p(t,e,n){if(u.randomUUID&&!e&&!t)return u.randomUUID();t=t||{};const o=t.random||(t.rng||$)();return o[6]=o[6]&15|64,o[8]=o[8]&63|128,h(o)}const T=t=>{const e=document.createElement("ul");for(let n=1;n<=3;n++){const o=document.createElement("li");o.classList.add(`palette${n}`);const c=document.createElement("div");c.classList.add("overlaid");const r=document.createElement("div");r.classList.add("palette-color"),r.id=`color${n}`,r.name=`color-${n}`,r.style.backgroundColor=document.querySelector(`#color-type${n}`).value,c.append(r),o.append(c),e.append(o)}return t.append(e),t},I=t=>{for(let e=1;e<=3;e++){const n=document.querySelector(`#color-type${e}`).value;console.log(n);const o=document.createElement("button");o.classList.add("copyHexbutton"),o.name="copy-button",o.dataset.hex=n,o.textContent=`Copy ${n}`,o.addEventListener("click",()=>{const r=o.dataset.hex;navigator.clipboard.writeText(r),o.textContent="Copied hex",setTimeout(()=>{o.textContent=`Copy ${n}`},1e3)}),console.log(`paletteDiv: ${t.children,length}`);const c=t.querySelector(`.palette${e}`);console.log(`targetListItem: ${c}`),c?c.append(o):console.log(`Target list item .palette${e} not found!`)}},q=t=>{const e=document.createElement("button");e.classList.add("delete-button"),e.name="delete",e.textContent="Delete",e.addEventListener("click",()=>{t.remove()}),t.append(e)},w=t=>{const e=document.createElement("div");e.classList.add(".temperature-div"),e.name="banner";for(let n=1;n<=3;n++){const o=document.querySelector(`#temperature${n}`);console.log(`radio: ${o.value}`),o.checked&&(e.textContent=o.value)}t.append(e)},U=()=>{const t=document.querySelector("#palette-section"),e=document.createElement("div");e.classList.add("palette-container");const n=document.querySelector("#palette-title").value,o=document.createElement("h3");return o.textContent=n,o.classList.add("name-palette"),e.append(o),T(e),I(e),q(e),w(e),t.append(e),e};console.log(m);p();const i=document.querySelector("#palette-form");document.querySelector("#submit-button");i.addEventListener("submit",t=>{if(t.preventDefault(),!i.querySelector("#palette-title").value){alert("Please fill in palette title field");return}const n=g(t),o=p();y(o,n),U(),i.reset()});window.addEventListener("DOMContentLoaded",()=>{E()});const B=document.querySelectorAll(".delete-button");B.forEach(t=>{t.addEventListener("click",e=>{e.target.parentElement.remove()})});const O=document.querySelectorAll(".copyHexButton");O.forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.hex;navigator.clipboard.writeText(e),t.textContent="Copied hex",setTimeout(()=>{t.textContent=`Copy ${e}`},1e3)})});