const Head=require('Head');
let Globals=require('Globals');

cc.Class({
    extends: cc.Component,

    properties: {
      moveInterval:0.25,
      body:{
        default:null,
        type:cc.Prefab
      },
      head:{
        default:null,
        type:Head
      },
      score:{
        default:null,
        type:cc.Label
    } 
    },

    init(game){
        this.game=game;
        this.head.init(this);
        this.node.setPosition(cc.v2(0, 0));
        this.arr=this.game.bg.arr;
        this.tapSound=this.game.tapSound;
        this.schedule(this.moveSnake, this.moveInterval);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },


    onKeyDown(event){
            switch (event.keyCode) {
                case cc.macro.KEY.left:
                    this.tapSound.play();
                    if(this.direction===1)return;
                    this.direction=3;
                    break;
                case cc.macro.KEY.right:
                    this.tapSound.play();
                    if(this.direction===3)return;
                    this.direction=1;
                    break;
                case cc.macro.KEY.up:
                    this.tapSound.play();
                    if(this.direction===2)return;
                    this.direction=0;
                    break;
                case cc.macro.KEY.down:
                    this.tapSound.play();
                    if(this.direction===0)return;
                    this.direction=2;
                    break;
            }        
    },

   // onLoad () {},

    start () {

    },

    moveSnake () {

        let prevPos=[];
        this.node.children.forEach(element => {
             prevPos.push(element.getPosition());
             this.markArray(element.getPosition(),this.arr);
        });

        let headPosition=this.node.children[0].getPosition();

        if(this.direction===3){
            headPosition.x-=this.game.bg.boxSize;
        }else if(this.direction===1){
            headPosition.x+=this.game.bg.boxSize;
        }else if(this.direction===0){
            headPosition.y+=this.game.bg.boxSize;
        }else{
            headPosition.y-=this.game.bg.boxSize;
        }

        if(headPosition.x<-cc.winSize.width/2)headPosition.x=cc.winSize.width/2;
        else if(headPosition.x>cc.winSize.width/2)headPosition.x=-cc.winSize.width/2;
        else if(headPosition.y<-cc.winSize.height/2)headPosition.y=cc.winSize.height/2;
        else if(headPosition.y>cc.winSize.height/2)headPosition.y=-cc.winSize.height/2;
      
        //Game End 
        if(!this.checkArray(headPosition,this.arr)){

            this.score.string=Globals.score;
            Globals.highscore = Math.max(Globals.score, Globals.highscore);

       
            this.unschedule(this.moveSnake);

            this.blinkCount=0;
            this.schedule(this.blink,0.5);
            
        }


        this.node.children[0].setPosition(headPosition);
      
        for(let i=1;i<this.node.children.length;i++){
            this.node.children[i].setPosition(prevPos[i-1]);
        }

        for(let cur of prevPos){
            this.unmarkArray(cur,this.arr);
        }
    },

    addBody(){
        let prevSegment=this.node.children[(this.node.children.length)-1];
        const newBody=cc.instantiate(this.body);
        if(this.direction==3) newBody.setPosition(prevSegment.getPosition().add(cc.v2(24,0)));
        else if(this.direction==0) newBody.setPosition(prevSegment.getPosition().add(cc.v2(0,-24)));
        else if(this.direction==1) newBody.setPosition(prevSegment.getPosition().add(cc.v2(-24,0)));
        else newBody.setPosition(prevSegment.getPosition().add(cc.v2(0,24)));
        this.node.addChild(newBody);
    },

    markArray(position,arr){
      let coordinates=this.game.bg.getGridCoordinatesByPosition(position);
      arr[coordinates.y][coordinates.x]=1;
    },

    checkArray(position,arr){
      let coordinates=this.game.bg.getGridCoordinatesByPosition(position);
      if(arr[coordinates.y][coordinates.x]===1)return false;
      else return true;
    },

    unmarkArray(position,arr){
        let coordinates=this.game.bg.getGridCoordinatesByPosition(position);
        arr[coordinates.y][coordinates.x]=0;
      },

      blink(){
        this.node.opacity=this.node.opacity===255? 0:255;
        this.blinkCount++;

        if(this.blinkCount>6){
            this.unschedule(this.blink);
            this.game.node.emit('end');
        }
      }
     
});
