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
    "HAPPY VALENTINE'S DAY JASMINE!! 💘",
    "You are the most adorable person ever.",
    "Your jokes are literally the funniest.",
    "You make every day better.",
    "You're so gorgeous",
    "You deserve the whole world.",
    "I’m so lucky to have you in my life.",
    "I love you more than words can say.",
    "Thank you for being you.",
    "Your soft voice is my favorite sound in the world.",
    "I love how sweet you are without even trying.",
    "Your clingy side? YUP JASMINE that’s my favorite part 🥺",
    "You’re such a nerd and I absolutely love that about you.",
    "Independent, strong, and still the softest person ever.",
    "You understand me in ways nobody else really does.",
    "You'd probably beat me in pokemon cards and still look cute doing it.",
    "The way you talk about books, manga, and anime is so adorable.",
    "I admire how strong you were growing up.",
    "I’m proud of you for everything you’ve overcome.",
    "You deserve a love that feels safe and warm.",
    "And I promise to always protect your smile <3.",
    "Jasmine, you’re my favorite person in the whole world 💖",
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

