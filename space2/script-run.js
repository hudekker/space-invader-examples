// Event listener for keydown
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      leftArrowPressed = true;
      break;
    case "ArrowRight":
      rightArrowPressed = true;
      break;
    case "a":
    case "A":
      aKeyPressed = true;
      fireBullet();
      // Fire a bullet here
      break;
    // Add cases for other keys as needed
  }
});

// Event listener for keyup
document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      leftArrowPressed = false;
      break;
    case "ArrowRight":
      rightArrowPressed = false;
      break;
    case "a":
    case "A":
      aKeyPressed = false;
      break;
    // Add cases for other keys as needed
  }
});

const checkCollisions = () => {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = aliens.length - 1; j >= 0; j--) {
      const bullet = bullets[i];
      const alien = aliens[j];

      // Check if the bullet is within the alien's boundaries
      if (
        bullet.x > alien.x &&
        bullet.x < alien.x + alienWidth &&
        bullet.y > alien.y &&
        bullet.y < alien.y + alienHeight
      ) {
        // Collision detected, remove the bullet
        bullets.splice(i, 1);

        // Destroy the alien with an explosion effect
        explosions.push({ x: alien.x, y: alien.y, frames: explosionFrames })

        // Remove the alien from the aliens array
        aliens.splice(j, 1);

        // Break out of the inner loop
        break;
      }
    }
  }
};

const drawExplosions = () => {
  for (let i = explosions.length - 1; i >= 0; i--) {
    let explosion = explosions[i];
    drawExplosion(explosion.x, explosion.y);
    explosion.frames--;

    if (explosion.frames < 0) {
      explosions.splice(i, 1)
    }
  }
};

// const drawExplosion = (x, y) => {
//   // Example of drawing a simple explosion effect (modify as needed):
//   ctx.fillStyle = "red";
//   ctx.beginPath();
//   ctx.arc(x + alienWidth / 2, y + alienHeight / 2, 20, 0, Math.PI * 2);
//   ctx.fill();
// };

// Draw the explosion-like shape when an alien is destroyed
function drawExplosion(x, y) {
  // Create a random pattern of jagged lines
  const numLines = 20;
  const lineWidth = 6;

  ctx.strokeStyle = "red"; // Color of the explosion lines
  ctx.lineWidth = lineWidth;

  for (let i = 0; i < numLines; i++) {
    const angle = (i / numLines) * Math.PI * 2;
    const length = Math.random() * 20 + 10; // Vary the length of lines
    const x1 = x + Math.cos(angle) * length;
    const y1 = y + Math.sin(angle) * length;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }
}


// Game loop
const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move the aliens
  moveAliens();

  // Move player
  movePlayer();

  // Check for collisions between bullets and aliens
  checkCollisions();

  // Draw explosions
  drawExplosions();

  requestAnimationFrame(gameLoop);
};

// Initialize first rows of aliens
for (let i = 0; i < initRows; i++) {
  initializeAliensForRow(rowSpacing * (i + 1) - 30, initialXPositions, i);
}

// Run the game loop
gameLoop();



