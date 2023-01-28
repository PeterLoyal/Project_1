/** @type {HTMLCanvasElement} */

class Component{
    constructor(x, y, w, h, ctx,) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.image = new Image();
        this.movementX = 0;
        this.movementY = 0;
        this.currentPosition = [0, 0];
        this.body = [];
    }

    drawSnake() {
        this.image.src = '/docs/assets/head.jpeg'
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        
    }

    newPosition() {
        this.x += this.movementX;
        this.y += this.movementY;
    }

    // Methods for the boundaries
        left() {
            return player.x - player.w;
        }

        right() {
            return player.x + player.w;
        }


        top() {
            return player.y - player.h;
        }

        down() {
            return player.y + player.h;
        }

    // boudaries
    crashWith() {
        return (
        player.y < 0 || 
        player.y > canvas.height || 
        player.x < 0 || 
        player.x > canvas.width
        );
    }


    grabFood(){

    }
}

