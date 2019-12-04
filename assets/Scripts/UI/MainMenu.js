// The class that implements all main menu related functions

let Globals = require("GlobalVariables");

cc.Class({
    extends: cc.Component,

    properties: {
        configWindow: cc.Node,
        loadingWindow: cc.Node,
        licenseWindow: cc.Node,
        loadingLabel: cc.Label,
        universityNameInput: cc.EditBox,
    },

    start () {},

    showConfigWindow() {
        this.configWindow.active = true;
    },

    startGame() {
        this.loadingWindow.active = true;
        this.configWindow.active = false;

        if (this.universityNameInput.string === "") {
            Globals.universityName = this.universityNameInput.placeholder;
        } else {
            Globals.universityName = this.universityNameInput.string;
        }
        
        cc.director.preloadScene("Game", function () {
            console.log("Game Main Scene Preloaded!");
            cc.director.loadScene("Game");
        });
    },

    openOfficialWebsite() {
        window.open("https://hehao98.github.io/portfolio/quality-campus/");
    },

    openGitRepository() {
        window.open("https://github.com/hehao98/QualityCampusTheGame");
    },

    openLicenseWindow() {
        this.licenseWindow.active = !this.licenseWindow.active;
    }
});
