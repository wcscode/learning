import Table from './table.class.js';
import Paddle from './paddle.class.js';
import Ball from './ball.class.js';

export default class PlayState {

    constructor(context, game, c) {
       
        this.context = context;
        this.game = game;
        this.table = new Table(context, c, 'black');
        this.player1 = new Paddle(context, 'P2', c);
        this.player2 = new Paddle(context, 'P1', c);        
        this.ball = new Ball(context, c);
        this.subState = 'START';

        this._pause = false;
        this.popup = { x: c.WIDTH_TABLE / 4, y: c.HEIGHT_TABLE / 4, width: c.WIDTH_TABLE - c.WIDTH_TABLE / 2, height: c.HEIGHT_TABLE - c.HEIGHT_TABLE / 2} 

        this.menus = [

            { id:0, text: 'CONTINUAR', x: this.popup.x * 1.5, y: this.popup.x * 0.7  , selected: true },
            { id:1, text: 'SAIR', x: this.popup.x * 2.6, y: this.popup.x * 0.7, selected: false },            

        ];

        this.player1.initialPosition();
        this.player2.initialPosition();
       
    }

    moveMenu = (direction) => {

        this.game.cancelControlsCommands();

        let selectedId = this.menus.find(f => f.selected).id;   
             
        selectedId = ((selectedId + direction) % 2 + 2) % 2;  
              
        this.menus.forEach(menu => {
            
            menu.selected = menu.id === selectedId;
            
        });        

    }

    goto = () => {
        
        this.game.cancelControlsCommands();   

        const id = this.menus.find(f => f.selected).id;
        
        if (id == 0) {

            this.pause();
            this.changeSubState('RUNNING');

        } else {
            
            this.game.resetState('PLAY');
            this.game.changeState('MENU');
        }
    }

    getSubState = () => this.subState;

    changeSubState = (subState) => { this.subState = subState }  

    pause = () => {
        this._pause = !this._pause;
    }

    update = (dt) => {

        const subState = this.getSubState();               

        switch(subState){

            case 'RUNNING':
                
                if(this.game.controlOneIs('UP')) this.player1.moveUp(dt);
                if(this.game.controlOneIs('DOWN')) this.player1.moveDown(dt);
                if(this.game.controlTwoIs('UP')) this.player2.moveUp(dt);
                if(this.game.controlTwoIs('DOWN')) this.player2.moveDown(dt);
                if(this.game.controlIs('PAUSE')) {

                    this.pause();
                    this.game.cancelControlsCommands();
                    this.changeSubState('PAUSE');                      
                    
                }
                
                this.ball.update(dt);

                if (this.ball.isOutOfTable()) {

                    this.table.addScore(this.ball.goalPlayer());                                         
                    this.changeSubState(this.table.isMaxScore() ? 'WINNER' : 'RESTART');                    
                }

                this.ball.collides(this.player1);
                this.ball.collides(this.player2);
                this.ball.boundaries();

                break;

            case 'RESTART':

                this.ball.initialPosition();
                this.changeSubState('RUNNING');
                
                break;

            case 'START':

                this.ball.initialPosition();
                this.table.reset();
                this.changeSubState('RUNNING')

                break;
            
            case 'WINNER':
                                    
                    this.table.showWinner();
                    if(this.game.controlIs('ENTER')) this.changeSubState('START');
    
                    break;
            
            case 'PAUSE':                              

                if(this.game.controlOneIs('LEFT')) this.moveMenu(-1);
                if(this.game.controlOneIs('RIGHT')) this.moveMenu(1);
                if(this.game.controlIs('ENTER')) this.goto();

                break;
        }
    }

    render = () => {

        this.table.render()
        this.player1.render();
        this.player2.render(); 
        this.ball.render();       
       
        
        if(this._pause) {

            this.context.fillStyle = '#5f5f5f';
            this.context.beginPath();
            
            this.context.fillRect(this.popup.x, this.popup.y, this.popup.width, this.popup.height);

            this.context.fillStyle = 'white';
            this.context.font = `20px Arcade`;

            this.menus.forEach(menu => {               
                
                this.context.fillStyle = menu.selected ? 'orange' : 'white';
                this.context.fillText(menu.text, menu.x, menu.y);

            });
        }
    }
}