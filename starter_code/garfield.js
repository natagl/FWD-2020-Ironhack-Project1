window.onload = function () {

  //Get the canvas element
  var canvas = document.getElementById("canvas");
  console.log(canvas);

  //Set position and size of canvas
  canvas.style.position = 'center';
  canvas.width = 800;
  canvas.height = 600;

  //Get the context from canvas
  var ctx = canvas.getContext('2d');
  console.log(ctx);

  document.getElementById("start-button").onclick = function () {
    startGame();
  };


function startGame() {
  console.log("startGame");
  drawBoard();
  drawCat();


}

// Draw the main Board
function drawBoard() {

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let img = new Image();
  img.src = './images/background.png';
  let backgroundImage = {
    img: img,
    x: 0,
    speed: -1,

    move: function () {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function () {
      ctx.drawImage(this.img, this.x, 0, canvas.height, canvas.width);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
  };

  function updateCanvas() {
    backgroundImage.move();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    drawCat()
    requestAnimationFrame(updateCanvas);

  }

  // start calling updateCanvas once the image is loaded
  img.onload = updateCanvas;

}

this.cat = {
  x: canvas.width / 2 - 30,
  y: canvas.height * 3 / 4 - 150,
  width: 200,
  height: 200,
  moveUp: () => 
    cat.y-=100,
  moveDown: () =>
    cat.y+=100,
  moveRight: () =>
   canvas.width+=100,
   moveLeft: () =>
   canvas.width-+100

}
function drawCat() {
  let img1 = new this.Image();
  img1.src = 'images/garfieldEating.png';

  ctx.drawImage(img1, cat.x, cat.y, cat.width, cat.height); //draws the cat depending on the coords in the obj above 
}
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: cat.moveUp();    console.log('up',    cat); break;
    case 40: cat.moveDown();  console.log('down',  cat); break;
    case 37: cat.moveLeft();  console.log('left',  cat); break;
    case 39: cat.moveRight(); console.log('right', cat); break;
  }
}




