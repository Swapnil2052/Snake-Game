let Globals=require('Globals');

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    init(snake){
      this.snake=snake;
    },

    onCollisionEnter(other,self){
        if(other.node.name==='apple'){
            this.snake.addBody();
            other.node.emit('respawn');
            this.snake.moveInterval-=0.02;
            ++Globals.score;
            this.snake.game.label.string=Globals.score;
        }
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
