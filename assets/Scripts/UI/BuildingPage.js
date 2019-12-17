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
let BuildingComponentSpecifications = require("BuildingComponentSpecifications");
let BuildingIconsDict = new Array();
let BuildingPicturesDict = new Array();
let infoPicturesDict = new Array();
let selectedBuildingId = 0;
let selectedComponentId = -1;
let selectedCompType = null;
const _ = require("lodash");
let ComponentSpecificationItem = require("ComponentSpecificationItem");
let ComponentItem = require("ComponentItem");

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
        popupManager: require("PopupManager"),
        componentPrefab: cc.Prefab,
        componentLayout: cc.Node,
        addComponentPanel: cc.Node,
        componentSpecificationPrefab: cc.Prefab,
        deleteComponentButton: cc.Button,
        deleteComponentButtonLabel: cc.Label,
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Globals.UI.buildingListPageView = this.pageView;
    },

    start() {
        let buildingTypeArr = ["dorm", "teaching", "cafeteria", "lab", "careerCenter"];
        let buildingTypeLevels = new Array();
        buildingTypeLevels["dorm"] = 6;
        buildingTypeLevels["teaching"] = 6;
        buildingTypeLevels["cafeteria"] = 5;
        buildingTypeLevels["lab"] = 3;
        buildingTypeLevels["careerCenter"] = 3;
        for (let i = 0; i < buildingTypeArr.length; ++i) {
            let iconUrl = "Icons/" + buildingTypeArr[i];
            let that = this;
            cc.loader.loadRes(iconUrl, cc.SpriteFrame, function (err, spriteFrame) {
                BuildingIconsDict[buildingTypeArr[i]] = spriteFrame;
            });
        }

        for (let i = 0; i < buildingTypeArr.length; ++i) {
            let pictureUrl = "Pictures/" + buildingTypeArr[i];
            let that = this;
            cc.loader.loadRes(pictureUrl, cc.SpriteFrame, function (err, spriteFrame) {
                BuildingPicturesDict[buildingTypeArr[i]] = spriteFrame;
            });

            let levels = buildingTypeLevels[buildingTypeArr[i]];
            for (let j = 0; j < levels; j++) {
                let url = "Pictures/" + buildingTypeArr[i] + j;
                cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                    infoPicturesDict[buildingTypeArr[i] + j] = spriteFrame;
                });
            }
        }

        this.updateBuildingListInfo();
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let buildingListSize = buildingLists.length;
        if (buildingListSize > 0) {
            this.showSelectedBuildingInfo(0);
        }
    },

    updateBuildingListInfo() {
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
            let studentNumber = node.getChildByName("StudentNumberLabel").getComponent(cc.Label);
            studentNumber.string = "当前学生人数/建筑容量:" + building.nStudent + "/" + building.capacity;
            let buildingProgressBar = node.getChildByName("BuildingProgressBar").getComponent(cc.ProgressBar);
            buildingProgressBar.node.active = false;
            if (building.buildingEndTime || building.upgradingEndTime) {
                if (building.buildingEndTime > building.upgradingEndTime) {
                    this.checkIsBuilding(buildingProgressBar, building);
                } else {
                    this.checkIsUpgrading(buildingProgressBar, building);
                }
            }
            this.contentPanel.addChild(node);
            if (building.upgradingEndTime !== 0 && Globals.tick === building.upgradingEndTime + 1 && building.id === selectedBuildingId) {
                this.showSelectedBuildingInfo(this.selectedBuildingId);
            }
        }
    },

    showSelectedBuildingInfo(id) {
        if (this.addComponentPanel.active) {
            this.addComponentPanel.active = !this.addComponentPanel.active;
        }
        this.selectedBuildingId = id;
        let node = this.buildingInfoPage;
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let building = buildingLists[id];
        let buildingSprite = node.getChildByName("BuildingIconSprite").getComponent(cc.Sprite);
        buildingSprite.spriteFrame = BuildingIconsDict[building.type];
        let buildingName = node.getChildByName("BuildingName").getComponent(cc.Label);
        buildingName.string = building.name;
        let buildingLevel = node.getChildByName("BuildingLevel").getComponent(cc.Label);
        buildingLevel.string = "等级" + utilities.numberToRoman(building.tier + 1);
        let buildingPicture = node.getChildByName("BuildingPhoto").getComponent(cc.Sprite);
        buildingPicture.spriteFrame = infoPicturesDict[building.type + building.tier];
        let buildingDescription = node.getChildByName("Description").getComponent(cc.Label);
        buildingDescription.string = BuildingSpecifications[building.type][building.tier]["defaultProperties"]["description"];
        let buildingEffects = node.getChildByName("Effects").getComponent(cc.Label);
        buildingEffects.string = building.effects;
        this.selectedComponentId = -1;
        this.deleteComponentButtonLabel.string = "删除组件";
        this.showSelectedBuildingComponent(id);
    },

    // update (dt) {},
    changeToBuildNewBuildingPage(event, customEventData) {
        this.pageView.scrollToPage(Number.parseInt(customEventData), 1);
        this.showBuildNewBuildingPage();
    },

    showBuildNewBuildingPage() {
        let buildingTypeArr = ["dorm", "teaching", "cafeteria", "lab", "careerCenter"];
        let buildingChineseName = ["宿舍", "教学楼", "食堂", "实验室", "职业发展中心"];
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
            buildingName.string = buildingChineseName[i];
            let resourceInfoNode = node.getChildByName("ResourceInfo");
            let buildingFund = resourceInfoNode.getChildByName("FundLabel").getComponent(cc.Label);
            buildingFund.string = buildingProperties["fundToCurrentTier"];
            let buildingCapacity = resourceInfoNode.getChildByName("InfluenceLabel").getComponent(cc.Label);
            buildingCapacity.string = buildingProperties["capacity"];
            this.layoutPanel.addChild(node);
        }
    },

    upgradeSelectedBuilding() {
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let building = buildingLists[this.selectedBuildingId];
        if (Globals.tick < building.buildingEndTime) {
            this.popupManager.showPopup("当前建筑还没建造完成，不能升级");
            return;
        } else if (Globals.tick < building.upgradingEndTime) {
            this.popupManager.showPopup("当前升级尚未完成，不能再次升级");
            return;
        }
        this.popupManager.showMessageBox(
            "是否要升级所选建筑",
            () => {
                try {
                    const result = this.game.buildingManager.upgrade({ id: this.selectedBuildingId, freeOfCharge: false });
                    utilities.log("update: " + result);
                    if (result === Globals.OK) {
                        this.popupManager.showPopup("升级成功，等待升级完成");
                    } else {
                        this.popupManager.showPopup("升级失败，当前资金不足以完成升级");
                    }
                } catch (error) {
                    utilities.log(error);
                    if (error.message > "Building type") {
                        this.popupManager.showPopup("升级失败，当前建筑已到最高等级");
                    } else {
                        this.popupManager.showPopup("升级失败，当前建筑不存在");
                    }
                }
            },
            () => {
            },
            this
        );
    },

    checkIsUpgrading(buildingProgressBar, building) {
        if (building.upgradingEndTime === 0) {
            buildingProgressBar.node.active = false;
        } else if (Globals.tick > building.upgradingEndTime) {
            buildingProgressBar.node.active = false;
        } else if (Globals.tick === building.upgradingEndTime) {
            this.popupManager.showPopup(building.name + "升级已完成");
            buildingProgressBar.node.active = false;
        } else {
            let totalUpgradingTime = building.upgradingEndTime - building.upgradingStartTime;
            let currentUpgradingTime = Globals.tick - building.upgradingStartTime;
            let currentProgress = currentUpgradingTime * 1.0 / totalUpgradingTime;
            buildingProgressBar.progress = currentProgress;
            let label = buildingProgressBar.node.getChildByName("Label").getComponent(cc.Label);
            label.string = "升级中";
            buildingProgressBar.node.active = true;
        }
    },

    addBuilding(button) {
        this.popupManager.showMessageBox(
            "是否要添加新建筑",
            () => {
                let buildingType = button.node.name;
                const result = this.game.buildingManager.add({ type: buildingType, freeOfCharge: false });
                if (result === Globals.OK) {
                    this.popupManager.showPopup("新建建筑成功，等待建造完成");
                } else {
                    this.popupManager.showPopup("新建建筑失败，当前资金不足以新建此类建筑");
                }
            },
            () => {
            },
            this
        );
    },

    checkIsBuilding(buildingProgressBar, building) {
        if (building.buildingEndTime === 0) {
            buildingProgressBar.node.active = false;
        } else if (Globals.tick > building.buildingEndTime) {
            buildingProgressBar.node.active = false;
        } else if (Globals.tick === building.buildingEndTime) {
            this.popupManager.showPopup(building.name + "建造已完成");
            buildingProgressBar.node.active = false;
        } else {
            let totalBuildingTime = building.buildingEndTime - building.buildingStartTime;
            let currentBuildingTime = Globals.tick - building.buildingStartTime;
            let currentProgress = currentBuildingTime * 1.0 / totalBuildingTime;
            buildingProgressBar.progress = currentProgress;
            let label = buildingProgressBar.node.getChildByName("Label").getComponent(cc.Label);
            label.string = "建造中";
            buildingProgressBar.node.active = true;
        }
    },

    showSelectedBuildingComponent(id) {
        let componentTypeArr = ["relax", "studyArea", "noRepair", "buildingAtNight", "unstableWaterTemperature", "dirtyFood", "highHCHO", "crowdedByDesign"];
        let componentChineseName = {"relax": "休息区", "studyArea": "自习区", "noRepair": "皇帝的新修理工", "buildingAtNight": "夜间施工", "unstableWaterTemperature": "薛定谔的水温", "dirtyFood": "屡教不改", "highHCHO": "高效人肉除甲醛", "crowdedByDesign": "摩肩接踵"};
        let buildingLists = this.game.buildingManager.getBuildingLists();
        let building = buildingLists[id];
        this.componentLayout.removeAllChildren();
        for (let i = 0; i < building.components.length; ++i) {
            let node = cc.instantiate(this.componentPrefab);
            let componentName = node.getChildByName("NameLabel").getComponent(cc.Label);
            componentName.string = componentChineseName[building.components[i].type];
            let nodeCover = node.getChildByName("Cover").getComponent(cc.Sprite);
            if (i === this.selectedComponentId) {
                nodeCover.node.active = true;
            } else {
                nodeCover.node.active = false;
            }
            let item = node.getComponent(ComponentItem);
            item.componentType = building.components[i].type;
            item.buildingPage = this;
            item.id = i;
            this.componentLayout.addChild(node);
        }
    },

    showAddComponentPanel() {
        this.addComponentPanel.active = !this.addComponentPanel.active;
        if (this.addComponentPanel.active) {
            let componentTypeArr = ["relax", "studyArea", "noRepair", "buildingAtNight", "unstableWaterTemperature", "dirtyFood", "highHCHO", "crowdedByDesign"];
            let componentChineseName = ["休息区", "自习区", "皇帝的新修理工", "夜间施工", "薛定谔的水温", "屡教不改", "高效人肉除甲醛", "摩肩接踵"];
            this.addComponentPanel.removeAllChildren();
            for (let i = 0; i < componentTypeArr.length; ++i) {
                let componentProperties = BuildingComponentSpecifications[componentTypeArr[i]][0]["defaultProperties"];
                if (componentProperties["userAdditionAllowed"] === true) {
                    let node = cc.instantiate(this.componentSpecificationPrefab);
                    let componentName = node.getChildByName("ComponentNameLabel").getComponent(cc.Label);
                    componentName.string = componentChineseName[i];
                    let fund = node.getChildByName("ResourceInfo").getChildByName("FundLabel").getComponent(cc.Label);
                    fund.string = componentProperties["fundToCurrentTier"];
                    let item = node.getComponent(ComponentSpecificationItem);
                    item.componentType = componentTypeArr[i];
                    item.buildingPage = this;
                    this.addComponentPanel.addChild(node);
                } 
            }
        }
    },
    
    addComponent(componentType) {
        this.popupManager.showMessageBox(
            "是否要添加该组件",
            () => {
                const result = this.game.buildingManager.addComponent({ buildingID: this.selectedBuildingId, componentName: componentType });
                if (result === Globals.OK) {
                    this.popupManager.showPopup("组件添加成功");
                    this.showSelectedBuildingComponent(this.selectedBuildingId);
                } else {
                    this.popupManager.showPopup("资金不足，组件添加失败");
                }
            },
            () => {
            },
            this
        );
    },

    deleteComponent() {
        this.popupManager.showMessageBox(
            "要移除该组件",
            () => {
                console.log("selected" + selectedCompType);
                const result = this.game.buildingManager.removeComponent({ buildingID: this.selectedBuildingId, componentName: this.selectedCompType, componentId: this.selectedComponentId });
                if (result === Globals.OK) {
                    this.popupManager.showPopup("组件移除成功");
                    this.selectedComponentId = -1;
                    this.showSelectedBuildingComponent(this.selectedBuildingId);
                } else {
                    this.popupManager.showPopup("资金不足，组件移除失败");
                }
            },
            () => {
            },
            this
        );
    },

    handleComponent(componentType, id) {
        let componentFundToRemove = BuildingComponentSpecifications[componentType][0]["defaultProperties"]["fundToRemove"] || 0;
        this.deleteComponentButtonLabel.string = "删除组件（花费" + componentFundToRemove + "万）";
        this.deleteComponentButton.node.on("click", this.deleteComponent, this);
        this.selectedCompType = componentType;
        this.selectedComponentId = id;
        this.showSelectedBuildingComponent(this.selectedBuildingId);
    }
});
