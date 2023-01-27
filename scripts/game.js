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
        this.checkGameOver();
    }

    stop(){
        clearInterval(this.intervalId);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    checkGameOver() {
        const crashed = this.ctx.some((limits) => {
            return this.player.crashWith(limits);
        });

        if(crashed) {
            this.stop();
        }
    }

}