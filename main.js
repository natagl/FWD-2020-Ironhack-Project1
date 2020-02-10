//Step 0 : Move the Menu, Start up image and Button
let startUp = document.getElementsByClassName("game-intro");

//Step 1 : Get the canvas element
let canvas = document.getElementById("canvas");
//console.log(canvas);

//1.1 Set position and size of canvas
canvas.style.position = 'center';
canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100
//Step 2 : Get the context from canvas
var ctx = canvas.getContext('2d');
//console.log(ctx);


let playing = false; 

//Flag to determine if Garfield had collision with obstacles
let didCollide = false; 

//If 'Start Game' button is clicked, the menu will be hidden
function hideMenu(){
    for(var i = 0; i < startUp.length; i++)
    {
      startUp[i].style.display = 'none';
    }
    document.querySelector('canvas').style.display = 'block'
  
}

//Keep drawing obstacles
function continuosObstacledraw(){
    for(let i = 0; i < obstacles.length ; i++){
      if(obstacles[i].img.complete){
        // console.log(obstacles, obstacles[i])
        if(obstacles[i].type == 'bird'){
          ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, bird.width, bird.height);
        }
        if(obstacles[i].type == 'cactus'){
          ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, cactus.width, cactus.height);
        }
        if(obstacles[i].type == 'donut'){
          ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, donut.width, donut.height);
          restoreGlow()
        }
      }
  
      obstacles[i].x = obstacles[i].x - 5;      
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
    },2000) //how many obstacels
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
  
  //Step 3 : Draw Function
function draw(){  
   
  frameId = window.requestAnimationFrame(draw);
  
   checkCollision(garfield, obstacles);
   ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
   ctx.font = "bold 40px Lobster";  
   ctx.fillText("Score : " + score , (canvas.width) - 200, (canvas.height / 2) -100);
  
   continuosObstacledraw();
   ctx.drawImage(roadImg, -120 , heightfromBottomOfRoad, 1800, heightOfRoad);
  
    glowImg(10);
    garfield.fall() 
    ctx.drawImage(garfieldImg, garfield.x, garfield.y, garfield.width, garfield.height);
    restoreGlow();
    
    if(didCollide === true){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(gameOverImg, canvas.width/2-gameOverImg.width/2, canvas.height/2-gameOverImg.height/2, gameOverImg.width, gameOverImg.height);
        window.cancelAnimationFrame(frameId);
        reset();
    }
}
function reset (){
    
    let button = document.createElement('button');
    button.innerHTML = "HOME";
    let canvas = document.getElementsByTagName('body')[0]
    canvas.appendChild(button);
    button.addEventListener ("click", function() {
        window.location.replace('?q=restart')
    })
     
    list = [];
  
  }

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
  };
  
  //Entry point for the game
  document.getElementById("start-button").onclick = startGame;

  function startGame (){

    //When clicked first, we will remove menu, image and buttons;
    hideMenu();
   
    //Plays game Start Music
    gameStart_audio.volume = 0.2;
    gameStart_audio.play();
    
    gamePlay_audio.loop = true;
    setTimeout("gamePlay_audio.play()",1200);
    draw();
    startObs()
    checkCollision();//Check if garfiels has hit an obstacle

  };

     console.log(window.location.href)
    if(window.location.href.includes("restart")){
      setTimeout(function(){ ///use js event loop so this is in th end of the queue 
        document.querySelector('#start-button').click();
      },0)
    
  };
  