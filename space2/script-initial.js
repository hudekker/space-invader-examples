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

// Color constants for alien characters
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions dynamically
canvas.width = window.innerWidth - 100; // Set canvas width to the width of the window
canvas.height = window.innerHeight - 100; // Set canvas height to the height of the window


// Alien variables
const maxRows = 6; // Maximum number of rows
const rowSpacing = 80; // Increased vertical spacing between rows
const colSpacing = 60; // Horizontal spacing between aliens
const alienWidth = 60; // Width of each alien
const alienHeight = 50; // Height of each alien

const availableWidth = canvas.width / 2;
const numCols = Math.floor(availableWidth / (alienWidth + colSpacing));

let alienSpeed = 0.5; // Speed of alien movement (change to let)
let flagEase = false;
let boolArmDown = true;
let initRows = 3;
let numRows = initRows; // Number of rows initially

const explosionFrames = 50;
let explosions = [];

// Player variables
const shipSize = 40;
const shipWidth = 40;
const bullets = [];
let maxBullets = 4;

const bulletWidth = 4; // Adjust the size as needed
const bulletHeight = 20; // Adjust the size as needed
const bulletSpeed = 5; // Adjust the speed as needed
const bulletLeftColor = "crimson";
const bulletRightColor = "crimson";

let leftArrowPressed = false;
let rightArrowPressed = false;
let aKeyPressed = false;
let shipX = canvas.width / 2;
let shipY = canvas.height - 50;

window.addEventListener("resize", () => {
  // Update canvas dimensions on window resize
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;
});




