/* ===========================================================
   READATHON 2026 PREMIUM
   script2.js
   PART 1
=========================================================== */

"use strict";

/* ===========================================================
   CONFIG
=========================================================== */

const CONFIG = {

    API_URL:
        "https://script.google.com/macros/s/AKfycby2yVYxKopIBeqN2BAeaGCw4zlQC6n-wZwnsTyddCKjZyYwKyD-q2UZAh-pFYub_ZdiNQ/exec",

    COUNTER_DURATION: 1800,

    REFRESH_INTERVAL: 60000

};

/* ===========================================================
   DOM
=========================================================== */

const DOM = {

    readers:
        document.getElementById("totalReaders"),

    books:
        document.getElementById("totalBooks"),

    pages:
        document.getElementById("totalPages"),

    minutes:
        document.getElementById("totalMinutes"),

    leaderboard:
        document.getElementById("leaderboardBody"),

    loader:
        document.getElementById("loader"),

    progressBar:
        document.getElementById("progressBar"),

    backToTop:
        document.getElementById("backToTop")

};

/* ===========================================================
   HELPERS
=========================================================== */

function number(value){

    return Number(value)||0;

}

function create(tag){

    return document.createElement(tag);

}

/* ===========================================================
   COUNTER
=========================================================== */

function animateCounter(element,target){

    if(!element) return;

    target=number(target);

    const duration=CONFIG.COUNTER_DURATION;

    const startTime=performance.now();

    function update(time){

        const progress=Math.min(

            (time-startTime)/duration,

            1

        );

        element.textContent=

            Math.floor(

                progress*target

            ).toLocaleString();

        if(progress<1){

            requestAnimationFrame(update);

        }else{

            element.textContent=

                target.toLocaleString();

        }

    }

    requestAnimationFrame(update);

}

/* ===========================================================
   API
=========================================================== */

async function getReadathonData(){

    try{

        const response=

            await fetch(CONFIG.API_URL);

        if(!response.ok)

            throw new Error(

                "Unable to fetch data"

            );

        return await response.json();

    }

    catch(error){

        console.error(error);

        return null;

    }

}

/* ===========================================================
   UPDATE STATISTICS
=========================================================== */

function updateStats(data){

    animateCounter(

        DOM.readers,

        data.totalReaders

    );

    animateCounter(

        DOM.books,

        data.totalBooks

    );

    animateCounter(

        DOM.pages,

        data.totalPages

    );

    animateCounter(

        DOM.minutes,

        data.totalMinutes

    );

}
/* ===========================================================
   PART 2
   LEADERBOARD
=========================================================== */

/* ================= BADGES ================= */

function getBadge(pages){

    pages = number(pages);

    if(pages >= 1000)
        return "🌌 Universe Reader";

    if(pages >= 500)
        return "🌟 Galaxy Master";

    if(pages >= 250)
        return "🚀 Mars Explorer";

    if(pages >= 100)
        return "⭐ Star Reader";

    return "📚 Reader";

}

/* ================= RANK MEDALS ================= */

function getRank(rank){

    switch(rank){

        case 1:
            return "🥇";

        case 2:
            return "🥈";

        case 3:
            return "🥉";

        default:
            return rank;

    }

}

/* ================= CREATE ROW ================= */

function createRow(reader,index){

    const row = create("tr");

    const pages = number(reader.pages);

    row.innerHTML = `

        <td>${getRank(index+1)}</td>

        <td>${reader.name}</td>

        <td>${reader.books}</td>

        <td>${pages}</td>

        <td>${reader.minutes}</td>

        <td>${getBadge(pages)}</td>

    `;

    row.classList.add("leader-row");

    if(index===0) row.classList.add("gold");

    if(index===1) row.classList.add("silver");

    if(index===2) row.classList.add("bronze");

    row.style.opacity="0";

    row.style.transform="translateY(25px)";

    setTimeout(()=>{

        row.style.transition=".6s";

        row.style.opacity="1";

        row.style.transform="translateY(0)";

    },index*120);

    return row;

}

/* ================= RENDER ================= */

function renderLeaderboard(list){

    DOM.leaderboard.innerHTML="";

    if(!Array.isArray(list)) return;

    list.forEach((reader,index)=>{

        DOM.leaderboard.appendChild(

            createRow(reader,index)

        );

    });

}

/* ================= LOAD ================= */

async function loadLeaderboard(){

    const data = await getReadathonData();

    if(!data){

        DOM.leaderboard.innerHTML=

        `<tr>

            <td colspan="6">

                Unable to load leaderboard.

            </td>

        </tr>`;

        return;

    }

    updateStats(data);

    renderLeaderboard(data.leaderboard);

}
/* ===========================================================
   PART 3
   UI INTERACTIONS
=========================================================== */

/* ================= LOADER ================= */

