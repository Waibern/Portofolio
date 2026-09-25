const projects = [
  {title:"Tourify",cat:"web",desc:"A ticket booking website with camera-based ticket scanning for check-in.",tags:["React","API","Web"],year:"2026",image:"images/Tourify.png",link:"https://github.com/Waibern/Tourify-Web",linkText:"View project",contain:true},
  {title:"NusaRide",cat:"games",desc:"A Roblox game project built with Luau.",tags:["Roblox","Luau"],year:"2026",image:"images/nusaride.png",link:"https://www.roblox.com/games/118563327761810/NusaRide",linkText:"Play on Roblox"},
  {title:"Servics",cat:"apps",desc:"A vehicle care app for maintenance, service history, and trip details.",tags:["Mobile app","Vehicle care"],year:"2026",image:"images/servics.png"},
  {title:"9router",cat:"apps",desc:"An AI-powered terminal tool experiment for working with files and APIs.",tags:["AI","Developer tool"],year:"2026",image:"images/9router.png"}
];

const skills=[
  {group:"Web",items:["HTML","CSS","React"]},
  {group:"Programming",items:["C++","Kotlin","Luau"]},
  {group:"Platforms & tools",items:["Git","GitHub","Roblox Studio","Blender"]},
  {group:"Design",items:["UI / UX","3D modelling"]}
];
const grid=document.getElementById("projectGrid");

function render(filter="all"){
  grid.innerHTML=projects.filter(project=>filter==="all"||project.cat===filter).map(project=>`
    <article class="project" data-cat="${project.cat}">
      <div class="p-img ${project.contain?"contain":""}"><img src="${project.image}" alt="${project.title} project preview" loading="lazy"></div>
      <div class="p-body">
        <div class="p-top"><small>${project.cat==="web"?"Web project":project.cat==="games"?"Game project":"App & tool"}</small><span class="p-year">${project.year}</span></div>
        <h3>${project.title}</h3><p>${project.desc}</p>
        <div class="p-tags">${project.tags.map(tag=>`<i>${tag}</i>`).join("")}</div>
        ${project.link?`<a class="p-link" href="${project.link}" target="_blank" rel="noreferrer">${project.linkText} ↗</a>`:""}
      </div>
    </article>
  `).join("");
}
render();

document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-filter]").forEach(item=>item.classList.remove("active"));
  button.classList.add("active");
  render(button.dataset.filter);
}));

document.getElementById("skills").innerHTML=skills.map(group=>`
  <div class="skill-group"><h4>${group.group}</h4><div class="skill-list">${group.items.map(item=>`<span class="skill">${item}</span>`).join("")}</div></div>
`).join("");

const aboutJson=document.getElementById("aboutJson");
const aboutText=`{
  "name": "William Hakeem Atallah",
  "location": "Bandung, Indonesia",
  "education": "Grade 11 · PPLG",
  "school": "SMK Telkom Bandung",
  "interests": ["mobile apps", "3D modelling", "game development"]
}`;
let typingStarted=false;
const aboutObserver=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)&&!typingStarted){
    typingStarted=true;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      aboutJson.textContent=aboutText;
      return;
    }
    let position=0;
    const typeNext=()=>{
      aboutJson.textContent=aboutText.slice(0,position++);
      if(position<=aboutText.length) setTimeout(typeNext,22);
    };
    typeNext();
    aboutObserver.disconnect();
  }
},{threshold:.15});
aboutObserver.observe(document.querySelector("#home .hero-json"));

const root=document.documentElement;
const themeButton=document.getElementById("themeToggle");
root.setAttribute("data-theme",localStorage.getItem("theme")||"light");
themeButton.addEventListener("click",()=>{
  const next=root.getAttribute("data-theme")==="dark"?"light":"dark";
  root.setAttribute("data-theme",next);
  localStorage.setItem("theme",next);
});

const menuButton=document.getElementById("menuBtn");
const links=document.getElementById("links");
menuButton.addEventListener("click",()=>{
  const open=links.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});
document.querySelectorAll(".links a").forEach(link=>link.addEventListener("click",()=>{
  links.classList.remove("open");
  menuButton.setAttribute("aria-expanded","false");
}));

const navLinks=[...document.querySelectorAll(".links a")];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) navLinks.forEach(link=>link.classList.toggle("active",link.hash==="#"+entry.target.id));
}),{rootMargin:"-25% 0px -65% 0px"});
document.querySelectorAll("section[id]").forEach(section=>observer.observe(section));
