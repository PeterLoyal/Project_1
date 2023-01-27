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
        player.y -= 50;
        break;
      case 'ArrowDown':
        player.y += 50;
        break;
      case 'ArrowLeft':
        player.x -= 50;
        break;
      case 'ArrowRight':
        player.x += 50;
        break;
    }
  });

