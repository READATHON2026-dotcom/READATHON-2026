const API_URL = "https://script.google.com/macros/s/AKfycby2yVYxKopIBeqN2BAeaGCw4zlQC6n-wZwnsTyddCKjZyYwKyD-q2UZAh-pFYub_ZdiNQ/exec";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {

    document.getElementById("totalReaders").textContent = data.totalReaders;
    document.getElementById("totalBooks").textContent = data.totalBooks;
    document.getElementById("totalPages").textContent = data.totalPages;
    document.getElementById("totalMinutes").textContent = data.totalMinutes;

  })
  .catch(err => console.log(err));
