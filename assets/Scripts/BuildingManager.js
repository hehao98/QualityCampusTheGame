// Class BuildingManager manages all in-game buildings

let createBuilding = require(createBuilding);

let BuildingManager = cc.Class({
    extends: cc.Component,

    properties: () => ({
        buildingMetaData: cc.Object,
        buildings: [cc.Object],
    }),

    init () {
        let that = this;
        cc.loader.loadRes("Buildings", function(err, jsonAsset) {
            that.buildingMetaData = jsonAsset.json;
        });
    },

    updateBuildings () {

    },

    addBuilding (buildingInfo) {
        this.buildings.push(buildingInfo);
    },

    getBuildingMetaData (type, id) {
        return this.buildingMetaData[type][id];
    }
});

module.exports = BuildingManager;
