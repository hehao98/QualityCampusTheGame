let Globals = require("GlobalVariables");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        worldRankPanel: require("WorldRankPanel"),
        currentTick: 0,
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Globals.TEST_MODE = true;
    },

    start () {
        this.currentTick = this.game.currentTick;
    },

    update () {
        if (Globals.TEST_MODE) {
            if (this.game.currentTick === this.currentTick) {
                return;
            } 
            this.game.researchIndex += 10;
            this.game.teachIndex += 10;
            this.game.careerIndex += 10;
            this.game.worldRankManager.updateRanking();
            this.worldRankPanel.updateInfo();
            this.currentTick = this.game.currentTick;
        }
    },
});
