// Class BuildingManager manages all in-game buildings

let _ = require("lodash");
let createBuilding = require("Building");

/**
 * constructor. param see createBuildingManager
 */
function BuildingManager(properties) {
    // properties
    this.nextBuildingID = 0;
    this.buildings = [];

    // methods
    /**
     * 
     * @param {Object} properties.type - The type of the building 
     */
    this.add = function (properties) {
        let r = _.cloneDeep(properties);
        r["id"] = this.nextBuildingID++;
        this.buildings.push(createBuilding(r));

    };

    /**
     * 
     * @param {Object} properties.id - ID of the building 
     */
    this.upgrade = function (properties) {
        let target = _.find(
            this.buildings,
            function (building) { return building.id === properties.id; }
        );
        if (target === undefined) {
            throw new ReferenceError("Building ID not exists.");
        }
        else {
            target.upgrade();
        }
    };

    this.debugPrint = function () {
        for (let b of this.buildings) {
            console.log(b.debugPrint());
        }
    };

    // constructor left-overs
    
}

/**
 * warpped function for new BuildingManager(...)
 */
function createBuildingManager(properties) {
    return new BuildingManager(properties || {});
}

module.exports = createBuildingManager;
