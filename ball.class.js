export default class Ball {

    constructor(context, c) {
        
        this.c = c;
        
        this.context = context;
        this.x = 0;
        this.y = 0;
        this.side = 10;                   
        this.directionX = 1;
        this.directionY = 1;            
    }

    initialPosition = () => {
        
        this.x = (this.c.WIDTH_TABLE / 2) - (this.side / 2);
        this.y = (this.c.HEIGHT_TABLE / 2) - (this.side / 2);
        this.directionX  = Math.floor(Math.random() * 2) + 1 === 1  ?  this.c.SPEED : -this.c.SPEED;
        this.directionY = (Math.floor(Math.random() * 2) + 1 === 1  ?  this.c.SPEED : -this.c.SPEED) * Math.random();
    }
   
       

    collides = (paddle) => {

        
        if (this.x > paddle.x && this.x < paddle.x + paddle.width ||
            this.x + this.side > paddle.x && this.x + this.side < paddle.x + paddle.width) {
            
                if(this.y > paddle.y && this.y < paddle.y + paddle.width ||
                   this.y + this.side > paddle.y && this.y + this.side < paddle.y + paddle.height) {

                    this.directionX = -this.directionX;

                    this.x = this.directionX == Math.abs(this.directionX) ?
                            this.x = paddle.x + paddle.width :
                            this.x = paddle.x - this.side
                }
                
        }
    }

    boundaries = () => {

        if( this.y < 0 || this.y + this.side > this.c.HEIGHT_TABLE) {

            this.directionY = -this.directionY;            
            this.directionX = Math.min(this.directionX * 1.1, this.c.MAX_SPEED);
            this.y = this.directionY == Math.abs(this.directionY) ? 0 : this.c.HEIGHT_TABLE - this.side;       
        }        
    }

    isOutOfTable = () => this.x + this.side < 0 || this.x  > this.c.WIDTH_TABLE;
    goalPlayer = () => {

        if(this.x + this.side < 0) return 2;        
        if(this.x  > this.c.WIDTH_TABLE) return 1;        
        return undefined;
    }

    update = (dt) => {     
        
       this.x += this.directionX * dt;
       this.y += this.directionY * dt;

    }

    render = () => {
        
        this.context.fillStyle = 'white';
        this.context.fillRect(this.x, this.y, this.side, this.side);

    }

}