/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
restartButton.classList.add('hidden');


const player = new Component(canvas.width / 2, canvas.height / 2, 25, 25, ctx);

const soundEat = new Audio('/docs/assets/swallow.mp3');

const soundWater = new Audio('/docs/assets/underwater.mp3');

let game = null; 

startButton.onclick = function () {
    game = new Game(ctx, canvas.width, canvas.height, player);
    game.start();
  
  startButton.classList.add('hidden');
} 

restartButton.onclick = function () {
  startButton.classList.remove('hidden');
  restartButton.classList.add('hidden');
  game.clear();
  game.intervalId = null;
  game.frames = 0;
  game.result = 0;
  game.food = {x: 0, y: 0, w: 25, h:25};
  game.junk = {x: 0, y: 0, w: 25, h: 25};
  player.x = canvas.width / 2
  player.y = canvas.height / 2
  player.movementX = 0;
  player.movementY = 0;
  player.body = [];
  player.direction = '';
  player.trail = 11;
  game.getHighScore();


 /*  game.start();
 */
  
}


document.addEventListener('keydown', (e) => {

  switch (e.code) {

    case 'ArrowUp':
      if(player.direction !== 'down') {
      player.movementX = 0;
      player.movementY = -5;
      player.direction = 'up';
    }
    player.image.src = '/docs/assets/snake.up.png'
    player.ctx.drawImage(player.image, player.x, player.y, player.w, player.h);

      break;
      
    case 'ArrowDown':
      if(player.direction !== 'up') {
      player.movementX = 0;
      player.movementY = 5;
      player.direction = 'down';
    }
    player.image.src = '/docs/assets/snake.down.png'
    player.ctx.drawImage(player.image, player.x, player.y, player.w, player.h);
      
      break;

    case 'ArrowLeft':
      if(player.direction !== 'right') {
      player.movementX = -5;
      player.movementY = 0;
      player.direction = 'left';
      }
      player.image.src = '/docs/assets/snake.left.png'
      player.ctx.drawImage(player.image, player.x, player.y, player.w, player.h);
      break;
    case 'ArrowRight':
      if(player.direction !== 'left') {
      player.movementX = 5;
      player.movementY = 0;
      player.direction = 'right';
    }
    player.image.src = '/docs/assets/snake.right.png'
    player.ctx.drawImage(player.image, player.x, player.y, player.w, player.h);
      break;
  }
});

