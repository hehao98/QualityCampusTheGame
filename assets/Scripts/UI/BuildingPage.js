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
let BuildingSpecifications = require("BuildingSpecifications");
let BuildingIconsDict = new Array();
let BuildingPicturesDict = new Array();
let selectedBuildingId = 0;

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
        specificationPrefab: cc.Prefab,
        layoutPanel: cc.Node,
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Globals.UI.buildingListPageView = this.pageView;
    },

    start () {
        let buildingTypeArr = ["dorm", "teaching", "cafeteria", "lab"];
        for (let i = 0; i < buildingTypeArr.length; ++i) {
            let iconUrl = "Icons/" + buildingTypeArr[i];
            let that = this;
            cc.loader.loadRes(iconUrl, cc.SpriteFrame, function (err, spriteFrame) {
                BuildingIconsDict[buildingTypeArr[i]] = spriteFrame;
                let buildingLists = that.game.buildingManager.getBuildingLists();
                let buildingListSize = buildingLists.length;
                if (buildingListSize > 0) {
                    that.showSelectedBuildingInfo(0);
                }
            });
        }

        for (let i = 0; i < buildingTypeArr.length; ++i) {
            let iconUrl = "Pictures/" + buildingTypeArr[i];
            let that = this;
            cc.loader.loadRes(iconUrl, cc.SpriteFrame, function (err, spriteFrame) {
                BuildingPicturesDict[buildingTypeArr[i]] = spriteFrame;
                let buildingLists = that.game.buildingManager.getBuildingLists();
                let buildingListSize = buildingLists.length;
                if (buildingListSize > 0) {
                    that.showSelectedBuildingInfo(0);
                }
            });
        }

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
            
            let buildingSprite = node.getChildByName("BuildingSprite").getComponent(cc.Sprite);
            buildingSprite.spriteFrame = BuildingIconsDict[building.type];
            let buildingName = node.getChildByName("BuildingName").getComponent(cc.Label);
            buildingName.string = building.name;
            let buildingLevel = node.getChildByName("BuildingLevel").getComponent(cc.Label);
            buildingLevel.string = utilities.numberToRoman(building.tier + 1);
            this.contentPanel.addChild(node);
        }
    },

    showSelectedBuildingInfo (id) {
        selectedBuildingId = id;
        let node = this.buildingInfoPage;
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let building = buildingLists[id];
        let buildingSprite = node.getChildByName("BuildingIconSprite").getComponent(cc.Sprite);
        buildingSprite.spriteFrame = BuildingIconsDict[building.type];
        let buildingName = node.getChildByName("BuildingName").getComponent(cc.Label);
        buildingName.string = building.name;
        let buildingLevel = node.getChildByName("BuildingLevel").getComponent(cc.Label);
        buildingLevel.string = utilities.numberToRoman(building.tier + 1);
        let buildingPicture = node.getChildByName("BuildingPhoto").getComponent(cc.Sprite);
        buildingPicture.spriteFrame = BuildingPicturesDict[building.type];
        let buildingDescription = node.getChildByName("Description").getComponent(cc.Label);
        buildingDescription.string = BuildingSpecifications[building.type][building.tier]["defaultProperties"]["description"];
        let buildingEffects = node.getChildByName("Effects").getComponent(cc.Label);
        buildingEffects.string = BuildingSpecifications[building.type][building.tier]["defaultProperties"]["effects"];
    },

    // update (dt) {},
    changeToBuildNewBuildingPage (event, customEventData) {
        this.pageView.scrollToPage(Number.parseInt(customEventData), 1);
        this.showBuildNewBuildingPage();
    },

    showBuildNewBuildingPage () {
        let buildingTypeArr = ["dorm", "teaching", "cafeteria", "lab"];
        this.layoutPanel.removeAllChildren();
        for (let i = 0; i < buildingTypeArr.length; ++i) {
            let buildingProperties = BuildingSpecifications[buildingTypeArr[i]][0]["defaultProperties"];
            let node = cc.instantiate(this.specificationPrefab);
            node.on("click", this.addBuilding, this);
            node.name = buildingTypeArr[i];
            let buildingPicture = node.getChildByName("BuildingPhoto").getComponent(cc.Sprite);
            buildingPicture.spriteFrame = BuildingPicturesDict[buildingTypeArr[i]];
            let buildingSprite = node.getChildByName("BuildingSprite").getComponent(cc.Sprite);
            buildingSprite.spriteFrame = BuildingIconsDict[buildingTypeArr[i]];
            let buildingName = node.getChildByName("BuildingNameLabel").getComponent(cc.Label);
            buildingName.string = buildingTypeArr[i];
            let resourceInfoNode = node.getChildByName("ResourceInfo");
            let buildingFund = resourceInfoNode.getChildByName("FundLabel").getComponent(cc.Label);
            buildingFund.string = buildingProperties["fundToCurrentTier"];
            let buildingCapacity = resourceInfoNode.getChildByName("InfluenceLabel").getComponent(cc.Label);
            buildingCapacity.string = buildingProperties["capacity"];
            this.layoutPanel.addChild(node);
        }
    },

    upgradeSelectedBuilding () {
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let succeeded = this.game.buildingManager.upgrade({id: selectedBuildingId, type: buildingLists[selectedBuildingId].type, freeOfCharge: false});
    },
    
    addBuilding(button) {
        let buildingType = button.node.name;
        this.game.buildingManager.add({type: buildingType, freeOfCharge: false});
    }
});
