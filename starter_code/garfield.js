//Step 0 : Move the Menu, Start up image and Button
let startUp = document.getElementsByClassName("game-intro");

//Step 1 : Get the canvas element
let canvas = document.getElementById("canvas");
//console.log(canvas);

//1.1 Set position and size of canvas
canvas.style.position = 'center';
canvas.width = 1600;
canvas.height = 800;

//Step 2 : Get the context from canvas
var ctx = canvas.getContext('2d');
//console.log(ctx);

//Road attributes
let heightOfRoad = 100;
let heightfromBottomOfRoad = canvas.height-heightOfRoad+40;
let garfieldGapFromRoad = heightfromBottomOfRoad -140;

//Garfield object
let garfield = {
  x: 500,
  y: garfieldGapFromRoad,
  width: 150,
  height: 150,
  moveUp: () => {
    if(garfield.y >= 50)
    garfield.y-=50
  },
  moveDown: () => {
    if(garfield.y < garfieldGapFromRoad){
      garfield.y+=50;
    }
  },
  moveRight: () => {
    if(garfield.x+garfield.width <= canvas.width-10){
      garfield.x+=50;
    }
  },
  moveLeft: () => {
    if(garfield.x >= 10)//TODO: change this number '10' in relation with canvas dimensions
    garfield.x-=50
  }
}

//Step 3.1 : define all img
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

//Step 3.2 : define all audio files
let intro_audio = new Audio();
let gameStart_audio = new Audio();
let gamePlay_audio = new Audio();
let eat_audio = new Audio();
let die_audio = new Audio();

intro_audio.src ="sound/intro.mp3";
gameStart_audio.src ="sound/gameStart.mp3";
gamePlay_audio.src ="sound/gamePlay.mp3";
eat_audio.src ="sound/eat.mp3";
die_audio.src ="sound/die.mp3";

//Play the Intro Sound as soon as the page loads


window.onload = function() {  
  intro_audio.volume = 0.2;
  intro_audio.loop = true;
  intro_audio.play();
  let playPromise = intro_audio.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
    })
    .catch(error => {
      console.log(error);
       //Auto-play was prevented
       //Show paused UI.
    });
  }
}

//Step: 4: Create Obstacle Array
let obstacles = [];

//create first obstacle object
obstacles[0] = {
  x: canvas.width,
  y: canvas.height-(cactusImg.height*0.5)-50,
  img: cactusImg
}

//Variables to control obstacle height and width
//Cactus dimensions
let cactusImgWidth = cactusImg.width*0.3;
let cactusImgHeight = cactusImg.height*0.4;
const cactusHeightGap = 50;

//Bird dimensions
let birdImgWidth = birdImg.width*0.1;
let birdImgHeight = birdImg.height*0.1;
const birdHeightGap = 50;

let canvasWidthWhenToCreateNextObstacle = 1000;

let cactus = {
  x: canvas.width,
  y: canvas.height-(cactusImgHeight)-cactusHeightGap,
  img: cactusImg,
  type: 'cactus',
  width: cactusImgWidth,
  height: cactusImgHeight
}
let bird = {
  x: canvas.width,
  y: 0,
  img: birdImg,
  type: 'bird',
  width: birdImgWidth,
  height: birdImgHeight

}
let donut = {
  x: canvas.width,
  y: 0,
  img: donutImg,
  width: 60,
  height: 60,
  type:'donut'
} 
let frameId;

let allObstacles = [cactus, bird, donut]

function continuosObstacledraw(){
  for(let i = 0; i < obstacles.length ; i++){
    // console.log(obstacles, obstacles[i])
    if(obstacles[i].type == 'bird'){
      ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, obstacles[i].width, birdImgHeight);
    }
    if(obstacles[i].type == 'cactus'){
      ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, cactusImgWidth, cactusImgHeight);
    }
    if(obstacles[i].type == 'donut'){
      ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, donut.width, donut.height);
      restoreGlow()
    }

    obstacles[i].x = obstacles[i].x - 5;
    if(obstacles[i].x == canvasWidthWhenToCreateNextObstacle){

    }
  }
}

function startObs(){
  setInterval(()=>{
    let obstacle = {...allObstacles[Math.floor(Math.random()*allObstacles.length)]}
    //console.log(obstacle)
    if(obstacle.type == 'bird'){
      obstacle.y = Math.random()*(garfieldGapFromRoad);
    }
    if(obstacle.type == 'donut'){
      obstacle.y = Math.random()*(garfieldGapFromRoad);
      //console.log()
    }
    obstacles.push(obstacle)
  },1000)
}



//Step 4 adding event on key down(make it move with arrows)
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: 
      garfield.moveUp(); //console.log('up',    garfield);
        break;
    case 40: 
      garfield.moveDown();  //console.log('down',  garfield); 
        break;
    case 37: 
      garfield.moveLeft(); // console.log('left',  garfield); 
        break;
    case 39: 
      garfield.moveRight();// console.log('right', garfield); 
        break;
  }
}

function glowImg(glowLevel)
{
  ctx.shadowBlur = glowLevel;
  ctx.shadowColor = "white";
}

function restoreGlow()
{
  ctx.shadowBlur = 0;
}

let scoreBoard = document.querySelector('#score')
let score = 0;
let didCollide = false; 

//Step 3 : Draw Function
function draw(){  

  //console.log(obstacles)
  
  frameId = window.requestAnimationFrame(draw);

  checkCollision(garfield, obstacles);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  
 //ctx.fillStyle = "black";
  ctx.font = "bold 40px Lobster";  
  ctx.fillText("Score : " + score , (canvas.width / 2) - 17, (canvas.height / 2) -300);

  continuosObstacledraw();
  ctx.drawImage(roadImg, -120 , heightfromBottomOfRoad, 1800, heightOfRoad);

  glowImg(10);
  ctx.drawImage(garfieldImg, garfield.x, garfield.y, garfield.width, garfield.height);
  restoreGlow();
  
  if(didCollide === true){
    ctx.drawImage(gameOverImg, canvas.width/2-gameOverImg.width/2, canvas.height/2-gameOverImg.height/2, gameOverImg.width, gameOverImg.height);
    window.cancelAnimationFrame(frameId);
  }
 
}

function hideMenu(){
  for(var i = 0; i < startUp.length; i++)
  {
    startUp[i].style.display = 'none';
  }
}


//Todo: create a gap for cactus collision
function checkCollision(rect1, obstacles){
  obstacles && obstacles.forEach((rect2, index) => {
    if ((rect1.x < rect2.x + rect2.width - 5)  &&
        (rect1.x + rect1.width  > rect2.x - 10)  &&
        (rect1.y < rect2.y + rect2.height - 5) &&
        (rect1.y + rect1.height > rect2.y -5)) {              
          if(rect2.type == 'donut'){
            obstacles.splice(index, 1)
            score+=1;
            eat_audio.play();
          }else{
              didCollide = true;
              gamePlay_audio.pause();
              die_audio.play();
          }     
    }
  })
}

//Entry point for the game
document.getElementById("start-button").onclick = function () {
  //When clicked first, we will remove menu, image and buttons;
  hideMenu();
  //First, we stop the intro music
  intro_audio.pause();
  intro_audio.currentTime = 0;
  //And then play game Start Music
  gameStart_audio.volume = 0.2;
  gameStart_audio.play();
  //And wait 1.2 second and play game Play sound
  gamePlay_audio.loop = true;
  setTimeout("gamePlay_audio.play()",1200);

  draw();
  startObs()
  checkCollision();//Check if garfiels has hit an obstacle

 
};



