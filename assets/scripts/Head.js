

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
        }
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
