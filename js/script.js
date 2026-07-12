// =========================
// ELEMENTS
// =========================

const robot = document.querySelector(".robot");
const pupils = document.querySelectorAll(".pupil");
const statusText = document.querySelector(".status");
const indicators = document.querySelectorAll(".indicator");

// =========================
// EYES FOLLOW MOUSE
// =========================

document.addEventListener("mousemove", (e) => {
    pupils.forEach((pupil) => {
        const eye = pupil.parentElement;

        const eyeRect = eye.getBoundingClientRect();

        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(
            e.clientY - eyeCenterY,
            e.clientX - eyeCenterX
        );

        const moveX = Math.cos(angle) * 3;
        const moveY = Math.sin(angle) * 3;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// =========================
// STATUS SYSTEM
// =========================

const statuses = [
    "ONLINE",
    "SCANNING",
    "PROCESSING",
    "ANALYZING",
    "READY"
];

let statusIndex = 0;

setInterval(() => {
    if (!statusText) return;

    statusIndex++;

    if (statusIndex >= statuses.length) {
        statusIndex = 0;
    }

    statusText.textContent = statuses[statusIndex];
}, 3000);

// =========================
// RANDOM LED EFFECTS
// =========================

const ledColors = [
    "#22c55e",
    "#38bdf8",
    "#ef4444",
    "#f59e0b",
    "#a855f7"
];

setInterval(() => {
    indicators.forEach((indicator) => {
        const color =
            ledColors[Math.floor(Math.random() * ledColors.length)];

        indicator.style.background = color;
        indicator.style.boxShadow = `0 0 15px ${color}`;
    });
}, 1500);

// =========================
// ROBOT SPEAKS ON CLICK
// =========================

robot.addEventListener("click", () => {

    const phrases = [
        "Hello Human",
        "System Online",
        "How may I assist you",
        "Scanning Environment",
        "All Systems Operational",
        "Welcome Back",
        "Artificial Intelligence Activated"
    ];

    const phrase =
        phrases[Math.floor(Math.random() * phrases.length)];

    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(phrase);

        speech.rate = 1;
        speech.pitch = 1.1;
        speech.volume = 1;

        const mouth = document.querySelector(".mouth");

        speech.onstart = () => {
            mouth.classList.add("talking");
        };

        speech.onend = () => {
            mouth.classList.remove("talking");
        };

        speechSynthesis.speak(speech);
    }

    if (statusText) {
        statusText.textContent = phrase.toUpperCase();
    }

    robot.animate(
        [
            { transform: "translateY(0px)" },
            { transform: "translateY(-20px)" },
            { transform: "translateY(0px)" }
        ],
        {
            duration: 500,
            easing: "ease-out"
        }
    );
});

// =========================
// DOUBLE CLICK BOOST MODE
// =========================

robot.addEventListener("dblclick", () => {

    document.body.style.filter =
        "drop-shadow(0 0 30px #38bdf8)";

    if (statusText) {
        statusText.textContent = "BOOST MODE";
    }

    setTimeout(() => {
        document.body.style.filter = "";
    }, 3000);
});

// =========================
// IDLE DETECTION
// =========================

let idleTimer;

function setIdle() {
    if (statusText) {
        statusText.textContent = "IDLE";
    }
}

function resetIdleTimer() {

    clearTimeout(idleTimer);

    if (statusText) {
        statusText.textContent = "ONLINE";
    }

    idleTimer = setTimeout(setIdle, 10000);
}

document.addEventListener("mousemove", resetIdleTimer);
document.addEventListener("keydown", resetIdleTimer);
document.addEventListener("click", resetIdleTimer);

resetIdleTimer();

// =========================
// KEYBOARD COMMANDS
// =========================

document.addEventListener("keydown", (e) => {

    if (!statusText) return;

    switch (e.key.toLowerCase()) {

        case "a":
            statusText.textContent = "ANALYZING";
            break;

        case "s":
            statusText.textContent = "SCANNING";
            break;

        case "p":
            statusText.textContent = "PROCESSING";
            break;

        case "r":
            statusText.textContent = "READY";
            break;

        case "o":
            statusText.textContent = "ONLINE";
            break;
    }
});

// =========================
// STARTUP SEQUENCE
// =========================

window.addEventListener("load", () => {

    if (!statusText) return;

    const startup = [
        "BOOTING",
        "LOADING",
        "CONNECTING",
        "INITIALIZING",
        "ONLINE"
    ];

    let i = 0;

    const interval = setInterval(() => {

        statusText.textContent = startup[i];

        i++;

        if (i >= startup.length) {
            clearInterval(interval);
        }

    }, 800);
});

const screenValue = document.querySelector(".screen-value");

setInterval(() => {
    const value = Math.floor(Math.random() * 100);
    screenValue.textContent = value + "%";
}, 3000);


const particlesContainer = document.querySelector(".particles");

for (let i = 0; i < 50; i++) {
    const particle = document.createElement("span");

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration =
        5 + Math.random() * 10 + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particlesContainer.appendChild(particle);
}

const head = document.querySelector(".head");

document.addEventListener("mousemove", (e) => {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateY =
        ((e.clientX - centerX) / centerX) * 10;

    const rotateX =
        -((e.clientY - centerY) / centerY) * 10;

    head.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
