/** @type {HTMLCanvasElement} */

class Game {
    constructor(ctx, width, height, player){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.intervalId = null;
        this.frames = 0;
        this.enemies = [];
    }

    start(){
        this.intervalId = setInterval(this.update, 1000 / 60)
    }

    update = () => {    
        this.frames++;
        this.clear();
        this.player.newPosition();
        this.player.drawSnake();

    }

    stop(){
        clearInterval(this.intervalId);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }


}