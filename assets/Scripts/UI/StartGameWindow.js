// Script to manage the start game window

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        universityName: cc.EditBox,
    }),

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    startGame() {
        if (this.universityName.string === "") {
            this.game.universityName = this.universityName.placeholder;
        } else {
            this.game.universityName = this.universityName.string;
        }
        
        this.node.active = false;
        this.game.initGame();
        this.game.isPaused = false;
    }
});
