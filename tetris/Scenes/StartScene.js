export default class StartScene{

    constructor(context, config){
        
        this._context = context;
        this._config = config; 
        this._aggregate = 0;
        this._angle = 0;
        this._speed = .03;
        this._scale = 2.9;
        this._radius = 2000;

        this._animationCoord = {x:0, y:0}
        this._pieces = [
            {
                blocks:[
                    {x:0, y:0},
                    {x:20, y:0},
                    {x:40, y:0},
                    {x:20, y:20}
            ]},
        ];       
       
    }

    get name() { return 'START' }

    update = (dt) => {
       
        this._aggregate += dt * 2;            
        this._blink = Math.trunc(this._aggregate) % 2 == 0;  
       
        if (this._aggregate > 2) this._aggregate = 0;
        if (this._angle > Math.PI * 2) this._angle = 0;
        
        this._angle += this._speed;        

        this._animationCoord.x = this._config.canvasCenterX + Math.sin(this._angle)  * this._radius * this._scale * dt;
        this._animationCoord.y = this._config.canvasCenterY + Math.cos(this._angle)  * this._radius * this._scale * dt;
        console.log(dt);
       // console.log(this._animationCoord.y);
    }

    render = () => {

        this._context.clearRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);
        this._context.rect(0, 0, this._config.canvasWidth, this._config.canvasHeight);
        this._context.fillStyle = 'black';
        this._context.fill();

        this._context.font = '70px Tetris';
        this._context.fillStyle = 'green';
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this._context.fillText('TETRIS', this._config.canvasCenterX, this._config.canvasCenterY);

        if(this._blink){
        
            this._context.font = '30px Arcade';
            this._context.fillStyle = 'green';
            this._context.textAlign = 'center';
            this._context.textBaseline = 'middle';
            this._context.fillText('PRESS ENTER', this._config.canvasCenterX, this._config.canvasCenterY + 50);
        }        
        
       // this._pieces.forEach(piece =>{
       //     this.renderPieces('yellow', 'orange', this._animationCoord.x, this._animationCoord.y, piece.blocks)
        //});
        //this._context.beginPath()    
        this._context.fillStyle = 'white';                    
        this._context.arc(this._animationCoord.x, this._animationCoord.y, 10, 0, Math.PI * 2, true);      
        this._context.fill();
        this._context.stroke();     

    }
    
    renderPieces = (fillStyle, strokeStyle, x, y, blocks) => {
        
        this._context.fillStyle = fillStyle;
        this._context.strokeStyle = strokeStyle;

        blocks.forEach(block => {   
            //this._context.textAlign = 'center';
            //this._context.textBaseline = 'middle';        
            this._context.fillRect(x + block.x, y + block.y, 20, 20);            
            this._context.strokeRect(x + block.x, y + block.y, 20, 20);            
        });
    }   
}