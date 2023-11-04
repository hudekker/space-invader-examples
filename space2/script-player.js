// Spaceshit bullet
class Bullet {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  update() {
    this.y -= bulletSpeed; // Bullets move upwards
  }

  draw() {
    ctx.fillStyle = this.color; // Color of the bullets
    ctx.fillRect(this.x, this.y, bulletWidth, bulletHeight);
  }
}

// Function to fire bullets from the spaceship's cannons
const fireBullet = () => {
  if (bullets.length >= maxBullets) return;

  // Calculate the initial position of each bullet at the tip of the cannons
  const leftCannonX = shipX - shipSize / 4 - 1;
  const rightCannonX = shipX + shipSize / 4 - 1;
  const cannonY = shipY - shipSize - 20; // Adjust the Y position as needed

  // Create a bullet for the left cannon
  const leftBullet = new Bullet(leftCannonX, cannonY, bulletWidth, bulletHeight, bulletLeftColor);
  // const leftBullet = { x: leftCannonX, y: cannonY, width: 2, height: 10, color: "red" };

  // Create a bullet for the right cannon
  const rightBullet = new Bullet(rightCannonX, cannonY, bulletWidth, bulletHeight, bulletRightColor);
  // const rightBullet = { x: rightCannonX, y: cannonY, width: 2, height: 10, color: "lime" };

  // Add the bullets to an array to keep track of them
  bullets.push(leftBullet);
  bullets.push(rightBullet);
};

// Draw the spaceship
const drawSpaceship = () => {
  // Create a linear gradient for the body of the spaceship
  const gradient = ctx.createLinearGradient(shipX, shipY, shipX, shipY - shipSize);
  gradient.addColorStop(0, "blue"); // Start color
  gradient.addColorStop(1, "lightblue"); // End color

  ctx.beginPath();

  // Body of the spaceship
  ctx.moveTo(shipX, shipY);
  ctx.lineTo(shipX - shipSize / 2, shipY - shipSize / 3);
  ctx.lineTo(shipX - shipSize / 4, shipY - shipSize);
  ctx.lineTo(shipX + shipSize / 4, shipY - shipSize);
  ctx.lineTo(shipX + shipSize / 2, shipY - shipSize / 3);

  // Cannons
  ctx.moveTo(shipX - shipSize / 4, shipY - shipSize);
  ctx.lineTo(shipX - shipSize / 4, shipY - shipSize - 10);
  ctx.moveTo(shipX + shipSize / 4, shipY - shipSize);
  ctx.lineTo(shipX + shipSize / 4, shipY - shipSize - 10);

  // Draw the spaceship with strokes and fills
  ctx.strokeStyle = "black"; // White outline
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "silver"; // Blue body
  ctx.fillStyle = gradient;
  ctx.fill();
};

// move the player spaceship
const movePlayer = () => {

  // Check the flags for arrow key presses and move the ship accordingly
  if (leftArrowPressed && shipX > 0) {
    shipX -= 5;
  } else if (rightArrowPressed && shipX < canvas.width - shipWidth) {
    shipX += 5;
  }

  // Update and draw the spaceship
  drawSpaceship();

  // Update and draw the bullets
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].draw();

    // Remove bullets that are out of the canvas
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      i--;
    }
  }
}

