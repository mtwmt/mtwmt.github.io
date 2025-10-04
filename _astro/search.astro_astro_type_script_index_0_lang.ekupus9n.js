import{p as d}from"./purify.es.CGs5VtEq.js";const i="Mandy's Website",l=(t,e,n)=>{if(e){{const r=new RegExp(e,"igm");t=t.replace(r,'<span class="bg-orange-500 text-white px-1 rounded">$&</span>')}return t}};let o;const a=document.querySelector("#search"),m=document.querySelector("#searchReadout"),h=document.querySelector("#searchResults");function p(t){document.title=t?`${i} | 搜尋 “${t}”`:i}function f(t){const e=t?`搜尋：${t}`:"";m.textContent=e}const w=(t,e)=>t.map(n=>{const{title:r,date:c,slug:u}=n,s=new Date(c);return`<li class="py-4 px-[4vw]">
								<time datetime="${s.toISOString()}">
									${s.toLocaleDateString("en-us",{year:"numeric",month:"short",day:"numeric"})}
								</time>
								<a href="/blog/${u}/">${l(r,e)}</a>
							</li>`}).join("");async function g(t){if(t?.length===0)return;if(!o)try{const n=await fetch("/search.json");if(!n.ok)throw new Error("Something went wrong…please try again");o=await n.json()}catch(n){console.error(n)}const e=o.filter(n=>n.title.toLowerCase().includes(t.toLowerCase()));h.innerHTML=e?.length>0?w(e,t):`
      <div class="border-default py-10 px-[4vw]"><p>目前沒有關於 ${t} 主題的文章哦！</p></div>
      `}window.addEventListener("DOMContentLoaded",()=>{const t=new URLSearchParams(window.location.search).get("q"),e=t?d.sanitize(t):"";if(!a){console.error("Search input not found");return}e&&e.trim().length>0&&(g(e.trim()),p(e.trim()),f(e.trim()),a.value=e.trim()),a.focus()});
