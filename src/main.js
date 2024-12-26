import './style.css';
import { resources } from './Resource.js';
import { Sprite } from './Sprite.js';
import { Vector2 } from './Vector2.js';
import { GameLoop } from './GameLoop.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const seaMusic = new Audio("/sprites/seamusic.mp3");
const oceanMusic = new Audio("/sprites/oceanmusic2.mp3");
const backgroundMusic = new Audio("/sprites/bubble.mp3");
const backgroundMusic2 = new Audio("/sprites/bubble2.mp3");
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
  if(currentIndex == 0){
    if (mousePos.x > 980 && mousePos.x < 1070 && mousePos.y < 435 && mousePos.y > 340) {
      seaMusic.pause();
      seaMusic.currentTime = 0;
      backgroundMusic2.play();
      oceanMusic.play();
      currentIndex = (currentIndex + 1) % sprites.length;}}
  else{
    if(currentIndex == 2){
      currentIndex = (currentIndex + 2) % sprites.length;
      backgroundMusic.play();
      oceanMusic.play();}
    
    else{
    currentIndex = (currentIndex + 1) % sprites.length;
    backgroundMusic.play();
    oceanMusic.play();}}
});

window.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.key === "A") {
      if(hookCounter > 500 && hookaxis > -250){
        hookaxis = hookaxis - 12;
        hookLeftorRight = 1;}
      console.log("A key pressed");

  } else if (event.key === "d" || event.key === "D") {
    if(hookCounter > 500 && hookaxis < 410){
      hookaxis = hookaxis + 12;
      hookLeftorRight = 0;}
      console.log("D key pressed");
    }
    else if (event.key === "w" || event.key === "W") {
      if(hookCounter > 500 && hookaxis2 > -120){
        hookaxis2 = hookaxis2 - 12;}
      console.log("W key pressed");

  } else if (event.key === "s" || event.key === "S") {
    if(hookCounter > 500 && hookaxis2 < 185){
      hookaxis2 = hookaxis2 + 12;}
      console.log("S key pressed");
    }
  else if (event.key === "ArrowLeft") {
    if(hookCounter > 500 && hookaxis > -250){
      hookaxis = hookaxis - 12;
      hookLeftorRight = 1;}
      console.log("left arrow key pressed");
    }
    else if (event.key === "ArrowRight") {
      if(hookCounter > 500 && hookaxis < 410){
      hookaxis = hookaxis + 12;
      hookLeftorRight = 0;}
      console.log("right Arrow key pressed");
    }
    else if (event.key === "ArrowUp") {
      if(hookCounter > 500 && hookaxis2 > -120){
        hookaxis2 = hookaxis2 - 12;}
      console.log("W key pressed");
    }
      else if (event.key === "ArrowDown") {
        if(hookCounter > 500 && hookaxis2 < 185){
      hookaxis2 = hookaxis2 + 12;}
      console.log("S key pressed");
    }
  });

const sprites = [
  new Sprite({ resource: resources.images.intro }),
  new Sprite({ resource: resources.images.start }),
  new Sprite({ resource: resources.images.background }),

];

const blueglowSprite = new Sprite({
    resource: resources.images.blueglow,
});

const intro2Sprite = new Sprite({
  resource: resources.images.intro2,
});

const whitepageSprite = new Sprite({
  resource: resources.images.whitepage,
});

const hookSprite = new Sprite({
  resource: resources.images.hook,
});

const hook2Sprite = new Sprite({
  resource: resources.images.hook2,
});

const redglowSprite = new Sprite({
  resource: resources.images.redglow,
});


// Update logic
const update = (dt) => {
  if(currentIndex == 2){
  if(hookCounter < 500){
    hookCounter = hookCounter + hookSpeed;}
  hookSpeed = hookSpeed + .0004;
  if(loopCounter < 14500){
    loopCounter = loopCounter + loopSpeed;}
  loopSpeed = loopSpeed + .0004;}
  // Game state updates (nothing here for now)
};

