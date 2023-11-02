// Color constants for alien characters
const GREEN_BRIGHT = "#00FF00";
const GREEN_DARK = "#009900";

const PURPLE_BRIGHT = "plum";
const PURPLE_DARK = "mediumpurple";
// const PURPLE_BRIGHT = "#800080";
// const PURPLE_DARK = "#400040";

const BLUE_BRIGHT = "#3399FF";
const BLUE_DARK = "#0066CC";

const RED_BRIGHT = "#FF0000";
const RED_DARK = "#990000";

const ORANGE_BRIGHT = "lightsalmon";
const ORANGE_DARK = "orangered";
// const ORANGE_BRIGHT = "#FF9900";
// const ORANGE_DARK = "#FF6600";

// Color constants
const BLACK = "black";
const WHITE = "white";

function createAlien(ctx, x, y, brightColor, darkColor, eyeColor, boolArmDown, direction) {
  const enemyWidth = 50;
  const enemyHeight = 40; // Reduced height by half

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
