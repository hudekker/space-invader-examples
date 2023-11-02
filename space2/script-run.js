const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Set the canvas dimensions dynamically
canvas.width = window.innerWidth - 100; // Set canvas width to the width of the window
canvas.height = window.innerHeight - 100; // Set canvas height to the height of the window

window.addEventListener("resize", () => {
  // Update canvas dimensions on window resize
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;
});

// const numCols = 5; // Number of columns (aliens per row)
let initRows = 3;
let numRows = initRows; // Number of rows initially
const maxRows = 5; // Maximum number of rows
const rowSpacing = 80; // Increased vertical spacing between rows
const colSpacing = 60; // Horizontal spacing between aliens
const alienWidth = 60; // Width of each alien
const alienHeight = 50; // Height of each alien
let alienSpeed = 2; // Speed of alien movement (change to let)
let flagEase = false;
let boolArmDown = true;
const availableWidth = canvas.width / 2;
const numCols = Math.floor(availableWidth / (alienWidth + colSpacing));

// Function to toggle the boolean value
const toggleArms = () => {
  boolArmDown = !boolArmDown; // Toggle between true and false
};

// Set an interval to call the toggleBoolean function every 0.5 seconds (500 milliseconds)
const interval = setInterval(toggleArms, 500);

// Define the color constants
// const colors = [GREEN_DARK, PURPLE_DARK, BLUE_DARK, RED_DARK, ORANGE_DARK];
const colorPairs = [
  { bright: GREEN_BRIGHT, dark: GREEN_DARK },
  { bright: PURPLE_BRIGHT, dark: PURPLE_DARK },
  { bright: ORANGE_BRIGHT, dark: ORANGE_DARK },
  { bright: BLUE_BRIGHT, dark: BLUE_DARK },
  { bright: RED_BRIGHT, dark: RED_DARK },
];

// Initialize the aliens with their positions
const aliens = [];

// Initialize the first row
const initialXPositions = Array.from({ length: numCols }, (_, col) => col * (alienWidth + colSpacing));

// Function to shuffle an array randomly
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Helper function to initialize aliens for a row
const initializeAliensForRow = (y, xPositions, rowNum) => {
  shuffleArray(colorPairs);

  for (let col = 0; col < numCols; col++) {
    const colorPair = colorPairs[col % 5];
    aliens.push({ x: xPositions[col], y, darkColor: colorPair.dark, brightColor: colorPair.bright, row: rowNum, armY: 1 });
  }
};

// Function to add a new row at the top
const addNewRow = () => {
  const xPositions = Array.from(aliens.slice(-numCols), (alien) => alien.x);
  numRows++;
  initializeAliensForRow(50 - rowSpacing, xPositions, numRows);
};

// Function to move all rows down one level
const moveAllRowsDown = () => {
  for (const alien of aliens) {
    alien.y += rowSpacing;
  }
};

// Function to move all rows down one level with easing
const moveAllRowsDownWithEasing = () => {
  const frames = 20; // Number of frames for the easing effect
  const distanceToMove = rowSpacing / frames;

  // Keep track of the number of frames
  let frameCount = 0;

  const easingVerticalMove = () => {
    // Move each alien's y position
    for (const alien of aliens) {
      alien.y += distanceToMove;
    }

    frameCount++;

    // If not reached the desired frames, request another frame for the vertical easing effect
    if (frameCount < frames) {
      flagEase = true;
      requestAnimationFrame(easingVerticalMove);
    } else {
      flagEase = false;
      frameCount = 0;
    }
  };

  // Start the vertical easing effect
  easingVerticalMove();
};

for (let i = 0; i < initRows; i++) {
  initializeAliensForRow(rowSpacing * (i + 1) - 30, initialXPositions, i);
}

// Game loop
const gameLoop = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Check for collisions
  let collisionDetected = false;

  for (const alien of aliens) {
    // Draw the alien at its current position
    // Move aliens
    createAlien(context, alien.x, alien.y, alien.darkColor, alien.brightColor, WHITE, boolArmDown, alienSpeed);

    // Update the position of the alien to move to the right
    if (!flagEase) {
      alien.x += alienSpeed;
    }

    // Check if the alien has reached the right edge of the screen
    if (alien.x + alienWidth > canvas.width) {
      // Reverse direction, set the collision flag, and add a new row at the top
      alien.x = canvas.width - alienWidth;
      alienSpeed = -alienSpeed;
      collisionDetected = true;
    }

    // Check if the alien has reached the left edge of the screen
    if (alien.x < 0) {
      // Reverse direction, set the collision flag, and add a new row at the top
      alien.x = 0;
      alienSpeed = -alienSpeed;
      collisionDetected = true;
    }
  }

  // If a collision is detected, move all rows down
  if (collisionDetected) {
    collisionDetected = false;
    if (numRows < maxRows) {
      addNewRow();
    }

    moveAllRowsDownWithEasing();
  }

  requestAnimationFrame(gameLoop);
};

// Start the game loop
gameLoop();
