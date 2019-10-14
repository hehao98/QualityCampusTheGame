let Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        game: Game,
        timeLabel: cc.Label,
        chosenColor: cc.Color,
        notChosenColor: cc.Color,
        buttonBackgrounds: [cc.Node],
        currentHighlightBtn: 2,
    },

    start () {

    },

    update (dt) {
        let mapping = {
            2: 1,
            1: 2,
            0.5: 3,
            0.25: 4,
        }

        this.timeLabel.string = this.game.timeString;
        this.currentHighlightBtn = mapping[this.game.speedModifier];
        if (this.game.isPaused) this.currentHighlightBtn = 0;

        for (let i = 0; i < this.buttonBackgrounds.length; ++i) {
            this.buttonBackgrounds[i].color = this.notChosenColor;
        }
        this.buttonBackgrounds[this.currentHighlightBtn].color = this.chosenColor; 
    },
});
