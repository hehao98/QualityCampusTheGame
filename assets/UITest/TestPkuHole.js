let Globals = require("GlobalVariables");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        currentTick: 0
    }),

    // LIFE-CYCLE CALLBACKS:
    
    onLoad() {
        Globals.TEST_MODE = true;
    },

    start() {
        this.currentTick = this.game.currentTick;
        this.game.speedModifier = 0.1;
    },

    update() {
        if (Globals.TEST_MODE) {
            if (this.game.currentTick === this.currentTick) {
                return;
            } 
            this.currentTick = this.game.currentTick;
        }
    },
});
