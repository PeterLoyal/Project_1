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
        soundWater.play();
        soundWater.loop = true;
        player.image.src = './docs/assets/snake.up.png'
          player.ctx.drawImage(player.image, player.x, player.y, player.w, player.h);
    }

    update = () => {    
        this.frames++;
        this.clear();
        console.log(this.player.trail);
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

        if (
            this.player.crashWithItem(this.food)
            ) {
            this.generateFood()
        } 
    }

    generateJunk () {
        
        this.junk.w = Math.floor(Math.random() * (60 - 20) + 20) ;
        this.junk.h = Math.floor(this.junk.w * 1.5);

        this.junk.x = Math.floor(Math.random() * (canvas.width - this.junk.w) ) 
        this.junk.y = Math.floor(Math.random() * (canvas.height - this.junk.h) )

/*         for (let i = 0; i < this.player.body.length; i++) {
            if (this.junk.x === this.player.body[i].x || this.junk.y === this.player.body[i].y) {
                this.junk.x = Math.floor(Math.random() * 700- this.junk.w)  
                this.junk.y = Math.floor(Math.random() * 700 - this.junk.h) 
            }
        } */
        
            if (
                this.player.crashWithItem(this.junk)
                ) {
                    console.log("junk top")
                this.generateJunk()
            } 
        

     /*    if (this.junk.x === this.food.x || this.junk.y === this.food.y) {
            this.junk.x = Math.floor(Math.random() * (canvas.width- this.junk.w)) 
            this.junk.y = Math.floor(Math.random() * (canvas.height - this.junk.h)) 
       } */
    }

    
    
    drawFood() {   
        this.image.src = './docs/assets/Shrimp.png'; 
        this.ctx.drawImage(this.image, this.food.x, this.food.y, this.food.w, this.food.h);
    }

    drawJunk() {
        /* let randomTime = Math.floor(Math.random() * (this.frames % 3000) - (this.frames % 120 === 0)) + (this.frames % 120 === 0);

        if(this.frames % randomTime === 0) { */
        this.image.src = './docs/assets/saco.png';
        this.ctx.drawImage(this.image, this.junk.x, this.junk.y, this.junk.w, this.junk.h);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    gameOver() {
            this.ctx.font =  "150px 'Amatic SC'";
            this.ctx.fillStyle = "red";
            this.ctx.fillText(`GAME OVER`, (canvas.width / 2) - 210, canvas.height/ 2 + 15);
            
            this.ctx.font = "50px 'Amatic SC'";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(`Your score is: ${this.result}`,  (canvas.width / 2) - 90, (canvas.height/ 2) + 130);

            restartButton.classList.remove('hidden');

            soundWater.pause();
            soundGameOver.play();



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
            soundEat.play();
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
            this.player.body.splice(0, 30);
            this.player.trail -= 30;
            soundHurt.play();
            if(this.result >= 30){
                this.result -= 30
            }
        }else if(this.frames % 250 === 0){ //intervalo de tempo em que a lata foge
            this.generateJunk();
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
