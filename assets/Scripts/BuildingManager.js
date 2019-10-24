// Class BuildingManager manages all in-game buildings

let createBuilding = require("./Building");

/**
 * constructor. param see createBuildingManager
 */
function BuildingManager(properties) {
    this.nextBuildingID = 0;
    this.buildings = [];

    /**
     * 
     * @param {Object} properties.type - The type of the building 
     */
    this.addBuilding = function (properties) {
        this.buildings.push(createBuilding({
            ...properties, id: nextBuildingID++
        }));
    };

    /**
     * 
     * @param {Object} properties.id - ID of the building 
     */
    this.upgradeBuilding = function (properties) {
        let target = _.find(
            this.buildings,
            function (building) { return building.id === properties.id; }
        );
        if (target === undefined) {
            throw new ReferenceError("Building ID not exists.");
        }
        else {
            target.rank++;
        }
    };

    this.debugPrint = function () {
        for (let b of this.buildings) {
            console.log(b.debugPrint());
        }
    };
}

/**
 * warpped function for new BuildingManager(...)
 */
function createBuilding(properties) {
    return new BuildingManager(properties || {});
}

module.exports = createBuildingManager;
