// The class that controls the game objective ui panel
cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        targetLabel: cc.Label,
        teachPanel: cc.Node,
        researchPanel: cc.Node,
        careerPanel: cc.Node,
        studentSatisfactionPanel: cc.Node,
        professorSatisfactionPanel: cc.Node,
        labels: Object,
        bars: Object,
        panels: [String],
        progressBars: [cc.ProgressBar]
    }),

    // LIFE-CYCLE CALLBACKS:

    start() {
        this.labels = {};
        this.bars = {};
        this.panels = [
            ["teachPanel", "teachIndex"],
            ["researchPanel", "researchIndex"],
            ["careerPanel", "careerIndex"],
            ["studentSatisfactionPanel", "studentSatisfaction"],
            ["professorSatisfactionPanel", "professorNumber"]
        ];

        this.panels.forEach(x => {
            this.labels[x[0]] = this[x[0]]
                .getComponentsInChildren(cc.Label)
                .filter(label => label.node.name.includes("Value"))[0];
            this.bars[x[0]] = this[x[0]].getComponentInChildren(cc.ProgressBar);
        }, this);

        this.progressBars = this.getComponentsInChildren(cc.ProgressBar);
    },

    updatePanel() {
        if (this.game.currentObjective >= this.game.gameObjectives.length) {
            return;
        }
        this.targetLabel.string =
            "目标：" +
            this.game.gameObjectives[this.game.currentObjective].name;

        this.panels.forEach(x => {
            let current = this.game[x[1]];
            let target = this.game.gameObjectives[this.game.currentObjective]
                .thresholds[x[1]];
            this.labels[x[0]].string = current.toFixed(2) + "/" + target;
            this.bars[x[0]].progress = current / target;
        });

        this.progressBars.forEach(bar => {
            bar.totalLength = this.node.width;
        }, this);
    }
});
