export default class Paddle {
    
    constructor(context, player, c) {

        this.context = context;
        this.x = 0;
        this.y = 0;
        this.height = 40;
        this.width = 10;
        this.speed = 400;          
        this.limitYTop = 0;
        this.widthTable = c.WIDTH_TABLE;
        this.heightTable = c.HEIGHT_TABLE;
        this.player = player;              
    }
    
    initialPosition = () => {

        
        this.x = this.player == 'P1' ? 10 : this.widthTable - 20;
        this.y = (this.heightTable / 2) - (this.height / 2);

    }    

    moveUp = (dt) => { this.y = Math.max(this.y - this.speed * dt, 0); }

    moveDown = (dt) => { this.y = Math.min(this.y + this.speed * dt, this.heightTable - this.height); }

    render = () => {
        
        this.context.fillStyle = 'white';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}