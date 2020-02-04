//Step 1 : Get the canvas element
var canvas = document.getElementById("canvas");
console.log(canvas);

//1.1 Set position and size of canvas
canvas.style.position = 'center';
canvas.width = 1200;
canvas.height = 600;

//Step 2 : Get the context from canvas
var ctx = canvas.getContext('2d');
console.log(ctx);

//Step 3 : define all img
let garfield = new Image();
let bg = new Image();
let bird = new Image();
let cactus= new Image();
let donut = new Image();
let ground = new Image();

garfield.src = 'images/garfieldEating.png';
bg.src = 'images/background.jpg';
bird.src = 'images/bird.png';
cactus.src = 'images/cactus.png';
//ground.src = 'images/';
//donut.src = 'images/';

//Step 3 : draw function
function draw(){
  ctx.drawImage(bg,0,0, canvas.width, canvas.height);
  ctx.drawImage(garfield,500,450, 120,120);
  ctx.drawImage(cactus, 670, 400, 160,160);
  ctx.drawImage(bird,670,100,100,100);

  window.requestAnimationFrame(draw);
}

//Entry point for the game
document.getElementById("start-button").onclick = function () {
  draw();
};





