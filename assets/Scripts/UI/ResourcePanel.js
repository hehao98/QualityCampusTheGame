// The class that control the resource panel

let Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        game: Game,
        fundLabel: cc.Label,
        fundChangeLabel: cc.Label,
        influenceLabel: cc.Label,
        influenceChangeLabel: cc.Label,
        statusLabel: cc.Label,
        worldRankLabel: cc.Label,
        researchIndexLabel: cc.Label,
        teachIndexLabel: cc.Label,
        careerIndexLabel: cc.Label,
        studentSatisfactionLabel: cc.Label,
        professorSatisfactionLabel: cc.Label,
    },

    updatePanel () { 
        if (this.game.isPaused) return;
        this.fundLabel.string = this.game.fund.value + "万";
        let value = this.game.fund.getModificationAmount();
        let suffix = "+";
        if (value >= 0) {
            this.fundChangeLabel.node.color = cc.Color.GREEN;
        } else {
            this.fundChangeLabel.node.color = cc.Color.RED;
            suffix = "-";
        }
        this.fundChangeLabel.string = "(" + suffix + value + "万)";

        value = this.game.influence.getModificationAmount();
        if (value >= 0) {
            this.influenceChangeLabel.node.color = cc.Color.GREEN;
            suffix = "+";
        } else {
            this.influenceChangeLabel.node.color = cc.Color.RED;
            suffix = "-";
        }
        this.influenceLabel.string = this.game.influence.value;
        this.influenceChangeLabel.string = "(" + suffix + value + ")";

        this.researchIndexLabel.string = this.game.researchIndex;
        this.teachIndexLabel.string = this.game.teachIndex;
        this.careerIndexLabel.string = this.game.careerIndex;
        this.studentSatisfactionLabel.string = this.game.studentSatisfaction;
        this.professorSatisfactionLabel.string = this.game.professorSatisfaction;

        let rank = this.game.worldRankManager.getCurrentRanking(this.game.universityName);
        let total = this.game.worldRankManager.getUniversityCount();
        this.worldRankLabel.string = rank + "/" + total;

        this.statusLabel.string = this.game.gameObjectives[this.game.currentObjective].nameShort;
    },
});
