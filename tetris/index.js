'use strict';

import Game  from './EngineGame.js';
import Scene from './EngineScene.js';
import Control from './EngineControl.js';
import StartScene from './Scenes/StartScene.js';
import PlayScene from './Scenes/PlayScene.js';

Game.setConfig({ 
    canvasWidth: 800,
    canvasHeigth: 600
})

Game.load = () => {    
   
    //Enable resources
    Game.enableScene = Scene;
    Game.enableControl = new Control(window);      
    
    Game.scene.add(new StartScene(Game));
    Game.scene.add(new PlayScene(Game));

    Game.scene.active('START');   
}

Game.update = (dt) =>{

   Game.scene.update(dt);
}

Game.render = () =>{

    Game.scene.render();
}

Game.start();