window.addEventListener("load", () => {

    if (DOM.loader) {

        setTimeout(() => {

            DOM.loader.style.opacity = "0";
            DOM.loader.style.visibility = "hidden";

        }, 800);

    }

});

/* ================= SCROLL PROGRESS ================= */

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    if (DOM.progressBar) {

        DOM.progressBar.style.width =
            progress + "%";

    }

});

/* ================= BACK TO TOP ================= */

window.addEventListener("scroll", () => {

    if (!DOM.backToTop) return;

    if (window.scrollY > 400) {

        DOM.backToTop.classList.add("show");

    } else {

        DOM.backToTop.classList.remove("show");

    }

});

if (DOM.backToTop) {

    DOM.backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ================= SMOOTH NAVIGATION ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

        const target = document.querySelector(

            link.getAttribute("href")

        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(

    "section,.card,.about-card,.achievement-card,.gallery-item,.contact-card"

);

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},

{

    threshold:0.15

}

);

revealElements.forEach(item=>{

    item.classList.add("hidden");

    revealObserver.observe(item);

});

/* ================= MOBILE MENU ================= */

const menuButton =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".header nav");

if(menuButton && navigation){

    menuButton.addEventListener("click",()=>{

        navigation.classList.toggle("open");

    });

}
/* ===========================================================
   PART 4
   PREMIUM INTERACTIONS
=========================================================== */

/* ================= MAGNETIC BUTTONS ================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

/* ================= RIPPLE EFFECT ================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", e => {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = button.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        button.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ================= FLOATING HERO IMAGE ================= */

const heroImage = document.querySelector(".hero-image");

if(heroImage){

    let direction = 1;

    let offset = 0;

    setInterval(()=>{

        offset += direction;

        heroImage.style.transform =
            `translateY(${offset}px)`;

        if(offset >= 10) direction = -1;

        if(offset <= -10) direction = 1;

    },60);

}

/* ================= GALLERY HOVER ================= */

document.querySelectorAll(".gallery-item").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        item.style.transform =
            "translateY(-10px) scale(1.03)";

    });

    item.addEventListener("mouseleave",()=>{

        item.style.transform = "";

    });

});

/* ================= CARD HOVER ================= */

document.querySelectorAll(

".card,.about-card,.achievement-card,.contact-card"

).forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform =
            "translateY(-8px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = "";

    });

});
/* ===========================================================
   PART 5
   INITIALIZATION & AUTO REFRESH
=========================================================== */

/* ================= ERROR MESSAGE ================= */

function showError(message){

    if(!DOM.leaderboard) return;

    DOM.leaderboard.innerHTML = `
        <tr>
            <td colspan="6" style="padding:25px;text-align:center;">
                ⚠️ ${message}
            </td>
        </tr>
    `;

}

/* ================= LOAD ALL DATA ================= */

async function refreshData(){

    try{

        await loadLeaderboard();

        console.log(
            "✅ Readathon data updated:",
            new Date().toLocaleTimeString()
        );

    }catch(error){

        console.error(error);

        showError("Unable to load live data.");

    }

}

/* ================= AUTO REFRESH ================= */

function startAutoRefresh(){

    setInterval(

        refreshData,

        CONFIG.REFRESH_INTERVAL

    );

}

/* ================= APP INIT ================= */

function init(){

    refreshData();

    startAutoRefresh();

}

/* ================= START APP ================= */

document.addEventListener(

    "DOMContentLoaded",

    init

);
const data = [
  { name: "C", books: 1, pages: 505, minutes: 60 },
  { name: "PALAKSH YADU", books: 1, pages: 50, minutes: 20 },
  { name: "A", books: 1, pages: 50, minutes: 40 },
  { name: "B", books: 1, pages: 50, minutes: 60 },
  { name: "Abhishek", books: 1, pages: 50, minutes: 60 },
  { name: "PREETI", books: 1, pages: 30, minutes: 40 },
  { name: "Pallav", books: 1, pages: 30, minutes: 60 }
];

// sort by pages (you can change logic)
data.sort((a, b) => b.pages - a.pages);

const tbody = document.getElementById("leaderboardBody");

data.forEach((user, index) => {

  let rankEmoji = "🏅";
  let rankClass = "";

  if (index === 0) rankClass = "gold";
  else if (index === 1) rankClass = "silver";
  else if (index === 2) rankClass = "bronze";

  if (index === 0) rankEmoji = "🥇";
  else if (index === 1) rankEmoji = "🥈";
  else if (index === 2) rankEmoji = "🥉";

  const row = `
    <tr>
      <td class="rank ${rankClass}">${rankEmoji} ${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.books}</td>
      <td>${user.pages}</td>
      <td>${user.minutes}</td>
      <td><span class="badge">Reader</span></td>
    </tr>
  `;

  tbody.innerHTML += row;
});
