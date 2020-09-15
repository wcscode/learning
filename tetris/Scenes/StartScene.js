export default class StartScene{

    constructor(context, config){
        
        this._context = context;
        this._config = config; 
        this._aggregate = 0;
        
        this._speed = Math.PI / 100;       
        this._angle = this._speed;
        this._radius = 800;

        this._animationCoord = {x:0, y:0}
        this._pieces = [
            {
                angle:0,
                fillStyle: '#32AE5B',
                strokeStyle: '#32AE5B',
                coord: {x:0, y:0},
                blocks:[
                    {x:0, y:0},
                    {x:20, y:0},
                    {x:40, y:0},
                    {x:20, y:20}
            ]},
            {
                angle:Math.PI / 2,
                fillStyle: '#009DB8',
                strokeStyle: '#009DB8',
                coord: {x:10, y:10},
                blocks:[
                    {x:0, y:0},
                    {x:0, y:20},
                    {x:0, y:40},
                    {x:20, y:40}
            ]},
            {
                angle:Math.PI,
                fillStyle: '#AF1F07',
                strokeStyle: '#AF1F07',
                coord: {x:10, y:10},
                blocks:[
                    {x:0, y:0},
                    {x:0, y:20},
                    {x:0, y:40},
                    {x:0, y:60}
            ]},
            {
                angle:Math.PI + (Math.PI / 2),
                fillStyle: '#D6AD05',
                strokeStyle: '#D6AD05',
                coord: {x:10, y:10},
                blocks:[
                    {x:40, y:0},
                    {x:20, y:0},
                    {x:20, y:20},
                    {x:0, y:20}
                    
            ]}
        ];            
        
        this._preRenderPieces = this.preRenderPieces(this._pieces);
       
    }

    get name() { return 'START' }

    update = (dt) => {
       // console.log(this._angle);
        this._aggregate += dt * 2;            
        this._blink = Math.trunc(this._aggregate) % 2 == 0;  
       
        if (this._aggregate > 2) this._aggregate = 0;
        if (this._angle >= Math.PI * 2) this._angle = this._speed;
        
        this._angle += this._speed;        

        const radius = this._radius * (dt * 15);

        this._pieces.forEach(piece => { 

            piece.coord.x = Math.floor(this._config.canvasCenterX + Math.sin(this._angle + piece.angle)  * radius);
            piece.coord.y = Math.floor(this._config.canvasCenterY + Math.cos(this._angle + piece.angle)  * radius);

        });            
      
       
    }

    render = () => {

        //this._context.clearRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);

        
        this._context.clearRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);
       // this._context.rect(0, 0, this._config.canvasWidth, this._config.canvasHeight);
        this._context.fillStyle = '#ffccdd';
        this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);
        //this._context.fillStyle = '#ffccdd';
        this._context.fill();

        this._context.beginPath();
        this._context.strokeStyle = '#FFBBBB';
        this._context.lineWidth = 10;
        this._context.strokeRect(this._config.canvasCenterX - 100, this._config.canvasCenterY - 100, 100, 100);
        this._context.strokeRect(this._config.canvasCenterX, this._config.canvasCenterY - 100, 100, 100);
        this._context.strokeRect(this._config.canvasCenterX - 100, this._config.canvasCenterY, 100, 100);
        this._context.strokeRect(this._config.canvasCenterX, this._config.canvasCenterY, 100, 100);

        this._context.beginPath(); 
        this._context.font = '70px Tetris';
        this._context.fillStyle = '#5F5753';
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this._context.fillText('TETRIS', this._config.canvasCenterX, this._config.canvasCenterY);
        

        if(this._blink){
        
            this._context.beginPath();
            this._context.font = '30px Arcade';
            this._context.fillStyle = '#5F5753';
            this._context.textAlign = 'center';
            this._context.textBaseline = 'middle';
            this._context.fillText('PRESS ENTER', this._config.canvasCenterX, this._config.canvasCenterY + 50);
        }        
        
        this._context.save();
       
        this._context.translate(-30, -20);            

        this._preRenderPieces.forEach(preRenderedPiece => {
            this._context.drawImage(preRenderedPiece.image, preRenderedPiece.piece.coord.x, preRenderedPiece.piece.coord.y);            
        })

        this._context.restore();       

    }   
 
    
    preRenderPieces = (pieces) => {
       
        const preRenderedPieces = [];

        pieces.forEach(piece => {
           
            //this._context.translate(-300, -20); 

            let canvasPiece = document.createElement('canvas');

            canvasPiece.width = 64;
            canvasPiece.height = 64; 

            let contextPiece = canvasPiece.getContext('2d');

            contextPiece.fillStyle = piece.fillStyle;
            contextPiece.strokeStyle = piece.strokeStyle;
            

            piece.blocks.forEach(block => {   

                contextPiece.beginPath();
                contextPiece.fillRect(block.x, block.y, 20, 20);            
                contextPiece.strokeRect(block.x, block.y, 20, 20);            
                this._context.closePath();

            });

            preRenderedPieces.push({image:canvasPiece, piece});

        });  

        return preRenderedPieces;
    }
}