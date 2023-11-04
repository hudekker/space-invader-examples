// const numCols = 5; // Number of columns (aliens per row)

const createAlien = (ctx, x, y, brightColor, darkColor, eyeColor, boolArmDown, direction) => {
  const enemyWidth = 50;
  const enemyHeight = 40; // Reduced height by half

  if (!isFinite(x) || !isFinite(y)) {
    console.log(x);
    console.log(y);
    // debugger;
    // x = 0;
    // y = 0;
  }

  // Create a radial gradient for the body of the spaceship
  const gradient = ctx.createRadialGradient(x + enemyWidth / 2, y, 10, x + enemyWidth / 2, y, enemyWidth);
  gradient.addColorStop(0, darkColor);
  gradient.addColorStop(0.5, brightColor);
  gradient.addColorStop(1, brightColor);

  // Draw the dome-shaped head with gradient fill
  ctx.beginPath();
  ctx.moveTo(x + enemyWidth / 2, y);
  ctx.arc(x + enemyWidth / 2, y, enemyWidth / 2, Math.PI, 0);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();

  // Draw the rectangular body
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + enemyWidth, y);
  ctx.lineTo(x + enemyWidth, y + enemyHeight);
  ctx.lineTo(x, y + enemyHeight);
  ctx.lineTo(x, y);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();

  // Eyes (centered vertically)
  const eyeY = y + 10;
  ctx.beginPath();
  ctx.arc(x + 15, eyeY, 5, 0, Math.PI * 2);
  ctx.arc(x + 35, eyeY, 5, 0, Math.PI * 2);
  ctx.fillStyle = eyeColor; // Color of the eyes
  ctx.fill();
  ctx.closePath();

  // Black pupils
  const pupilXOffset = direction > 0 ? 2 : -2; // Adjust the X offset for the direction
  const pupilOffsetY = boolArmDown ? 1 : -1;
  ctx.beginPath();
  ctx.arc(x + 15 + pupilXOffset, eyeY + pupilOffsetY, 2, 0, Math.PI * 2);
  ctx.arc(x + 35 + pupilXOffset, eyeY + pupilOffsetY, 2, 0, Math.PI * 2);
  ctx.fillStyle = "black"; // Color of the pupils
  ctx.fill();
  ctx.closePath();

  // Skinny arms (centered vertically)
  const armY = y + 15;
  const armOffset = boolArmDown ? 20 : -20;
  ctx.beginPath();
  ctx.moveTo(x - 5, armY);
  ctx.lineTo(x - 15, armY + armOffset);
  ctx.moveTo(x + enemyWidth + 5, armY);
  ctx.lineTo(x + enemyWidth + 15, armY + armOffset);
  ctx.strokeStyle = "red"; // Color of the arms
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();
}

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
  console.log('ease');
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


const moveAliens = () => {
  // Check for collisions
  let collisionWall = false;

  for (const alien of aliens) {
    // Draw the alien at its current position
    // Move aliens
    createAlien(ctx, alien.x, alien.y, alien.darkColor, alien.brightColor, WHITE, boolArmDown, alienSpeed);

    // Update the position of the alien to move to the right
    if (!flagEase) {
      alien.x += alienSpeed;

      // alien.x = alien.x < 0 ? 0 : alien.x;
      // alien.x = (alien.x + alienWidth > canvas.width) ? alien.x = (canvas.width - alienWidth) : alien.x;
      console.log('not ease');
      console.log(alien.x, alien.y);
    } else {
      console.log('ease');
      console.log(alien.x, alien.y);
    }

    if (flagEase && alien.x == 0) {
      debugger;
    }

    // Check if the alien has reached the right edge of the screen
    if (alien.x + alienWidth > canvas.width) {
      // Reverse direction, set the collision flag, and add a new row at the top
      alien.x = canvas.width - alienWidth;
      alienSpeed = -alienSpeed;
      collisionWall = true;
    }

    // Check if the alien has reached the left edge of the screen
    if (alien.x < 0) {
      // Reverse direction, set the collision flag, and add a new row at the top
      alien.x = 0;
      alienSpeed = -alienSpeed;
      collisionWall = true;
    }

    // console.log(alien.x);
  }

  // If a collision is detected, move all rows down
  if (collisionWall) {
    collisionWall = false;
    if (numRows < maxRows) {
      addNewRow();
    }

    moveAllRowsDownWithEasing();
  }
}