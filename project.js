const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("canvas-box-screen");
const gameOverScreen = document.getElementById("game-over-screen");

let cups = 0;

class Game {
  constructor() {
    this.ctx = null;
    this.bg = null;
    this.player = null;
    this.interval = null;
  }

  startGame() {
    obstacles = [];
    const canvas = document.querySelector("#canvas");
    this.ctx = canvas.getContext("2d");
    const santa = new Santa(100, 120, 200, 600);
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
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameOverScreen.style.display = "none";
  }

  drawPlayer() {
    this.player.drawSanta();
  }

  updateCanvas() {
    this.ctx.clearRect(0, 0, 430, 800); // --> garanty that canvas would be cleared and everything will draw on a new canvas
    this.ctx.drawImage(this.bg, 0, 0, 430, 800);
    updateObstacles();
    updatePoints();
    this.drawPlayer();
    // console.log(obstacles);
    for (let i = 0; i < obstacles.length; i++) {
      // !!!would like to make it as a method, but it doesn't work
      // console.log(this.detectCollisions(this.player, obstacles[i]));
      if (this.detectCollisions(this.player, obstacles[i]) === true) {
        this.stopGame();
      }
      // this.detectCollisions(this.player, obstacles[i]);
    }

    for (let i = 0; i < points.length; i++) {
      if (this.detectCollisions(this.player, points[i]) === true) {
        // this.collectedCups(cups);

        cups++;

        // points.splice(points.indexOf(points), 1);
        points.splice(points[i], 1);
      }
    }

    // this.checkGameOver();
    this.gameTimer();
    this.collectedCups();
  }

  // checkGameOver() {
  //   const crashed = (obstacle) => {
  //     for (let i = 0; i < obstacles.length; i++) {
  //       this.detectCollisions(this.player, obstacles[i]);
  //     }
  //   };

  //   if (crashed) {
  //     this.stopGame();
  //   }
  // }

  detectCollisions(rectOne, rectTwo) {
    let x1 = rectOne.posX,
      y1 = rectOne.posY,
      height1 = rectOne.height,
      width1 = rectOne.width;
    let x2 = rectTwo.posX,
      y2 = rectTwo.posY,
      height2 = rectTwo.height,
      width2 = rectTwo.width;
    return (
      x1 < x2 + width2 &&
      x2 < x1 + width1 &&
      y1 < y2 + height2 &&
      y2 < y1 + height1
    );
  }

  // detectCollisions() {
  //     let objectSanta = this.player;
  //     let gameObjects = [objectSanta, [obstacles]];
  //     // Reset collision state of all objects
  //     for (let i = 0; i < gameObjects.length; i++) {
  //       for (let j = 0; j < obstacles.length; j++){
  //         gameObjects[i].isColliding = false;
  //       }}
  //       // Start checking for collisions
  //       for (let i = 0; i < gameObjects.length; i++) {
  //         for (let j = 0; j < obstacles.length; j++){
  //           gameObjects[i].isColliding = false;
  //         }}
  //         // Compare object1 with object2
  //         if (
  //           rectIntersect(
  //             obj1.x,
  //             obj1.y,
  //             obj1.width,
  //             obj1.height,
  //             obj2.x,
  //             obj2.y,
  //             obj2.width,
  //             obj2.height
  //           )
  //         ) {
  //           obj1.isColliding = true;
  //           obj2.isColliding = true;
  //         }
  //       }
  //     }
  //   }

  stopGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    clearInterval(this.interval);
  }

  gameTimer() {
    const timer = Math.floor(time / 100);
    this.ctx.font = "22px 'Roboto', sans-serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Timer: ${timer}`, 300, 50);
  }

  collectedCups() {
    // const cups = 0;
    this.ctx.font = "22px 'Roboto', sans-serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Cups: ${cups}`, 300, 100);
  }
}

class Santa {
  constructor(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    // this.speedX = speedX;
    // this.speedY = speedY;
    this.img = this.createSanta();
  }

  createSanta() {
    const santa = new Image();
    santa.src = "./images/santa-with-tree.png";
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
  moveDown() {
    this.posY += 10;
  }

  move(event) {
    switch (event) {
      case "ArrowRight":
        if (this.posX <= 320) this.moveRight();
        break;
      case "ArrowLeft":
        if (this.posX >= 10) this.moveLeft();
        break;
      case "ArrowUp":
        if (this.posY >= 0) this.moveUp();
        break;
      case "ArrowDown":
        if (this.posY <= 599) this.moveDown();
        break;
    }
  }
}

class MyObstacles extends Santa {
  constructor(width, height, posX, posY) {
    super(width, height, posX, posY);
    this.id = "obstacle";
    this.element = this.createObstacles();
    // добавить speed
  }

  createObstacles() {
    const element = new Image();
    element.src = "./images/snowball-1.png";
    ctx.drawImage(element, this.posX, this.posY, this.width, this.height);
    return element;
  }
  drawObstacles() {
    ctx.drawImage(this.element, this.posX, this.posY, this.width, this.height);
  }
}

let time = 0;

let obstacles = [];
function updateObstacles() {
  for (i = 0; i < obstacles.length; i++) {
    //to move the obstacles, just adding sth to the y axis. To make it more difficult, we need add more
    obstacles[i].posY += 1;
    obstacles[i].drawObstacles();
  }
  time++;
  if (time % 400 === 0) {
    let x = 430;
    let minGap = 0;
    let maxGap = 330;
    let gap = Math.floor(Math.random() * (maxGap + minGap - 1) + minGap);
    obstacles.push(new MyObstacles(100, 100, gap, -100));
    // console.log(obstacles);
  }
}

class MyPoints {
  constructor(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.img = this.createPoints();
    this.id = "hot-wine-cups";
  }

  createPoints() {
    const point = new Image();
    point.src = "./images/hot-wine-cup.png";
    this.img = point;
    ctx.drawImage(point, this.posX, this.posY, this.width, this.height);
    return point;
  }
  drawPoints() {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
  }
}

let points = [];
function updatePoints() {
  for (i = 0; i < points.length; i++) {
    points[i].posY += 1;
    points[i].drawPoints();
  }

  if (time % 800 === 0) {
    let minGap = 50;
    let maxGap = 350;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 10) + minGap);
    points.push(new MyPoints(30, 50, gap, -30));
    console.log(points);
  }
}

window.onload = () => {
  document.querySelectorAll(".start-btn")[0].onclick = () => {
    const game = new Game();
    game.startGame();
    document.addEventListener("keydown", (e) => {
      game.player.move(e.key);
      // console.log(e.key);
    });
    document.querySelectorAll(".start-btn")[1].onclick = () => {
      const game = new Game();
      game.startGame();
      document.addEventListener("keydown", (e) => {
        game.player.move(e.key);
        // console.log(e.key);
      });
      return game;
    };
  };
};

// window.onload = () => {
//   document.getElementsByClassName("start-btn").onclick = () => {
//     const game = new Game();
//     game.startGame();
//     document.addEventListener("keydown", (e) => {
//       game.player.move(e.key);
//       // console.log(e.key);
//     });
//     return game;
//   };
// };
