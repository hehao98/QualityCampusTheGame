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
    },

    update() {
        if (Globals.TEST_MODE) {
            if (this.game.currentTick === this.currentTick) {
                return;
            } 
            this.game.teachIndex += 10;
            this.game.researchIndex += 10;
            this.game.careerIndex += 10;
            //this.game.studentSatisfaction = this.game.studentSatisfaction + 0.1;
            this.game.professorSatisfaction = (this.game.professorSatisfaction + 10) % 100;
            this.currentTick = this.game.currentTick;
        }
    },
});
