const drawBg = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 800);
  ctx.stroke();
  ctx.moveTo(3, 0);
  ctx.lineTo(3, 800);
  ctx.stroke();

  ctx.moveTo(56, 0);
  ctx.lineTo(56, 800);
  ctx.stroke();

  ctx.moveTo(109, 0);
  ctx.lineTo(109, 800);
  ctx.stroke();

  ctx.moveTo(162, 0);
  ctx.lineTo(162, 800);
  ctx.stroke();

  ctx.moveTo(215, 0);
  ctx.lineTo(215, 800);
  ctx.stroke();

  ctx.moveTo(268, 0);
  ctx.lineTo(268, 800);
  ctx.stroke();

  ctx.moveTo(321, 0);
  ctx.lineTo(321, 800);
  ctx.stroke();

  ctx.moveTo(374, 0);
  ctx.lineTo(374, 800);
  ctx.stroke();

  ctx.moveTo(426, 0);
  ctx.lineTo(426, 800);
  ctx.stroke();

  ctx.moveTo(427, 0);
  ctx.lineTo(427, 800);
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.closePath();
};

drawBg();

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor() {
    this.ctx = null;
    this.bg = null;
    this.player = null;
    this.time = 0;
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
      this.updateCanvas();
      this.drawPlayer();
    };
    // const tree = new MyObstacles(150, 150, -30, 0);
    // // console.log(tree);
    // // this.obstacles[0] = tree;
    // this.obstacles.push(tree);
  }

  drawPlayer() {
    //this function will call over and over again
    this.ctx.drawImage(
      this.player.img,
      this.player.posX,
      this.player.posY,
      this.player.width,
      this.player.height
    );
  }

  // drawObstacles() {
  //   this.obstacles.forEach((obstacle) => {
  //     this.ctx.drawImage(
  //       this.obstacles.tree,
  //       this.obstacles.posX,
  //       this.obstacles.posY,
  //       this.obstacles.width,
  //       this.obstacles.height
  //     );
  //   });

  // this.ctx.drawImage(
  //   this.obstacles[0].tree,
  //   this.obstacles[0].posX,
  //   this.obstacles[0].posY,
  //   this.obstacles[0].width,
  //   this.obstacles[0].height
  // );
  // }

  updateCanvas() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, 430, 800); // --> garanty that canvas would be cleared and everything will draw on a new canvas
      this.ctx.drawImage(this.bg, 0, 0, 430, 800);
      this.drawPlayer();
      updateObstacles();
      // this.drawObstacles();
      // this.time += 1;
      // if (this.time % 100 === 0) {
      //   updateObstacles();
      // }
    }, 20);
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
    return santa;
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

  move(event) {
    switch (event) {
      case "ArrowRight":
        this.moveRight();
        break;
      case "ArrowLeft":
        this.moveLeft();
        break;
      case "ArrowUp":
        this.moveUp();
        break;
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
    //  console.log(obstacles);
    ctx.drawImage(tree, this.posX, this.posY, this.width, this.height);
    return tree;
  }
}

let time = 0;

let obstacles = [];
function updateObstacles() {
  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].posY += 1;
    obstacles[i].createObstacles();
  }
  time++;
  if (time % 50 === 0) {
    let x = 430;
    let minGap = -30;
    let maxGap = 430;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    obstacles.push(new MyObstacles(150, 150, gap, 0));
    console.log(obstacles);
  }
}

window.onload = () => {
  document.querySelector("#start-btn").onclick = () => {
    const game = new Game();
    game.startGame();
    document.addEventListener("keydown", (e) => {
      game.player.move(e.key);
    });
    return game;
  };
};
