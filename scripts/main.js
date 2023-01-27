/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const startButton = document.getElementById('start');

const player = new Component(600, 100, 50, 50, ctx);

startButton.onclick = function () {
    const game = new Game(ctx, canvas.width, canvas.height, player);
    game.start();
} 