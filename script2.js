<script>
/* =========================================
   READATHON V2 - COMPLETE ULTRA ANIMATIONS
   Scroll Reveal + Counters + Parallax
========================================= */

/* ===== ELEMENTS ===== */
const sections = document.querySelectorAll("section");
const counters = document.querySelectorAll(".counter");

/* ===== 1. SCROLL REVEAL SYSTEM ===== */
function revealSections(){
    const triggerPoint = window.innerHeight * 0.85;

    sections.forEach(sec=>{
        const top = sec.getBoundingClientRect().top;

        if(top < triggerPoint){
            sec.classList.add("show");
        }
    });
}

/* ===== 2. COUNTER ANIMATION ===== */
function animateCounters(){
    counters.forEach(counter=>{
        const target = +counter.getAttribute("data-target");
        let started = counter.getAttribute("data-started");

        if(started) return;

        const top = counter.getBoundingClientRect().top;
        if(top < window.innerHeight){
            counter.setAttribute("data-started","true");

            let current = 0;
            const step = Math.ceil(target / 60);

            const interval = setInterval(()=>{
                current += step;

                if(current >= target){
                    counter.innerText = target;
                    clearInterval(interval);
                } else {
                    counter.innerText = current;
                }
            }, 25);
        }
    });
}

/* ===== 3. PARALLAX HERO EFFECT ===== */
function parallaxHero(){
    const hero = document.querySelector(".hero");
    if(!hero) return;

    let scrollY = window.scrollY;
    hero.style.transform = `translateY(${scrollY * 0.15}px)`;
}

/* ===== 4. SMOOTH NAVIGATION ===== */
document.querySelectorAll("nav a").forEach(link=>{
    link.addEventListener("click",e=>{
        e.preventDefault();
        const id = link.getAttribute("href");
        const target = document.querySelector(id);
        if(target){
            target.scrollIntoView({behavior:"smooth"});
        }
    });
});

/* ===== 5. INIT ON LOAD ===== */
window.addEventListener("load",()=>{
    revealSections();
    animateCounters();
});

/* ===== 6. ON SCROLL ===== */
window.addEventListener("scroll",()=>{
    revealSections();
    animateCounters();
    parallaxHero();
});
</script>
