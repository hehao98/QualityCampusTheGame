let assert = require("assert");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        overallSatisfactionLabel: cc.Label,
        studySatisfactionLabel: cc.Label,
        relaxationSatisfactionLabel: cc.Label,
        studyIndexLabel: cc.Label,
        studentNumberLabel: cc.Label,
        studentQualityLabel: cc.Label,
        slider: cc.Slider
    }),

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.slider = this.getComponentInChildren(cc.Slider);
    },

    updatePanel() {
        this.overallSatisfactionLabel.string =
            "总体满意度：" + this.game.studentSatisfaction.toFixed(3);
        this.studySatisfactionLabel.string =
            "学习满意度：" +
            this.game.studentManager.getOverallIndex("studySatisfaction").toFixed(3);
        this.relaxationSatisfactionLabel.string =
            "生活满意度：" +
            this.game.studentManager.getOverallIndex("livingConditionSatisfaction").toFixed(3);
        this.studyIndexLabel.string =
            "学业水平：" + this.game.studentManager.getOverallIndex("studyIndex").toFixed(3);
        this.studentNumberLabel.string = "计划招生目标/最大招生容量：" 
            + this.game.admissionManager.admissionTarget
            + "/" + this.game.buildingManager.getMaxStudentCapacity();
        this.slider.progress =
            this.game.admissionManager.admissionTarget /
            this.game.buildingManager.getMaxStudentCapacity();
        assert(this.slider.progress <= 1 && this.slider.progress >= 0);
    },

    updateAdmissionStrategy(slider) {
        let maxStudent = this.game.buildingManager.getMaxStudentCapacity();
        this.game.admissionManager.setTarget(Math.floor(maxStudent * slider.progress));
    }
});
