'use strict';

import Game  from './EngineGame.js';
import Scene from './EngineScene.js';
import StartScene from './Scenes/StartScene.js';
import PlayScene from './Scenes/PlayScene.js';

Game.setConfig({ 
    canvasWidth: 800,
    canvasHeigth: 600
})

Game.load = () => {
    
    const context = Game.context;
    const config = Game.config;

    Scene.add(new StartScene(context, config));
    Scene.add(new PlayScene(context, config));
    
    Scene.active('START');
}

Game.update = (dt) =>{

   Scene.update(dt);
}

Game.render = () =>{

    Scene.render();
}

Game.start();




