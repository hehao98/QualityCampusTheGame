// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let Game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        game: Game,
        fundLabel: cc.Label,
        fundChangeLabel: cc.Label,
        influenceLabel: cc.Label,
        influenceChangeLabel: cc.Label,
    },

    update () { 
        this.fundLabel.string = this.game.fund.value + "万";
        let value = this.game.fund.getModificationAmount();
        let suffix = "+";
        if (value >= 0) {
            this.fundChangeLabel.node.color = cc.Color.GREEN;
        } else {
            this.fundChangeLabel.node.color = cc.Color.RED;
            suffix = "-";
        }
        this.fundChangeLabel.string = "(" + suffix + value + ")";

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
    },
});
