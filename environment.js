var images = [
  "images/garfieldEating.png",
  "images/background.jpg",
  "images/bird.png",
  "images/cactus.png",
  "images/donut.png",
  "images/road.png",
  "images/gameOver.png"
];
var loadedImages = {};
var promiseArray = images.map(function(imgurl) {
  var prom = new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      loadedImages[imgurl] = img;
      resolve();
    };
    img.src = imgurl;
  });
  return prom;
});

Promise.all(promiseArray).then(draw);

/*
function imagesLoaded(){
  //start canvas work.
  //when needing to draw image, access the loaded image in loadedImages
  ctx.drawImage(loadedImages['imageurl.jpg'], 300, 100);
}
*/

//Step 3.1 : define all img
/*
let garfieldImg = new Image();
let bg = new Image();
let birdImg = new Image();
let cactusImg = new Image();
let donutImg = new Image();
let roadImg = new Image();
let gameOverImg = new Image();
garfieldImg.src = 'images/garfieldEating.png';
bg.src = 'images/background.jpg';
birdImg.src = 'images/bird.png';
cactusImg.src = 'images/cactus.png';
donutImg.src = 'images/donut.png';
roadImg.src = 'images/road.png';
gameOverImg.src = 'images/gameOver.png';
*/

//Step 3.2 : define all audio files
let gameStart_audio = new Audio();
let gamePlay_audio = new Audio();
let eat_audio = new Audio();
let die_audio = new Audio();

gameStart_audio.src = "sound/gameStart.mp3";
gamePlay_audio.src = "sound/gamePlay.mp3";
eat_audio.src = "sound/eat.mp3";
die_audio.src = "sound/die.mp3";

// Variables to control obstacle height and width
//Cactus dimensions
let cactusImgWidth = 171;
let cactusImgHeight = 200;
const cactusHeightGap = 50;

//Bird dimensions
let birdImgWidth = 128;
let birdImgHeight = 128;
const birdHeightGap = 50;

let canvasWidthWhenToCreateNextObstacle = 1000;

let cactus = {
  x: canvas.width,
  y: canvas.height - cactusImgHeight - cactusHeightGap,
  img: loadedImages["images/cactus.png"],
  type: "cactus",
  width: cactusImgWidth,
  height: cactusImgHeight
};
let bird = {
  x: canvas.width,
  y: 0,
  img: loadedImages["images/bird.png"],
  type: "bird",
  width: birdImgWidth,
  height: birdImgHeight
};
let donut = {
  x: canvas.width,
  y: 0,
  img: loadedImages["images/donut.png"],
  width: 60,
  height: 60,
  type: "donut"
};

//Step: 4: Create Obstacle Array
let obstacles = [];
//create first obstacle object
obstacles[0] = {
  x: cactus.x,
  y: cactus.y,
  img: loadedImages["images/cactus.png"]
};

let frameId;

let allObstacles = [cactus, bird, donut];

function glowImg(glowLevel) {
  ctx.shadowBlur = glowLevel;
  ctx.shadowColor = "white";
}

function restoreGlow() {
  ctx.shadowBlur = 0;
}

let scoreBoard = document.querySelector("#score");
let score = 0;
