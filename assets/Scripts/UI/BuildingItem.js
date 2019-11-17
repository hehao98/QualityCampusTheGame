// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let Globals = require("GlobalVariables");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        pageView: cc.PageView,
        button: cc.Button,
        id: 0,
        buildingPage: require("BuildingPage"),
    }),
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let that = this;
        this.pageView = Globals.UI.buildingListPageView;
        this.button = this.getComponent(cc.Button);
        this.button.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            that.pageView.scrollToPage(0, 1);
            that.buildingPage.showSelectedBuildingInfo(that.id);
        });
    },

    // update (dt) {},
});
