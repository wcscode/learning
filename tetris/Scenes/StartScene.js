export default class StartScene{

    constructor(context, config){
        
        this._context = context;
        this._config = config; 

    }

    get name() { return 'START' }

    update = (dt) => {

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

        this._context.font = '30px Arcade';
        this._context.fillStyle = 'green';
        this._context.textAlign = 'center';
        this._context.textBaseline = 'middle';
        this._context.fillText('PRESS ENTER', this._config.canvasCenterX, this._config.canvasCenterY + 50);
      
    }
}