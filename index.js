/* MOBILE MENU */
function toggleMenu() {
    document.querySelector("nav").classList.toggle("show");
}

/* THEME */
const body = document.body;
const icon = document.getElementById("theme-icon");
localStorage.setItem("theme", "dark");

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    icon.textContent = "☀️";
}

function toggleTheme() {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        icon.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        icon.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}

/* MATRIX BACKGROUND CANVAS */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
chars = chars.split("");

let fontSize = 16;
let columns = canvas.width / fontSize;

let drops = [];
for (let i = 0; i < columns; i++) drops[i] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0aff63"; 
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});







function sendForm(formData) {
  return new Promise((resolve, reject) => {
    fetch("https://server-ix74.onrender.com/submit", {
      method: "POST",
      body: formData,
     // credentials: "include" // only if you need cookies
    })
    .then(response => {
      if (!response.ok) {
        reject("Server returned " + response.status);
      }
      return response.json();
    })
    .then(data => resolve(data))
    .catch(error => reject(error));
  });
}

// Usage
document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(this);

  sendForm(formData)
    .then(data => {
      console.log("Server response:", data);
      alert("✅ " + data.message);
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Failed: " + "Server Error!, please try later");
    });
});

// // Ping function
// function pingRender() {
//   fetch("https://mysqft-crm.onrender.com/ping")
//     .then(res => console.log("Ping OK:", res.status))
//     .catch(err => console.error("Ping failed:", err));
// }

// // Run immediately once
// pingRender();

// // Then run every 5 minutes (300000 ms)
// setInterval(pingRender, 300000);
