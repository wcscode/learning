export default class Table {

    constructor(context, c, backgroundColor = 'black'){

        this.context = context;
        this.c = c;
        this.width = c.WIDTH_TABLE;
        this.height = c.HEIGHT_TABLE;
        this.backgroundColor = backgroundColor; 
        this.scores = [ 
            { player: 1, x: c.CENTER_X - c.CENTER_X / 5, y: c.CENTER_Y / 2, value: 0 }, 
            { player: 2, x: c.CENTER_X / 5 + c.CENTER_X, y: c.CENTER_Y / 2, value: 0 } 
                    ];      

        this.winner  = 0;  
    }

    showWinner = () => {  this.winner = this.scores.find( f => f.value === this.c.MAX_SCORE).player; }

    addScore = (player) => {

        const score = this.scores.find( f => f.player === player);
        score.value +=1;
    }

    isMaxScore = () => this.scores.some( s => s.value == this.c.MAX_SCORE);
    
    
    reset = () => {

        this.winner = 0;
        
        this.scores.forEach( (score) => {
            
            score.value = 0;
        });
    }

   

    render = () => {

        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.strokeStyle = 'white';
        this.context.beginPath();
        this.context.setLineDash([5, 15]);
        this.context.moveTo(this.c.CENTER_X, 0);
        this.context.lineTo(this.c.CENTER_X, this.c.HEIGHT_TABLE);        
        this.context.stroke(); 
        this.context.fillStyle = 'white';
        this.context.font = `70px Arcade`;
        this.scores.forEach( (score) => {
            
           
            this.context.fillText(score.value, score.x, score.y);
        });


        if(this.winner != 0) {           

            this.context.font = `50px Arcade`;
            this.context.fillText(`Player ${this.winner} venceu`, this.c.CENTER_X, this.c.CENTER_Y);             
        }
    }

   
}