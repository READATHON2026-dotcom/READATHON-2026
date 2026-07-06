const API_URL = "https://script.google.com/macros/s/AKfycby2yVYxKopIBeqN2BAeaGCw4zlQC6n-wZwnsTyddCKjZyYwKyD-q2UZAh-pFYub_ZdiNQ/exec";

document.addEventListener("DOMContentLoaded", () => {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            animateCounter("totalReaders", data.totalReaders);
animateCounter("totalBooks", data.totalBooks);
animateCounter("totalPages", data.totalPages);
animateCounter("totalMinutes", data.totalMinutes);
            function animateCounter(id, end) {

    let start = 0;

    const duration = 1500;

    const step = Math.ceil(end / (duration / 16));

    const counter = document.getElementById(id);

    const timer = setInterval(() => {

        start += step;

        if (start >= end) {

            start = end;

            clearInterval(timer);

        }

        counter.textContent = start;

    },16);

}

            const tbody = document.getElementById("leaderboardBody");
            tbody.innerHTML = "";

            data.leaderboard.forEach((reader, index) => {

                let badge = "📚 Reader";

                if (reader.pages >= 500)
                    badge = "🌟 Galaxy Master";
                else if (reader.pages >= 250)
                    badge = "🚀 Mars Explorer";
                else if (reader.pages >= 100)
                    badge = "⭐ Star Reader";

                tbody.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${reader.name}</td>
                        <td>${reader.books}</td>
                        <td>${reader.pages}</td>
                        <td>${reader.minutes}</td>
                        <td>${badge}</td>
                    </tr>
                `;
            });

        })
        .catch(error => console.error(error));

});
