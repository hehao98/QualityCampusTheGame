// The class that implements all main menu related functions

cc.Class({
    extends: cc.Component,

    properties: {},

    start () {},

    startGame() {
        cc.director.loadScene("Game");
    }
});
