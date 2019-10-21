// The class that implements all main menu related functions

cc.Class({
    extends: cc.Component,

    properties: {
        loadingWindow: cc.Node,
        loadingLabel: cc.Label,
    },

    start () {},

    startGame() {
        cc.director.preloadScene("Game", () => {
            cc.director.loadScene("Game");
        });
        this.loadingWindow.active = true;
        let label = this.loadingLabel;
        let cnt = 1;
        label.schedule(() => {
            label.string = "加载中";
            for (let i = 0; i < cnt % 4; ++i) {
                label.string += ".";
            }
            cnt += 1;
        }, 0.5);
    }
});
