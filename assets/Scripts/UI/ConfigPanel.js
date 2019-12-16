let Utilities = require("utilities");
let Globals = require("GlobalVariables");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        popupManager: require("PopupManager"),
        achievementLabel: cc.Label,
    }),

    getSatisfactionDescription() {
        if (this.game.studentSatisfaction < 0.4) {
            return "他们对您的管理非常愤怒，认为你是有史以来最差的校长。";
        } else if (this.game.studentSatisfaction < 0.6) {
            return "他们对您的管理有点不满意";
        } else if (this.game.studentSatisfaction < 0.8) {
            return "他们对您的管理有点满意";
        } else {
            return "他们对您的管理非常满意，认为你是有史以来最好的校长";
        }
    },

    updatePanel() {
        let strings = [
            `今天是您担任${this.game.universityName}校长的第${Math.floor(this.game.currentTick / Globals.TICKS_DAY)}天。\n\n`,
            `您用各种手段一共获得了${this.game.fund.totalEarned}万资金，`,
            `并总共花费或者浪费了${this.game.fund.totalSpent}万资金。\n\n`,
            `您的大学现在有${this.game.studentManager.students.length}名学生，`,
            `${this.game.professorManager.number}名教师，`,
            `目前世界排名${this.game.worldRankManager.getPlayerRanking()}名`,
            `是公认的世界${Utilities.numberToChinese(6 - this.game.currentObjective)}流大学。\n\n`,
            `在任上，学生们一共发了${this.game.pkuHoleManager.nextPostID}条树洞，您处理了${this.game.eventManager.nextEventId}个舆论事件。\n\n`,
            `学生们现在的满意度为${this.game.studentSatisfaction.toFixed(3)}，`,
            this.getSatisfactionDescription(),
        ];
        this.achievementLabel.string = strings.reduce((prev, curr) => (prev + curr));
    },

    openTutorial() {
        window.open("https://hehao98.github.io/posts/2019/12/quality-campus-tutorial/");
    },

    retartGame() {
        this.popupManager.showMessageBox(
            "确定要重新开始游戏嘛？\n当前的所有进度会丢失",
            () => {
                cc.director.loadScene("Game");
            },
            () => {},
            this
        );
    },

    goToMainMenu() {
        this.popupManager.showMessageBox(
            "确定要回到主菜单嘛？\n当前的所有进度会丢失",
            () => {
                cc.director.loadScene("MainMenu");
            },
            () => {},
            this
        );
    },

    openOfficialWebsite() {
        window.open("https://hehao98.github.io/portfolio/quality-campus/");
    },

    openGitHubRepository() {
        this.popupManager.showMessageBox(
            "要是能在GitHub上赏一些Star就更好了~",
            () => {
                window.open("https://github.com/hehao98/QualityCampusTheGame");
            },
            () => {
                window.open("https://github.com/hehao98/QualityCampusTheGame");
            },
            this
        );
    },

    provideFeedback() {
        this.popupManager.showMessageBox(
            "如果您有任何问题，请直接在GitHub仓库里提Issue~",
            () => {
                window.open("https://github.com/hehao98/QualityCampusTheGame/issues");
            },
            () => {
            },
            this
        );
    }
});
