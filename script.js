gsap.registerPlugin(ScrollTrigger);

/* ----------------
   TITLE LETTER FX
---------------- */
const pastel = [
  "#FADADD","#E6E6FA","#FFF1C1",
  "#C1E1DC","#FFD1DC","#E0BBE4","#D4F1F4"
];

const title = document.getElementById("title");
const text = title.innerHTML;
title.innerHTML = "";

text.split(/(<br\s*\/?>)/).forEach(part=>{
  if(part.includes("<br")){
    title.appendChild(document.createElement("br"));
  }else{
    part.split("").forEach(c=>{
      const span = document.createElement("span");
      span.textContent = c;
      span.style.display = "inline-block";
      span.style.transition = "color 1s, transform .2s";
      title.appendChild(span);

      span.addEventListener("mouseenter",()=>{
        span.style.color = pastel[Math.floor(Math.random()*pastel.length)];
        span.style.transform = `translateX(${Math.random()*10-5}px)`;
        setTimeout(()=>{
          span.style.color = "";
          span.style.transform = "translateX(0)";
        },3000);
      });
    });
  }
});

/* FIX: ตั้งตำแหน่งเริ่มต้นก่อน animate */
gsap.set("#title span",{y:0});

/* ----------------
   HERO ANIMATION
---------------- */
gsap.from("#title span",{
  opacity:0,
  y:24,
  stagger:0.04,
  duration:1.2,
  ease:"power2.out"
});

gsap.to("#title span",{
  y:-4,
  repeat:-1,
  yoyo:true,
  duration:3,
  stagger:{
    each:0.15,
    from:"random"
  },
  ease:"sine.inOut"
});

/* ----------------
   SLIDER LOOP
---------------- */
gsap.to(".slider-track",{
  x:"-50%",
  duration:30,
  repeat:-1,
  ease:"none"
});

/* ----------------
   CATEGORIES IN
---------------- */
gsap.to(".card",{
  scrollTrigger:{
    trigger:".categories",
    start:"top 80%",
  },
  opacity:1,
  y:0,
  stagger:0.2,
  duration:1,
  ease:"power4.out"
});

/* ----------------
   PRODUCT SCROLL
---------------- */
gsap.from(".product-item",{
  scrollTrigger:{
    trigger:".product",
    start:"top 80%",
  },
  opacity:0,
  y:80,
  stagger:0.3,
  duration:1.2,
  ease:"power3.out"
});

const categories = document.querySelectorAll(".category");

categories.forEach(btn=>{
  btn.addEventListener("click",()=>{
    categories.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    const target = document.getElementById(btn.dataset.target);
    if(target){
      target.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    }
  });
});

document.addEventListener("DOMContentLoaded",()=>{

  const btn = document.getElementById("scrollTopBtn");
  const target = document.querySelector(".categories");

  if(!btn || !target){
    console.warn("❌ ไม่เจอปุ่มหรือ categories");
    return;
  }

  window.addEventListener("scroll",()=>{
    if(window.scrollY > 300){
      btn.classList.add("show");
    }else{
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click",()=>{
    target.scrollIntoView({behavior:"smooth"});
  });

});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if(target){
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});
