// The class that implements all main menu related functions

let Globals = require("Globals");

cc.Class({
    extends: cc.Component,

    properties: {
        configWindow: cc.Node,
        loadingWindow: cc.Node,
        loadingLabel: cc.Label,
        universityNameInput: cc.EditBox,
    },

    start () {},

    showConfigWindow() {
        this.configWindow.active = true;
    },

    startGame() {
        if (this.universityNameInput.string === "") {
            Globals.universityName = this.universityNameInput.placeholder;
        } else {
            Globals.universityName = this.universityNameInput.string;
        }
        
        this.node.active = false;

        cc.director.preloadScene("Game", () => {
            cc.director.loadScene("Game");
        });
        this.loadingWindow.active = true;
        let label = this.loadingLabel;
        let count = 1;
        label.schedule(() => {
            label.string = "加载中";
            for (let i = 0; i < count % 4; ++i) {
                label.string += ".";
            }
            count += 1;
        }, 0.5);
    }
});
