const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");
const celebration = document.getElementById("celebration");
const slideText = document.getElementById("slideText");
const readyBtn = document.getElementById("readyBtn");

const casMusic = document.getElementById("casMusic");
const btsMusic = document.getElementById("btsMusic");
const yaySound = document.getElementById("yaySound");

let noCount = 0;
let sweetInterval;


const noMessages = [
    "Are you sure? 🥺",
    "Really sure??",
    "Please press yes 😭",
    "I'll bring snacks...",
    "I promise I’ll treat you like a princess 👑",
    "Okay this is your last chance..."
];

noBtn.addEventListener("click", () => {
    if (noCount < noMessages.length) {
        question.textContent = noMessages[noCount];
        noCount++;
    }

    if (noCount >= noMessages.length) {
        noBtn.style.display = "none";
        question.textContent = "Hehe… now you can only say yes 😌💖";
    }
});


function fadeInAudio(audio, duration = 2000) {
    audio.volume = 0;
    audio.play().catch(() => {});
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        audio.volume = Math.min(progress / duration, 1);
        if (progress < duration) {
            requestAnimationFrame(step);
        } else {
            audio.volume = 1;
        }
    }

    requestAnimationFrame(step);
}

function fadeOutAudio(audio, duration = 2000) {
    let start = null;
    const initialVolume = audio.volume;

    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        audio.volume = Math.max(initialVolume * (1 - progress / duration), 0);
        if (progress < duration) {
            requestAnimationFrame(step);
        } else {
            audio.volume = 0;
            audio.pause();
        }
    }

    requestAnimationFrame(step);
}


yesBtn.addEventListener("click", () => {
    document.getElementById("mainContainer").classList.add("hidden");
    celebration.classList.remove("hidden");

    startExperience();
});


function startExperience() {
    casMusic.currentTime = 0;
    fadeInAudio(casMusic, 2000); // CAS music fade in
    yaySound.currentTime = 0;
    fadeInAudio(yaySound, 500);  // small celebration sound
    startSweetSlides();           // start message slides
}


const sweetSlides = [
    "YAYYYYYY 🎉💖",

    "Best Valentine ever I LOVE YOOUU!! 🥰"
];

function startSweetSlides() {
    let index = 0;
    slideText.textContent = sweetSlides[index];

    sweetInterval = setInterval(() => {
        index++;
        if (index >= sweetSlides.length) {
            clearInterval(sweetInterval);
            readyBtn.classList.remove("hidden");
            return;
        }
        slideText.textContent = sweetSlides[index];
    }, 2500);
}


readyBtn.addEventListener("click", () => {
    readyBtn.classList.add("hidden");


    casMusic.pause();
    casMusic.volume = 0;
    yaySound.pause();
    yaySound.volume = 0;

    setTimeout(() => {
        btsMusic.currentTime = 0; // reset BTS music
        fadeInAudio(btsMusic, 2000); // fade in BTS music
        slideText.textContent = "BTS Song Time! 🎶💜 Enjoy beautiful!";
    }, 2000);
});


