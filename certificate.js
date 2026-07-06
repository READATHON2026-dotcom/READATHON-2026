// =======================================
// READATHON CERTIFICATE GENERATOR
// =======================================

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const studentName = document.getElementById("studentName");
const achievementLevel = document.getElementById("achievementLevel");

const previewName = document.getElementById("previewName");
const previewLevel = document.getElementById("previewLevel");

const certDate = document.getElementById("certDate");
const certificateID = document.getElementById("certificateID");

const certificate = document.getElementById("certificatePreview");

// Generate Button
generateBtn.addEventListener("click", () => {

    const name = studentName.value.trim();

    if (name === "") {
        alert("Please enter the student's name.");
        studentName.focus();
        return;
    }

    previewName.innerText = name;
    previewLevel.innerText = achievementLevel.value;

    // Current Date
    const today = new Date();

    certDate.innerText =
        today.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    // Certificate ID
    const random = Math.floor(100000 + Math.random() * 900000);

    certificateID.innerText = "RD2026-" + random;

    // Show Certificate
    certificate.style.display = "block";

    // Smooth Scroll
    certificate.scrollIntoView({
        behavior: "smooth"
    });

});


// Download Certificate
downloadBtn.addEventListener("click", () => {

    if (certificate.style.display === "none") {
        alert("Generate the certificate first.");
        return;
    }

    html2canvas(certificate, {
        scale: 3
    }).then(canvas => {

        const link = document.createElement("a");

        link.download =
            previewName.innerText.replace(/\s+/g, "_") +
            "_Certificate.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});
