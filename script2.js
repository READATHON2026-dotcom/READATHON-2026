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
