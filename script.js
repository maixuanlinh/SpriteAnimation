// Initialize the player's animation state as 'idle'
let playerState = 'idle';

// Get the dropdown element by its ID and add a change event listener
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', (e) => {
  // Update the playerState with the value selected from the dropdown
  playerState = e.target.value;
});

// Access the canvas element by its ID and get the 2D drawing context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// Create an image object for the player and set its source to the sprite image
const playerImage = new Image();
playerImage.src = "shadow_dog.png";

// Define the width and height for each sprite frame
const spriteWidth = 575;
const spriteHeight = 523;

// Initialize a variable to count the game frames
let gameFrame = 0;

// Define the number of game frames to wait before changing the sprite frame
const staggerFrame = 5;

// Initialize an array to store the animations for each sprite state
const spriteAnimations = [];

// Define the various animation states and their frame counts
const animationStates = [
    {
      name: 'idle',
      frames: 7
    },
    {
      name: 'jump',
      frames: 7
    },
    {
      name: 'fall',
      frames: 7
    },
    {
      name: 'run',
      frames: 9
    },
    {
      name: 'dizzy',
      frames: 11
    },
    {
      name: 'sit',
      frames: 5
    },
    {
      name: 'roll',
      frames: 7
    },
    {
      name: 'bite',
      frames: 7
    },
    {
      name: 'ko',
      frames: 12
    },
    {
      name: 'getHit',
      frames: 4
    }
  ];

// Calculate the frame positions for each animation state
animationStates.forEach((state, index) => {
  let frames = { loc: [] };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);

// Function to handle the animation loop
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Calculate the current frame to display based on the gameFrame and staggerFrame
  let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
  let frameX = position * spriteWidth;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // Draw the current frame of the sprite on the canvas
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  // Increment the gameFrame counter
  gameFrame++;

  // Request the next frame of the animation
  requestAnimationFrame(animate);
}

// Start the animation
animate();
