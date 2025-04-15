let Globals=require('Globals');
let Game=require('Game');
cc.Class({
    extends: cc.Component,

    properties: {
       play:{
        default:null,
        type:cc.Node
       },
       audio:{
        default:null,
        type:cc.Node
       },
       highscore:{
        default:null,
        type:cc.Node
       },
       game:{
        default:null,
        type:cc.Node
       }
    },


     //onLoad () {},

    start () {
        this.tapSound=this.node.getComponents(cc.AudioSource)[1];

       this.hspopup=this.node.getChildByName('highscorePopup');
       this.home_btn=this.hspopup.getChildByName('home');
       this.hs=this.hspopup.getChildByName('hs');
       this.hs.getComponent(cc.Label).string=Globals.highscore;

       this.audiopopup=this.node.getChildByName('audioPopup');
       this.home_btn2=this.audiopopup.getChildByName('home');
       this.music_btn=this.audiopopup.getChildByName('music');
       this.sfx_btn=this.audiopopup.getChildByName('sfx');
    },

    onHomeClick1(){
            this.tapSound.play();
            this.hspopup.active=false;
    },

    onHomeClick2(){
            this.tapSound.play();
            this.audiopopup.active=false;
    },

    onHighScoreClick(){
            this.tapSound.play();  
            this.hspopup.active=true;
    },

    onPlayClick(){
             this.tapSound.play();
            cc.director.loadScene('Game');
             Globals.score=0;
    },

    onAudioClick(){
            this.tapSound.play();
            this.audiopopup.active=true;
    },

    onMusicClick(){
            if(!Globals.homeMute){
                this.music_btn.getChildByName('Background').getComponent(cc.Sprite).node.color=new cc.Color(255, 0, 0);
                this.node.getComponents(cc.AudioSource)[0].mute=true;
                Globals.homeMute=true;
            }else{
                this.music_btn.getChildByName('Background').getComponent(cc.Sprite).node.color=cc.Color.GREEN;
                this.node.getComponents(cc.AudioSource)[0].mute=false;
                Globals.homeMute=false;
                this.tapSound.play();
            }
    },

    onSFXClick(){
            if(!Globals.tapMute){
                this.sfx_btn.getChildByName('Background').getComponent(cc.Sprite).node.color=new cc.Color(255, 0, 0);
                this.node.getComponents(cc.AudioSource)[1].mute=true;
                Globals.tapMute=true;
            }else{
                this.sfx_btn.getChildByName('Background').getComponent(cc.Sprite).node.color=cc.Color.GREEN;
                this.node.getComponents(cc.AudioSource)[1].mute=false;
                Globals.tapMute=false;
                this.tapSound.play();
            }
    }

    // update (dt) {},
});
