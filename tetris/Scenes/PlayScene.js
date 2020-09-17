export default class PlayScene{

    constructor(game){

        this._game = game;
        this._context = game.context;
        this._config = game.config; 

        this._bgColor = {

            r: 255,
            g: 204,
            b: 221
         }
    }

    get name() { return 'PLAY' }
    
    update = (dt) => {

    }

    render = () => {

        this._context.clearRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);       
        this._context.fillStyle = `rgb(${this._bgColor.r}, ${this._bgColor.g}, ${this._bgColor.b})`;
        this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);        
        this._context.fill();

        this._context.beginPath();
        this._context.strokeStyle = 'green';
        this._context.rect(0, 0, 50, 50);
        this._context.stroke();
    }
}