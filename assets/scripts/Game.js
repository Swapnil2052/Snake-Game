const Background=require('Background');
const Apple=require('Apple');
const Snake=require('Snake');
const Globals=require('Globals')

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
        },
        resultPopup:{
            default:null,
            type:cc.Node
        },
        label:{
            default:null,
            type:cc.Label
        },   
    },


     onLoad () {
        this.tapSound=this.node.getComponents(cc.AudioSource)[0];
        this.homeSound=this.node.getComponents(cc.AudioSource)[1];

        if(Globals.homeMute)this.homeSound.mute=true;
        else this.homeSound.mute=false;

        if(Globals.tapMute)this.tapSound.mute=true;
        else this.tapSound.mute=false;

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
       this.node.on('end',()=>this.resultPopup.active=true);
    },

    onHomeClick(){
        this.tapSound.play();
        cc.director.loadScene('Home');
    },

    onPlayAgainClick(){
        this.tapSound.play();
        Globals.score=0;
       cc.director.loadScene('Game');
    }

    // update (dt) {},
});
