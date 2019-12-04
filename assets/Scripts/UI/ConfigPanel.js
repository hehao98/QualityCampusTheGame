
cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        popupManager: require("PopupManager"),
        achievementLabel: cc.Label,
    }),

    updateAcheivementPanel() {

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
