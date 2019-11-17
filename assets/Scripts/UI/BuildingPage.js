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
let utilities = require("utilities");
let BuildingItem = require("BuildingItem");

cc.Class({
    extends: cc.Component,

    properties: () => ({
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        pageView: {
            default: null, 
            type: cc.PageView,
        },
        game: require("Game"),
        contentPanel: cc.Node,
        itemPrefab: cc.Prefab,
        buildingInfoPage: cc.Node,
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Globals.UI.buildingListPageView = this.pageView;
    },

    start () {
        this.updateBuildingListInfo();
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let buildingListSize = buildingLists.length;
        if (buildingListSize > 0) {
            this.showSelectedBuildingInfo(0);
        }
    },

    updateBuildingListInfo () {
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let buildingListSize = buildingLists.length;
        this.contentPanel.removeAllChildren();
        for (let i = 0; i < buildingListSize; ++i) {
            let building = buildingLists[i];
            let node = cc.instantiate(this.itemPrefab);
            let buildingItem = node.getComponent(BuildingItem);
            buildingItem.id = building.id;
            buildingItem.buildingPage = this;
            let buildingName = node.getChildByName("BuildingName").getComponent(cc.Label);
            buildingName.string = building.type;
            let buildingLevel = node.getChildByName("BuildingLevel").getComponent(cc.Label);
            buildingLevel.string = utilities.numberToRoman(building.tier + 1);
            this.contentPanel.addChild(node);
        }
    },

    showSelectedBuildingInfo (id) {
        let node = this.buildingInfoPage;
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let building = buildingLists[id];
        let buildingName = node.getChildByName("BuildingName").getComponent(cc.Label);
        buildingName.string = building.type;
        let buildingLevel = node.getChildByName("BuildingLevel").getComponent(cc.Label);
        buildingLevel.string = utilities.numberToRoman(building.tier + 1);
        let buildingDescription = node.getChildByName("Description").getComponent(cc.Label);
        buildingDescription.string = "xxxxxx";
        let buildingEffects = node.getChildByName("Effects").getComponent(cc.Label);
        buildingEffects.string = "000000";
    },

    // update (dt) {},
    changeToBuildNewBuildingPage (event, customEventData) {
        this.pageView.scrollToPage(Number.parseInt(customEventData), 1);
    },
    
});