// Render logic
const render = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const currentSprite = sprites[currentIndex];


  if (currentIndex === 0) {
    if (mousePos.x > 980 && mousePos.x < 1070 && mousePos.y < 435 && mousePos.y > 340) {
        // Draw intro2Sprite if mouse is in the specified range
        intro2Sprite.drawImage(ctx, canvas.width / 2 - 350, canvas.height / 2 - 300, 700, 400);
        redglowSprite.drawImage(ctx, canvas.width / 2.3  + redglowx, canvas.height / 3 + redglowy, 250, 140);
        if(redglowx > 340){redglowxbool = false;}
        if(redglowx < -340){redglowxbool = true;}
        if(redglowy > 180){redglowybool = false;}
        if(redglowy < -200){redglowybool = true;}

        if(redglowxbool == true){redglowx = redglowx + 1;}
        if(redglowxbool == false){redglowx = redglowx - 1;}
        if(redglowybool == true){redglowy = redglowy + 1;}
        if(redglowybool == false){redglowy = redglowy - 1;}


    } else {
        // Otherwise, draw currentSprite
        currentSprite.drawImage(ctx, canvas.width / 2 - 350, canvas.height / 2 - 300, 700, 400);
        redglowSprite.drawImage(ctx, canvas.width /2.3 + redglowx, canvas.height / 3 + redglowy, 250, 140);
        if(redglowx > 350){redglowxbool = false;}
        if(redglowx < -335){redglowxbool = true;}
        if(redglowy > 170){redglowybool = false;}
        if(redglowy < -205){redglowybool = true;}

        if(redglowxbool == true){redglowx = redglowx + 1;}
        if(redglowxbool == false){redglowx = redglowx - 1;}
        if(redglowybool == true){redglowy = redglowy + 1;}
        if(redglowybool == false){redglowy = redglowy - 1;}
    }
}


  if(currentIndex == 1){
    loopCounter = 0;
    loopSpeed = 3;
    hookCounter = 0;
    hookSpeed = 3;
    hookaxis = 0;
    hookaxis2 = 0;
    currentSprite.drawImage(ctx, canvas.width / 2 - 350 , canvas.height / 2 - 300, 700, 444);
    hook2Sprite.drawImage(ctx, canvas.width / 2 - 118 + hookaxis, canvas.height / 2 - 22 - hookCounter + hookaxis2, 70, 436);
    const time = performance.now() * 0.002;
    const r = Math.floor((Math.sin(time) + 1) * 127); 
    const g = Math.floor((Math.sin(time + 2) + 1) * 127);
    const b = Math.floor((Math.sin(time + 4) + 1) * 127);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.font = "35px Arial";
    const text = `Click to Begin`;
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, canvas.width / 2 - 95, canvas.height / 2 - 80);

    ctx.fillStyle = `black`;
    ctx.font = "10px Arial";
    const text2 = `Wisdom is not an answer, but a question`;
    const textWidth2 = ctx.measureText(text2).width;
    ctx.fillText(text2, canvas.width / 2 - 90, canvas.height / 2 + 93);
    }

if (currentIndex === 2) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background sprite
    currentSprite.drawImage(ctx, canvas.width / 2 - 350, canvas.height / 2 - 300, 700, 444);

    // Calculate the angle between the hook's top and the mouse
    const angle = Math.atan2(
        mousePos.y - canvas.height / 2,
        mousePos.x - canvas.width / 2
    );

    ctx.save();

    // Hook's position
    const hookX = canvas.width / 2 - 4;
    const hookY = canvas.height / 2 - 222;

    // Hook image dimensions
    const hookWidth = hookSprite.resource.image.naturalWidth;
    const hookHeight = hookSprite.resource.image.naturalHeight;

    // Translate to the top of the hook (attachment point)
    ctx.translate(hookX, hookY); // Move to the hook's position
    ctx.rotate(angle - Math.PI / 2);
    ctx.translate(0, 0);        // The top of the image is the rotation point

    // Draw the hook sprite
    hookSprite.drawImage(ctx, -hookWidth / 2, 0); // Centered horizontally at the top

    ctx.restore();

    // Ensure the video is displayed and playing
    videoEl.style.display = "block";
    videoEl.play().catch(err => console.error("Video play error:", err));
} else {
    videoEl.style.display = "none";
    videoEl.pause();
    videoEl.currentTime = 0;
}


  
    

    
  blueglowSprite.drawImage(ctx, mousePos.x - 70, mousePos.y - 66, 150, 150);
  whitepageSprite.drawImage(ctx, canvas.width / 2 - 350, canvas.height / 2 + 100, 700, 400);
  whitepageSprite.drawImage(ctx, canvas.width / 2 - 350, canvas.height / 2 - 700, 700, 400);

  ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    const text = `X: ${Math.round(mousePos.x)} Y: ${Math.round(mousePos.y)}`;
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, canvas.width - textWidth - 10, 30);
};



const waitForResources = setInterval(() => {
  const allLoaded = Object.values(resources.images).every((img) => img.isLoaded);
  if (allLoaded) {
    clearInterval(waitForResources);
    console.log("All resources loaded. Starting animation...");
    if (currentIndex == 0) {
      seaMusic.play();
    } else if (currentIndex == 1) {
      oceanMusic.play();
    }
    // Start game loop
    const gameLoop = new GameLoop(update, render);
    gameLoop.start();
  }
}, 100);




////////////////////////////////////////

