/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const startButton = document.getElementById('start');

const player = new Component(canvas.width / 2, canvas.height / 2, 50, 50, ctx);

startButton.onclick = function () {
    const game = new Game(ctx, canvas.width, canvas.height, player);
    game.start();
} 


document.addEventListener('keydown', (e) => {

  switch (e.code) {
    case 'ArrowUp':
      player.movementX = 0;
      player.movementY -= 2;
      break;
    case 'ArrowDown':
      player.movementX = 0;
      player.movementY += 2;
      break;
    case 'ArrowLeft':
      player.movementX -= 2;
      player.movementY = 0;
      break;
    case 'ArrowRight':
      player.movementX += 2;
      player.movementY = 0;
      break;
    case 'ArrowUp' + 'ArrowUp':
     player.movementX = 0;
     player.movementY = 0;
     break;
  }
});

