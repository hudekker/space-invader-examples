// Color constants for alien characters
const GREEN_BRIGHT = "#00FF00";
const GREEN_DARK = "#009900";

const PURPLE_BRIGHT = "#800080";
const PURPLE_DARK = "#400040";

const BLUE_BRIGHT = "#0000FF";
const BLUE_DARK = "#000099";

const RED_BRIGHT = "#FF0000";
const RED_DARK = "#990000";

const ORANGE_BRIGHT = "#FFA500";
const ORANGE_DARK = "#FF8000";
// Color constants
const BLACK = "black";
const WHITE = "white";

// Function to create an alien character
function createAlien(ctx, x, y, darkColor, brightColor, eyeColor) {
  const enemyWidth = 50;
  const enemyHeight = 40; // Reduced height by half

  // Create a radial gradient for the body of the spaceship
  const gradient = ctx.createRadialGradient(x + enemyWidth / 2, y, 10, x + enemyWidth / 2, y, enemyWidth);
  gradient.addColorStop(0, darkColor);
  gradient.addColorStop(1, brightColor);

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

  // Draw the dome-shaped head with gradient fill
  ctx.beginPath();
  ctx.moveTo(x + enemyWidth / 2, y);
  ctx.arc(x + enemyWidth / 2, y, enemyWidth / 2, Math.PI, 0);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();

  // Eyes (centered vertically)
  const eyeY = y + 10;
  ctx.beginPath();
  ctx.arc(x + 20, eyeY, 5, 0, Math.PI * 2);
  ctx.arc(x + 30, eyeY, 5, 0, Math.PI * 2);
  ctx.fillStyle = eyeColor; // Color of the eyes
  ctx.fill();
  ctx.closePath();

  // Skinny arms (centered vertically)
  const armY = y + 20;
  ctx.beginPath();
  ctx.moveTo(x - 5, armY);
  ctx.lineTo(x - 15, armY + 20);
  ctx.moveTo(x + enemyWidth + 5, armY);
  ctx.lineTo(x + enemyWidth + 15, armY + 20);
  ctx.strokeStyle = "red"; // Color of the arms
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// Example usage:
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

createAlien(context, 100, 200, GREEN_DARK, GREEN_BRIGHT, WHITE);
createAlien(context, 200, 200, PURPLE_DARK, PURPLE_BRIGHT, WHITE);
createAlien(context, 300, 200, BLUE_DARK, BLUE_BRIGHT, WHITE);
createAlien(context, 400, 200, RED_DARK, RED_BRIGHT, WHITE);
createAlien(context, 500, 200, ORANGE_DARK, ORANGE_BRIGHT, WHITE);
// ...and so on for other aliens
