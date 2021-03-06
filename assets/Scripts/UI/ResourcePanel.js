// The class that control the resource panel

let Game = require("Game");
let Utilities = require("utilities");

cc.Class({
    extends: cc.Component,

    properties: {
        game: Game,
        fundLabel: cc.Label,
        fundChangeLabel: cc.Label,
        statusLabel: cc.Label,
        worldRankLabel: cc.Label,
        researchIndexLabel: cc.Label,
        teachIndexLabel: cc.Label,
        careerIndexLabel: cc.Label,
        studentNumberLabel: cc.Label,
        professorNumberLabel: cc.Label,
    },

    updatePanel () { 
        if (this.game.isPaused) return;
        this.fundLabel.string = this.game.fund.value + "万";
        let value = this.game.fund.getWeeklyModification();
        let suffix = "+";
        if (value >= 0) {
            this.fundChangeLabel.node.color = cc.Color.GREEN;
        } else {
            this.fundChangeLabel.node.color = cc.Color.RED;
            suffix = "";
        }
        this.fundChangeLabel.string = "(" + suffix + value + "万)";

        this.researchIndexLabel.string = Utilities.numberToPercentage(this.game.researchIndex, 1);
        this.teachIndexLabel.string = Utilities.numberToPercentage(this.game.teachIndex, 1);
        this.careerIndexLabel.string = Utilities.numberToPercentage(this.game.careerIndex, 1);
        this.studentNumberLabel.string = this.game.studentManager.students.length;
        this.professorNumberLabel.string = this.game.professorManager.number;

        let rank = this.game.worldRankManager.getPlayerRanking();
        let total = this.game.worldRankManager.getUniversityCount();
        this.worldRankLabel.string = rank + "/" + total;

        if (this.game.currentObjective < this.game.gameObjectives.length)
            this.statusLabel.string = "目标：" + this.game.gameObjectives[this.game.currentObjective].nameShort;
    },
});
