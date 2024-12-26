import './style.css';
import { resources } from './Resource.js';
import { Sprite } from './Sprite.js';
import { Vector2 } from './Vector2.js';
import { GameLoop } from './GameLoop.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Updated paths to be relative to the current directory
const seaMusic = new Audio("./sprites/seamusic.mp3");
const oceanMusic = new Audio("./sprites/oceanmusic2.mp3");
const backgroundMusic = new Audio("./sprites/bubble.mp3");
const backgroundMusic2 = new Audio("./sprites/bubble2.mp3");
const videoEl = document.getElementById("myVideo");
console.log("videoEl is:", videoEl);

seaMusic.loop = true;
oceanMusic.loop = true;
seaMusic.volume = 0.3;
oceanMusic.volume = 0.6;
backgroundMusic.loop = false;
backgroundMusic2.loop = false;
backgroundMusic.volume = 0.5;
backgroundMusic2.volume = 0.5;

let mousePos = { x: 0, y: 0 };
let currentIndex = 0;
let loopCounter = 0; 
let loopSpeed = 3; 
let hookCounter = 0; 
let hookSpeed = 3; 
let hookaxis = 0; 
let hookaxis2 = 0;
let hookLeftorRight = 0; 
let redglowx = 0;
let redglowy = 0; 
let redglowxbool = true;
let redglowybool = true; 

// Get mouse position relative to the canvas
const getMousePos = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
};

const muteButton = document.getElementById("mute-button");
muteButton.addEventListener("click", () => {
    if (backgroundMusic.muted) {
        backgroundMusic.muted = false;
        seaMusic.muted = false;
        oceanMusic.muted = false;
        muteButton.textContent = "Mute";
    } else {
        backgroundMusic.muted = true;
        seaMusic.muted = true;
        oceanMusic.muted = true;
        muteButton.textContent = "Unmute";
    }
});

// Update mouse position on mousemove
canvas.addEventListener("mousemove", (event) => {
    mousePos = getMousePos(event);
});

// Set up mouse click event to transition to the next sprite
canvas.addEventListener("click", () => {
    if (currentIndex === 0) {
        if (mousePos.x > 980 && mousePos.x < 1070 && mousePos.y < 435 && mousePos.y > 340) {
            seaMusic.pause();
            seaMusic.currentTime = 0;
            backgroundMusic2.play();
            oceanMusic.play();
            currentIndex = (currentIndex + 1) % sprites.length;
        }
    } else {
        if (currentIndex === 2) {
            currentIndex = (currentIndex + 2) % sprites.length;
            backgroundMusic.play();
            oceanMusic.play();
        } else {
            currentIndex = (currentIndex + 1) % sprites.length;
            backgroundMusic.play();
            oceanMusic.play();
        }
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        if (hookCounter > 500 && hookaxis > -250) {
            hookaxis -= 12;
            hookLeftorRight = 1;
        }
    } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        if (hookCounter > 500 && hookaxis < 410) {
            hookaxis += 12;
            hookLeftorRight = 0;
        }
    } else if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
        if (hookCounter > 500 && hookaxis2 > -120) {
            hookaxis2 -= 12;
        }
    } else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
        if (hookCounter > 500 && hookaxis2 < 185) {
            hookaxis2 += 12;
        }
    }
});

const sprites = [
    new Sprite({ resource: resources.images.intro }),
    new Sprite({ resource: resources.images.start }),
    new Sprite({ resource: resources.images.background }),
];

// Other sprite declarations
const blueglowSprite = new Sprite({ resource: resources.images.blueglow });
const intro2Sprite = new Sprite({ resource: resources.images.intro2 });
const whitepageSprite = new Sprite({ resource: resources.images.whitepage });
const hookSprite = new Sprite({ resource: resources.images.hook });
const hook2Sprite = new Sprite({ resource: resources.images.hook2 });
const redglowSprite = new Sprite({ resource: resources.images.redglow });

// Update logic
const update = (dt) => {
    if (currentIndex === 2) {
        if (hookCounter < 500) hookCounter += hookSpeed;
        hookSpeed += 0.0004;
        if (loopCounter < 14500) loopCounter += loopSpeed;
        loopSpeed += 0.0004;
    }
};

// Render logic
const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentSprite = sprites[currentIndex];
    if (currentIndex === 0) {
        // Red glow effect logic
    } else if (currentIndex === 1) {
        // Draw intro sprite logic
    } else if (currentIndex === 2) {
        // Draw game logic
    }
};

// Start game loop when resources are loaded
const waitForResources = setInterval(() => {
    if (resources.isAllLoaded()) {
        clearInterval(waitForResources);
        const gameLoop = new GameLoop(update, render);
        gameLoop.start();
    }
}, 100);
