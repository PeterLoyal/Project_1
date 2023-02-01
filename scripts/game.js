/** @type {HTMLCanvasElement} */

class Game {
    constructor(ctx, width, height, player, body){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.body = body;
        this.image = new Image ();
        this.intervalId = null;
        this.frames = 0;
        this.result = 0;
        this.food = {x: 0, y: 0, w: 25, h:25};
        this.junk = {x: 0, y: 0, w: 0, h: 0}
    }

    start(){
        this.intervalId = setInterval(this.update, 1000 / 60)
        this.generateFood();
        this.generateJunk();
    }

    update = () => {    
        this.frames++;
        this.clear();
        /* console.log(this.result) */
        this.player.newPosition();
        this.player.drawBody();
        this.player.drawSnake();
        this.drawFood();
        this.drawJunk();
        this.grabFood();
        this.grabJunk();
        this.player.updateBody();
        this.checkGameOver();
        this.getHighScore();

    }

    stop() {
        clearInterval(this.intervalId);
    }

    generateFood(){
        this.food.x = Math.floor(Math.random() * (canvas.width - this.food.w));
        this.food.y = Math.floor(Math.random() * (canvas.height - this.food.h));

        for (let i = 0; i < this.player.body.length; i++) {
            if (this.food.x === this.player.body[i].x && this.food.y === this.player.body[i].y) {
                this.food.x = Math.floor(Math.random() * (canvas.width - this.food.w));
                this.food.y = Math.floor(Math.random() * (canvas.height - this.food.h));
            }
        }
    }

    generateJunk () {
        this.junk.x = Math.floor(Math.random() * (canvas.width - this.junk.w));
        this.junk.y = Math.floor(Math.random() * (canvas.height - this.junk.h));
        
        this.junk.w = Math.floor(Math.random() * 100 - 40) + 40;
        this.junk.h = this.junk.w * 2;

        for (let i = 0; i < this.player.body.length; i++) {
            if (this.junk.x === this.player.body[i].x && this.junk.y === this.player.body[i].y) {
                this.junk.x = Math.floor(Math.random() * (canvas.width - this.junk.w));
                this.junk.y = Math.floor(Math.random() * (canvas.height - this.junk.h));
            }
        }

        if (this.junk.x === this.food.x && this.junk.y === this.food.y) {
            this.junk.x = Math.floor(Math.random() * (canvas.width - this.junk.w));
            this.junk.y = Math.floor(Math.random() * (canvas.height - this.junk.h));
       }
    }

    
    
    drawFood() {   
        this.image.src = '/docs/assets/Shrimp.png'; 
        this.ctx.drawImage(this.image, this.food.x, this.food.y, this.food.w, this.food.h);
    }

    drawJunk() {
        /* let randomTime = Math.floor(Math.random() * (this.frames % 3000 === 0) - (this.frames % 120 === 0)) + (this.frames % 120 === 0);

        if(this.frames % randomTime === 0) { */
        this.image.src = '/docs/assets/beer.png';
        this.ctx.drawImage(this.image, this.junk.x, this.junk.y, this.junk.w, this.junk.h);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    gameOver() {
            this.ctx.font =  "150px 'Amatic SC'";
            this.ctx.fillStyle = "red";
            this.ctx.fillText(`GAME OVER`, (canvas.width / 2) - 200, canvas.height/ 2 + 50);
            
            this.ctx.font = "50px 'Amatic SC'";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(`Your score is: ${this.result}`,  (canvas.width / 2) - 80, (canvas.height/ 2) + 130);

            restartButton.classList.remove('hidden');


            /* themeMusic.pause()
            const failSound = new Audio("../docs/assets/Y2Mate.is - Sad Trombone Wah Wah Wah Fail Sound Effect-LukyMYp2noo-144p-1654480449831.mp4")
            failSound.play() */
    
}
    checkGameOver() {
        if(this.player.crashWith()) {
            this.stop();
            this.gameOver();
        } 

        const collidedWithSelf = this.player.body.some((segment, index) => {
            if (index < this.player.body.length - 25){
        
                return this.player.crashWithHimself(segment)
                
            }
        })
        

        if(collidedWithSelf){
            this.stop();
            this.gameOver();
        }
        if(this.player.trail < 10){
            this.stop();
            this.gameOver();
        }
    }
    
    grabFood() {
        const collided  =  !(
            this.player.down() < this.food.y ||
            this.player.top() > this.food.y + this.food.h ||
            this.player.right() < this.food.x ||
            this.player.left() > this.food.x + this.food.w
            );

        if(collided) {
        /* console.log(this.player.body);
        console.log(this.player.trail); */
            this.generateFood();
            this.getHighScore();
            this.player.trail += 10;
            this.result += 10;
        }
    }

    grabJunk() {
        const collided  =  !(
            this.player.down() < this.junk.y ||
            this.player.top() > this.junk.y + this.junk.h ||
            this.player.right() < this.junk.x ||
            this.player.left() > this.junk.x + this.junk.w
            );
        if(collided) {
            this.generateJunk();
            this.player.body.splice(0, 10);
            this.player.trail -= 10;
        }

    }

    getHighScore() {
        let score = document.getElementById('span');
        let hight = document.getElementById('HighScore')
        let zzz = this.result;
        let highscore = localStorage.getItem("HighScore");
        if(highscore !== null){
            if (zzz >= highscore) {
                localStorage.setItem("HighScore", zzz);      
            }
        
        }
        else{
            localStorage.setItem("HighScore", zzz);
        }
        
        hight.innerHTML = `High Score is: ${highscore}`
        score.innerHTML = `Score: ${zzz}`
    }
    }
