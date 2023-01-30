/** @type {HTMLCanvasElement} */

class Game {
    constructor(ctx, width, height, player, body){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.body = body;
        this.intervalId = null;
        this.frames = 0;
        this.food = {x: 0, y: 0, w: 25, h:25};
    }

    start(){
        this.intervalId = setInterval(this.update, 1000 / 60)
        this.generateFood()
    }

    update = () => {    
        this.frames++;
        this.clear();
        this.player.newPosition();
        this.player.drawBody();
        this.player.drawSnake();
        this.drawFood();
        this.player.updateBody();
        this.grabFood()
        this.checkGameOver();

    }

    stop() {
        clearInterval(this.intervalId);
    }

    generateFood(){
        this.food.x = Math.floor(Math.random() * canvas.width - this.food.w)
        this.food.y = Math.floor(Math.random() * canvas.height - this.food.h)
    }

    drawFood() {   
        this.ctx.fillStyle = 'black'; 
        this.ctx.fillRect(this.food.x, this.food.y, this.food.w, this.food.h);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    checkGameOver() {
        if(this.player.crashWith()) {
            this.stop();
        } 
    }

    grabFood(){
        const collided  =  !(
            this.player.down() < this.food.y||
            this.player.top() > this.food.y + this.food.h ||
            this.player.right() < this.food.x ||
            this.player.left() > this.food.x + this.food.w
            );

        if(collided){
            this.generateFood();
            this.player.trail += 25;
        }
    }

    


 
}