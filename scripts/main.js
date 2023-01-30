/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const startButton = document.getElementById('start');

const player = new Component(canvas.width / 2, canvas.height / 2, 25, 25, ctx);


let game = null; 

startButton.onclick = function () {
  if(!game) {
    game = new Game(ctx, canvas.width, canvas.height, player);
    game.start();
  }
} 


document.addEventListener('keydown', (e) => {

  switch (e.code) {

    case 'ArrowUp':
      if(player.direction !== 'down') {
      player.movementX = 0;
      player.movementY = -3;
      player.direction = 'up';
      }
      break;
      
    case 'ArrowDown':
      if(player.direction !== 'up') {
      player.movementX = 0;
      player.movementY = 3;
      player.direction = 'down';
      }
      break;

    case 'ArrowLeft':
      if(player.direction !== 'right') {
      player.movementX = -3;
      player.movementY = 0;
      player.direction = 'left';
      }
      break;
    case 'ArrowRight':
      if(player.direction !== 'left') {
      player.movementX = 3;
      player.movementY = 0;
      player.direction = 'right';
      }
      break;
  }
});

