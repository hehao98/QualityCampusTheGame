cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        labels: [cc.Label]
    }),

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {},

    updatePanel() {
        this.labels.forEach(label => {
            let value = 0;
            switch (label.node.name) {
            case "TotalResourceLabel":
                value = this.game.fund.value;
                label.string = value + "万";
                return;
            case "TotalResourceChangeLabel":
                value = this.game.fund.getWeeklyModification();
                break;
            case "FixedIncomeLabel":
                value = this.game.fund.getWeeklyModification("fixed");
                break;
            case "BuildingIncomeLabel":
                value = this.game.fund.getWeeklyGain("building");
                break;
            case "BuildingCostLabel":
                value = this.game.fund.getWeeklyCost("building");
                break;
            case "StudentIncomeLabel":
                value = this.game.fund.getWeeklyGain("student");
                break;
            case "TeacherCostLabel":
                value = this.game.fund.getWeeklyCost("teacher");
                break;
            }

            if (value > 0) {
                label.node.color = cc.Color.GREEN;
                label.string = "+" + value;
            } else if (value < 0) {
                label.node.color = cc.Color.RED;
                label.string = value;
            } else {
                label.node.color = cc.Color.WHITE;
                label.string = value;
            }
            label.string += "万";
        }, this);
    }
});
