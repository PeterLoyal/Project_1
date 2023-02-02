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
        this.direction = '';
        this.body = [];
        this.trail = 11;
    }

    drawSnake() {
        /* this.image.src = '/docs/assets/snake.png'; */
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    drawBody() {
        for(let i = 0; i < this.body.length - 1; i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.body[i].x + 25/2, this.body[i].y + 25/2, 11, 0, Math.PI * 2);
            this.ctx.lineWidth = 10;
            this.ctx.fillStyle = "#24E087";
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    newPosition() {
        this.x += this.movementX;
        this.y += this.movementY;
    }

    updateBody() {
        this.body.push({x: this.x, y: this.y})
        if(this.body.length > this.trail){
            this.body.shift()
        }
    }
    
    
    
    // Methods for the boundaries
    left() {
        return this.x;
    }
    
    right() {
        return this.x + this.w;
    }
    
    
    top() {
        return this.y;
    }
    
    down() {
        return this.y + this.h;
    }
    
    // boudaries
    crashWith() {
        return (
        this.top() < 0 || 
        this.down() > canvas.height || 
        this.left() < 0 || 
        this.right() > canvas.width
        );
    }

    crashWithItem(item) {
        return this.body.some((segment => {
            return !(
                segment.y < item.y + item.h || 
                segment.y + segment.h > item.y|| 
                segment.x < item.x + item.w|| 
                segment.x + segment.w > item.x
                );
        }  )) 
    }



    crashWithHimself(segment) {
        return !(
        this.down() < segment.y ||
            this.top() > segment.y + 25 ||
            this.right() < segment.x ||
            this.left() > segment.x + 25
        )
    } 
}

