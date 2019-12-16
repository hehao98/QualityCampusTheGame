let Utilities = require("utilities");
let ProfessorManager = require("ProfessorManager");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        popupManager: require("PopupManager"),
        professorNumberLabel: cc.Label,
        addProfessorLabel: cc.Label,
        studentProfessorRatioLabel: cc.Label,
        studentProfessorRatioBuffLabel: cc.Label,
        teachingLevelLabel: cc.Label,
        upgradeTeachingLevelLabel: cc.Label,
        teachLevelBuffLabel: cc.Label,
        careerLevelLabel: cc.Label,
        upgradeCareerLevelLabel: cc.Label,
        careerLevelBuffLabel: cc.Label,
        researchLevelLabel: cc.Label,
        upgradeResearchLevelLabel: cc.Label,
        researchLevelBuffLabel: cc.Label,
    }),

    updatePanel () {
        this.professorNumberLabel.string = this.game.professorManager.number;
        this.addProfessorLabel.string = "升级(" + this.game.professorManager.getRecruitCost() + "万)";
        this.studentProfessorRatioLabel.string = this.game.professorManager.number + "/" + this.game.studentManager.students.length;

        this.teachingLevelLabel.string = "等级" + Utilities.numberToRoman(this.game.professorManager.teachLevel + 1);
        this.careerLevelLabel.string = "等级" + Utilities.numberToRoman(this.game.professorManager.careerLevel + 1);
        this.researchLevelLabel.string = "等级" + Utilities.numberToRoman(this.game.professorManager.researchLevel + 1);

        this.upgradeTeachingLevelLabel.string = "升级(" + ProfessorManager.LEVEL_UPGRADE_COST[this.game.professorManager.teachLevel] + "万)";
        this.upgradeCareerLevelLabel.string = "升级(" + ProfessorManager.LEVEL_UPGRADE_COST[this.game.professorManager.careerLevel] + "万)";
        this.upgradeResearchLevelLabel.string = "升级(" + ProfessorManager.LEVEL_UPGRADE_COST[this.game.professorManager.researchLevel] + "万)";

        let boost = (this.game.professorManager.getProfNumberBoost() * 100 - 100).toFixed(2);
        if (boost >= 0) {
            this.studentProfessorRatioBuffLabel.node.color = cc.Color.GREEN;
            boost = "+" + boost;
        } else { 
            this.studentProfessorRatioBuffLabel.node.color = cc.Color.RED;
        }
        this.studentProfessorRatioBuffLabel.string = "全部Buff效果" + boost + "%";

        let effect = this.game.professorManager.getEffect();
        this.setBuffString(this.teachLevelBuffLabel, "教学指数+", effect.teachIndexBoost);
        this.setBuffString(this.careerLevelBuffLabel, "生涯指数+", effect.careerIndexBoost);
        this.setBuffString(this.researchLevelBuffLabel, "科研指数+", effect.researchIndexBoost);
    },

    setBuffString(label, prefix, effect) {
        let str = (effect * 100).toFixed(2) + "%";
        label.node.color = cc.Color.GREEN;
        label.string = prefix + str;
    },

    addNewProfessor() {
        if (this.game.professorManager.recruitProfessor() === false) {
            this.popupManager.showPopup("经费不足，无法招募！");
        }
    },

    upgradeLevel(event, customEventData) {
        let type = customEventData;
        if (this.game.professorManager.upgradeLevel(type) === false) {
            this.popupManager.showPopup("升级失败！");
        }
    },
});
