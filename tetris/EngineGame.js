'use strict';

export default class EngineGame {
    
    static get context() { return this._context; }
    static get config() { return this._config }

    static load = () => {}
    static update = (dt) => {}
    static render = (dt) => {}

    static loop = (tick) =>{
       // console.log(tick);
        this.update(tick);
        this.render(tick);
        requestAnimationFrame(this.loop);
    }

    static setConfig = (config) => { this._config = config; }

    

    static start = () => { 
        
        this._config.canvasElementId = this._config.canvasElementId == null ? 'canvas' : this._config.canvasElementId;
        this._config.canvasWidth = this._config.canvasWidth == null ? '800' : this._config.canvasWidth;
        this._config.canvasHeight = this._config.canvasHeight == null ? '600' : this._config.canvasHeight;
        
        this._config.canvasCenterX = this._config.canvasWidth / 2;
        this._config.canvasCenterY = this._config.canvasHeight / 2;

        const canvas = document.getElementById(this._config.canvasElementId);

        this._context = canvas.getContext('2d');

        this._context.fillStyle = 'black';
        this._context.fillRect(0, 0, this._config.canvasWidth, this._config.canvasHeight);

        this.load();
        this.loop(); 
    }     
        
}

