const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor() {
    this.ctx = null;
    this.bg = null;
    this.player = null;
    this.interval = null;
  }

  startGame() {
    const canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    const santa = new Santa(100, 100, 165, 600);
    this.player = santa; //will have all info about the player
    const background = new Image();
    background.src = "./images/background.png";
    background.onload = () => {
      this.bg = background;
      //It is important to perform the update() before the draw(), in order to draw always the latest state of the game to the canvas.
      this.updateCanvas();
      this.drawPlayer();
      this.interval = setInterval(() => {
        this.updateCanvas();
      }, 20);
    };
  }

  drawPlayer() {
    this.player.drawSanta();
  }

  updateCanvas() {
    // this.interval = setInterval(() => {
    this.ctx.clearRect(0, 0, 430, 800); // --> garanty that canvas would be cleared and everything will draw on a new canvas
    this.ctx.drawImage(this.bg, 0, 0, 430, 800);
    updateObstacles();
    this.drawPlayer();
    console.log(obstacles);
    for (let i = 0; i < obstacles.length; i++) {
      // console.log(this.player);
      // console.log(obstacles[i]);
      // console.log(detectCollisions(this.player, obstacles[i]));
      this.detectCollisions(this.player, obstacles[i]);
    }

    // checkGameOver();
    // }, 20);
  }

  detectCollisions(rectOne, rectTwo) {
    let x1 = rectOne.posX,
      y1 = rectOne.posY,
      height1 = rectOne.height,
      width1 = rectOne.width;
    let x2 = rectTwo.posX,
      y2 = rectTwo.posY,
      height2 = rectTwo.height,
      width2 = rectTwo.width;

    console.log(x1);
    console.log(y1);
    console.log(height1);
    console.log(width1);
    console.log(x2);
    console.log(y2);
    console.log(height2);
    console.log(width2);
    return (
      x1 < x2 + width2 &&
      x2 < x1 + width1 &&
      y1 < y2 + height2 &&
      y2 < y1 + height1
    );
  }

  stopGame() {
    clearInterval(this.interval);
  }
}

class Santa {
  constructor(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.img = this.createSanta();
  }

  createSanta() {
    const santa = new Image();
    santa.src = "./images/santa2.png";
    ctx.drawImage(santa, this.posX, this.posY, this.width, this.height);
    return santa;
  }

  drawSanta() {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
  }

  moveRight() {
    this.posX += 10;
  }
  moveLeft() {
    this.posX -= 10;
  }
  moveUp() {
    this.posY -= 10;
  }
  // moveDown() {
  //   this.posY += 10;
  // }

  move(event) {
    switch (event) {
      case "ArrowRight":
        if (this.posX <= 335) this.moveRight();
        break;
      case "ArrowLeft":
        if (this.posX >= -20) this.moveLeft();
        break;
      case "ArrowUp":
        if (this.posY >= 0) this.moveUp();
        break;
      // case "ArrowDown":
      //   if (this.posY <= 599) this.moveDown();
      //   break;
    }
  }
}

class MyObstacles extends Santa {
  constructor(width, height, posX, posY) {
    super(width, height, posX, posY);
    this.tree = this.createObstacles();
  }

  createObstacles() {
    const tree = new Image();
    tree.src = "./images/tree.png";
    ctx.drawImage(tree, this.posX, this.posY, this.width, this.height);
    return tree;
  }
}

let time = 0;

let obstacles = [];
function updateObstacles() {
  for (i = 0; i < obstacles.length; i++) {
    //to move the obstacles, just adding sth to the y axis. To make it more difficult, we need add more
    obstacles[i].posY += 1;
    obstacles[i].createObstacles();
  }
  time++;
  if (time % 200 === 0) {
    let x = 430;
    let minGap = 0;
    let maxGap = 280;
    let gap = Math.floor(Math.random() * (maxGap + minGap - 1) - minGap);
    obstacles.push(new MyObstacles(150, -150, gap, 0));
    // console.log(obstacles);
  }
}

// function detectCollisions() {
//   let objectSanta = game.santa;
//   let objectTree = obstacles[i];
//   for (let i = 0; i < obstacles.length; i++) {
//     // Start checking for collisions
//     objectSanta = this.player;
//     for (let j = i + 1; j < gameObjects.length; j++) {
//       obj2 = gameObjects[j];

//       // Compare object1 with object2
//       if (
//         rectIntersect(
//           obj1.x,
//           obj1.y,
//           obj1.width,
//           obj1.height,
//           obj2.x,
//           obj2.y,
//           obj2.width,
//           obj2.height
//         )
//       ) {
//         obj1.isColliding = true;
//         obj2.isColliding = true;
//       }
//     }
//   }
// }

// function detectCollisions(rectOne, rectTwo) {
//   let x1 = rectOne.posX,
//     y1 = rectOne.posY,
//     height1 = rectOne.height,
//     width1 = rectOne.width;
//   let x2 = rectTwo.posX,
//     y2 = rectTwo.posY,
//     height2 = rectTwo.height,
//     width2 = rectTwo.width;

//   console.log(x1);
//   console.log(y1);
//   console.log(height1);
//   console.log(width1);
//   console.log(x2);
//   console.log(y2);
//   console.log(height2);
//   console.log(width2);
//   return (
//     x1 < x2 + width2 &&
//     x2 < x1 + width1 &&
//     y1 < y2 + height2 &&
//     y2 < y1 + height1
//   );
// }

// function checkGameOver() {
//   const crashed = obstacles.some(function (obstacle) {
//     return this.santa.crashWith(obstacle);
//   });

//   if (crashed) {
//     this.game.stopGame();
//   }
// }

window.onload = () => {
  document.querySelector("#start-btn").onclick = () => {
    const game = new Game();
    game.startGame();
    document.addEventListener("keydown", (e) => {
      game.player.move(e.key);
      // console.log(e.key);
    });
    return game;
  };
};
