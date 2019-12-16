// The class that control the resource panel

let Game = require("Game");

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

        this.researchIndexLabel.string = this.game.researchIndex.toFixed(2);
        this.teachIndexLabel.string = this.game.teachIndex.toFixed(2);
        this.careerIndexLabel.string = this.game.careerIndex.toFixed(2);
        this.studentNumberLabel.string = this.game.studentManager.students.length;
        this.professorNumberLabel.string = this.game.professorManager.number;

        let rank = this.game.worldRankManager.getCurrentRanking(this.game.universityName);
        let total = this.game.worldRankManager.getUniversityCount();
        this.worldRankLabel.string = rank + "/" + total;

        this.statusLabel.string = "目标：" + this.game.gameObjectives[this.game.currentObjective].nameShort;
    },
});
