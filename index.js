/* MOBILE MENU */
function toggleMenu() {
    document.querySelector("nav").classList.toggle("show");
}

/* THEME */
const body = document.body;
const icon = document.getElementById("theme-icon");

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
