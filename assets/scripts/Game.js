const Background=require('Background');
const Apple=require('Apple');
const Snake=require('Snake');

cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default:null,
            type:Background
        },
        apple:{
            default:null,
            type:Apple
        },
        snake:{
            default:null,
            type:Snake
        }    
    },


     onLoad () {
        this.init();
         
     //  this.node.on(cc.Node.EventType.TOUCH_END, this.onMapTouch, this);
     },

     init(){
        const collisionManager=cc.director.getCollisionManager();
        collisionManager.enabled=true;

        this.bg.init();
        this.apple.init(this);
        this.snake.init(this);
     },

    //  onMapTouch(e){
    //     const location=e.getLocation();
    //   cc.log(this.bg.getGridCoordinatesByPosition(cc.v2(location.x, location.y)))
    //  },

    start () {

    },

    // update (dt) {},
});
