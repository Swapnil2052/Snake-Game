
cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    init(game){
      this.game=game;
      this.arr = this.game.bg.arr;
      this.xMaxCoordinate=this.game.bg.xbox-1;
      this.xMinCoordinate=0;
      this.yMaxCoordinate=this.game.bg.ybox-1;
      this.yMinCoordinate=0;
      this.node.on('respawn',this.getRandomPosition, this);
      this.getRandomPosition();
    },

    getRandomPosition(){
      this.x =  Math.floor(Math.random()* (this.xMaxCoordinate));
      this.y =  Math.floor(Math.random()* (this.yMaxCoordinate));

      if(this.arr[this.y][this.x]===0) {
        this.node.setPosition(this.game.bg.getPositionByCoordinates(cc.v2(this.x, this.y)));
      }else this.getRandomPosition();
    },


    // onLoad () {},

    start () {

    },

    // update (dt) {this.node.x-=150*dt},
});
