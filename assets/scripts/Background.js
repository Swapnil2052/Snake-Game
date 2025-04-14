

cc.Class({
    extends: cc.Component,

    properties: {
     
    },
    
    init(){
        this.boxSize=24;
        this.xbox=this.node.width/this.boxSize;
        this.ybox=this.node.height/this.boxSize;
        this.arr=[];
        for(let i=0;i<100;i++){
            this.arr[i]=[];
            for(let j=0;j<100;j++){
                this.arr[i][j]=0;
            }
        }
    },

    getGridCoordinatesByPosition(position){
        return{
            x:Math.floor((position.x + this.node.width/2) / this.boxSize),
            y:Math.floor((position.y + this.node.height/2) / this.boxSize)
        }
      },

    getPositionByCoordinates(coordinates){
       return {
        x:coordinates.x * this.boxSize -this.node.width/2 ,
        y:coordinates.y * this.boxSize -this.node.height/2
       }
      },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
