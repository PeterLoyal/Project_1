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

}