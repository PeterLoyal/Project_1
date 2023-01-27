/** @type {HTMLCanvasElement} */

class Component{
    constructor(x, y, w, h, ctx,) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.image = new Image();
        
    }

    drawSnake() {
        this.image.src = '/docs/assets/crab.png'
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        
    }

    newPosition() {
        this.x;
        this.y;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.h;
    }

    left() {
        return this.x;
    }

    right() {
        return this.x;
    }

   
    crashWith(limits) {
        return !(
            this.top() < 0 || this.left() < 0 || this.bottom() > this.height || this.right().x > this.width
        )    
    }
}