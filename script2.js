/* ==========================================================
   READATHON 2026 - VERSION 2
   Part 1
   Configuration + Utilities + API + Counter Animation
========================================================== */

"use strict";

/* ================= CONFIG ================= */

const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycby2yVYxKopIBeqN2BAeaGCw4zlQC6n-wZwnsTyddCKjZyYwKyD-q2UZAh-pFYub_ZdiNQ/exec",
    REFRESH_INTERVAL: 60000,
    COUNTER_DURATION: 1500
};

/* ================= DOM ================= */

const DOM = {
    readers: document.getElementById("totalReaders"),
    books: document.getElementById("totalBooks"),
    pages: document.getElementById("totalPages"),
    minutes: document.getElementById("totalMinutes"),
    leaderboard: document.getElementById("leaderboardBody")
};

/* ================= HELPERS ================= */

function safeNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
}

function clearLeaderboard() {
    if (DOM.leaderboard) {
        DOM.leaderboard.innerHTML = "";
    }
}

/* ================= COUNTER ================= */

function animateCounter(element, endValue) {

    if (!element) return;

    const target = safeNumber(endValue);

    let start = 0;

    const duration = CONFIG.COUNTER_DURATION;

    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const value = Math.floor(progress * target);

        element.textContent = value.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent = target.toLocaleString();

        }

    }

    requestAnimationFrame(update);

}

/* ================= FETCH API ================= */

async function fetchReadathonData() {

    try {

        const response = await fetch(CONFIG.API_URL);

        if (!response.ok) {
            throw new Error("Unable to load data.");
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return null;

    }

}

/* ================= UPDATE STATS ================= */

function updateStatistics(data) {

    animateCounter(DOM.readers, data.totalReaders);

    animateCounter(DOM.books, data.totalBooks);

    animateCounter(DOM.pages, data.totalPages);

    animateCounter(DOM.minutes, data.totalMinutes);

}
/* ==========================================================
   PART 2
   Leaderboard Rendering
========================================================== */

/* ================= BADGES ================= */

function getBadge(pages) {

    pages = safeNumber(pages);

    if (pages >= 1000)
        return "🌌 Universe Reader";

    if (pages >= 500)
        return "🌟 Galaxy Master";

    if (pages >= 250)
        return "🚀 Mars Explorer";

    if (pages >= 100)
        return "⭐ Star Reader";

    return "📚 Reader";

}

/* ================= ROW COLOR ================= */

function decorateRow(row, index) {

    row.style.opacity = "0";

    row.style.transform = "translateY(25px)";

    row.style.transition =
        "opacity .6s ease, transform .6s ease";

    switch(index){

        case 0:
            row.style.background =
                "linear-gradient(90deg,#FFD70033,#FFD70011)";
            break;

        case 1:
            row.style.background =
                "linear-gradient(90deg,#C0C0C033,#C0C0C011)";
            break;

        case 2:
            row.style.background =
                "linear-gradient(90deg,#CD7F3233,#CD7F3211)";
            break;

    }

    setTimeout(()=>{

        row.style.opacity="1";

        row.style.transform="translateY(0)";

    },index*120);

}

/* ================= CREATE ROW ================= */

function createLeaderboardRow(reader,index){

    const row=document.createElement("tr");

    const pages=safeNumber(reader.pages);

    row.innerHTML=`

        <td>${index+1}</td>

        <td>${reader.name ?? "-"}</td>

        <td>${reader.books ?? 0}</td>

        <td>${pages}</td>

        <td>${reader.minutes ?? 0}</td>

        <td>${getBadge(pages)}</td>

    `;

    decorateRow(row,index);

    return row;

}

/* ================= RENDER TABLE ================= */

function renderLeaderboard(list){

    clearLeaderboard();

    if(!Array.isArray(list)){

        DOM.leaderboard.innerHTML=`
        <tr>
        <td colspan="6">
        No leaderboard data available.
        </td>
        </tr>
        `;

        return;

    }

    list.forEach((reader,index)=>{

        DOM.leaderboard.appendChild(

            createLeaderboardRow(reader,index)

        );

    });

}

/* ================= LOAD DATA ================= */

async function loadLeaderboard(){

    const data=await fetchReadathonData();

    if(!data){

        DOM.leaderboard.innerHTML=`

        <tr>

        <td colspan="6">

        Unable to load leaderboard.

        </td>

        </tr>

        `;

        return;

    }

    updateStatistics(data);

    renderLeaderboard(data.leaderboard);

}
