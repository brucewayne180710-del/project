(() => {
 "use strict";
 const $=(s,root=document)=>root.querySelector(s);
 const $$=(s,root=document)=>[...root.querySelectorAll(s)];
 const groups={
  acrylic:{label:"Acrylic",items:["acrylic_47.jpg","acrylic_48.jpg","acrylic_50.jpg","acrylic_51.jpg","acrylic_53.jpg","acrylic_54.jpg","acrylic_56.jpg","acrylic_58.jpg","acrylic_59.jpg","acrylic_61.jpg","acrylic_62.jpg","acrylic_64.jpg"]},
  marble:{label:"Marble",items:["marble_144.jpg","marble_147.jpg","marble_150.jpg","marble_153.jpg","marble_156.jpg","marble_159.jpg","marble_162.jpg","marble_165.jpg","marble_168.jpg","marble_171.jpg","marble_174.jpg","marble_177.jpg"]},
  satvario:{label:"Satvario",items:["satvario_72.jpg","satvario_76.jpg","satvario_79.jpg","satvario_83.jpg","satvario_86.jpg","satvario_90.jpg","satvario_93.jpg","satvario_97.jpg","satvario_101.jpg","satvario_104.jpg","satvario_108.jpg","satvario_111.jpg","satvario_115.jpg","satvario_118.jpg","satvario_122.jpg","satvario_125.jpg","satvario_129.jpg"]},
  doorskin:{label:"Door skins",items:["doorskin_3.jpg","doorskin_5.jpg","doorskin_8.jpg","doorskin_10.jpg","doorskin_13.jpg","doorskin_16.jpg","doorskin_18.jpg","doorskin_21.jpg","doorskin_24.jpg","doorskin_26.jpg","doorskin_29.jpg","doorskin_31.jpg","doorskin_34.jpg","doorskin_37.jpg","doorskin_39.jpg","doorskin_42.jpg"]}
 };
 const all=Object.entries(groups).flatMap(([key,g])=>g.items.map(file=>({key,label:g.label,file,code:file.replace(".jpg","").replace("_"," ").toUpperCase()})));
 const saved=new Set(); let active="all";
 const grid=$("#product-grid"), bar=$("#shortlist-bar");
 function render(){
  grid.replaceChildren();
  all.filter(p=>active==="all"||p.key===active).forEach(p=>{
   const card=document.createElement("article");card.className="product-card";
   const img=document.createElement("img");img.loading="lazy";img.src=`images/${p.key}/${p.file}`;img.alt=`${p.label} sample ${p.code}`;img.onerror=()=>{img.hidden=true};
   const save=document.createElement("button");save.className="save";save.type="button";save.textContent=saved.has(p.file)?"✓":"+";save.setAttribute("aria-label",(saved.has(p.file)?"Remove ":"Save ")+p.code);save.setAttribute("aria-pressed",String(saved.has(p.file)));save.addEventListener("click",()=>{saved.has(p.file)?saved.delete(p.file):saved.add(p.file);render();});
   const info=document.createElement("div");info.className="product-info";
   const category=document.createElement("span");category.className="category";category.textContent=p.label;
   const title=document.createElement("h3");title.textContent=p.code;
   const desc=document.createElement("p");desc.textContent="Explore this finish and request current details.";
   info.append(category,title,desc);card.append(img,save,info);grid.append(card);
  });
  $("#saved-count").textContent=String(saved.size);bar.hidden=saved.size===0;
 }
 $$(".filter").forEach(btn=>btn.addEventListener("click",()=>{active=btn.dataset.filter;$$(".filter").forEach(b=>{const on=b===btn;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});render();}));
 $("#clear-shortlist").addEventListener("click",()=>{saved.clear();render();});
 $("#send-shortlist").addEventListener("click",()=>{const lines=[...saved].map(f=>{const p=all.find(x=>x.file===f);return p?`${p.label}: ${p.code}`:f;});$("#message").value=`I’d like to enquire about these materials:\n${lines.join("\n")}\n\nPlease share current availability, specifications and sample options.`;$("#contact").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});$("#name").focus({preventScroll:true});});
 const toggle=$(".menu-toggle"),nav=$(".nav");
 toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"×":"☰";});
 $$(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.textContent="☰";}));
 $("#contact-form").addEventListener("submit",e=>{
  e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
  const data=new FormData(form);const clean=v=>String(v||"").trim();
  const subject=`CULT & HABITAT enquiry — ${clean(data.get("name")).slice(0,100)}`;
  const body=[`Name: ${clean(data.get("name"))}`,`Email: ${clean(data.get("email"))}`,`Project: ${clean(data.get("project"))||"Not specified"}`,"",clean(data.get("message"))].join("\n");
  const href=`mailto:culthabitat@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $("#form-status").textContent="Opening your email app. Review the draft and press Send there; this website has not sent or stored it.";
  window.location.href=href;
 });
 $("#year").textContent=String(new Date().getFullYear());render();
})();