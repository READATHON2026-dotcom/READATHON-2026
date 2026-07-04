const API_URL = "https://script.google.com/macros/s/AKfycby2yVYxKopIBeqN2BAeaGCw4zlQC6n-wZwnsTyddCKjZyYwKyD-q2UZAh-pFYub_ZdiNQ/exec";

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  })
  .then(data => {
    const totalReaders = document.getElementById("totalReaders");
    if (totalReaders) {
      totalReaders.textContent = data.totalReaders;
    }
  })
  .catch(error => {
    console.error("Error loading data:", error);
    const totalReaders = document.getElementById("totalReaders");
    if (totalReaders) {
      totalReaders.textContent = "Error";
    }
  });
