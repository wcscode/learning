export default class PlayScene{

    constructor(context){

        this._context = context;
    }

    get name() { return 'PLAY' }
    
    update = (dt) => {

    }

    render = () => {

        this._context.beginPath();
        this._context.strokeStyle = 'green';
        this._context.rect(0, 0, 50, 50);
        this._context.stroke();
    }
}