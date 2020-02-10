//Road attributes
let heightOfRoad = 100;
let heightfromBottomOfRoad = canvas.height - heightOfRoad + 40;
let garfieldGapFromRoad = heightfromBottomOfRoad - 140;

//Garfield object
let garfield = {
  x: 500,
  y: garfieldGapFromRoad,
  width: 150,
  height: 150,
  speedX: 0,
  speedY: 0,
  gravity: 0.1, //1
  gravitySpeed: 0.3, //2
  bounce: 0.2, //3

  //Garfield's Methods
  fall: function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  },

  hitBottom: function() {
    var rockbottom = canvas.height - this.height; //myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    }
  },

  moveUp: () => {
    //if(garfield.y >= 50)
    let int = setInterval(() => {
      garfield.y -= 15;
      if (garfield.y < -100) {
        clearInterval(int);
      }
    }, 5);
    // garfield.y-=250
  },

  moveDown: () => {
    if (garfield.y < garfieldGapFromRoad) {
      garfield.y += 50;
    }
  },

  moveRight: () => {
    if (garfield.x + garfield.width <= canvas.width - 10) {
      garfield.x += 50;
    }
  },

  moveLeft: () => {
    if (garfield.x >= 10)
      //TODO: change this number '10' in relation with canvas dimensions
      garfield.x -= 50;
  }
};
