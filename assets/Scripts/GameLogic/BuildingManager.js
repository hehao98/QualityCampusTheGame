// Class BuildingManager manages all in-game buildings

let _ = require("lodash");
let Building = require("Building");

/**
 * constructor. param  
 */
class BuildingManager {

    constructor(properties) {
        // properties
        this.nextBuildingID = 0;
        this.nextBuildingComponentID = 0;
        this.buildings = [];


        // constructor left-overs

    }
}

// methods
/**
 * 
 * @param {Object} properties.type - The type of the building 
 */
BuildingManager.prototype.add = function (properties) {
    let r = _.cloneDeep(properties);
    r["id"] = this.nextBuildingID++;
    this.buildings.push(new Building(r));

};


/**
 * 
 * @param {Object} properties.id - ID of the building 
 */
BuildingManager.prototype.upgrade = function (properties) {
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


/**
 * 
 * @param {Object} properties.buildingID - ID of the building
 * 
 */
BuildingManager.prototype.addComponent = function (properties) {
    let target = _.find(
        this.buildings,
        function (building) {
            return building.id === properties.buildingID;
        }
    );
    if (target === undefined) {
        throw new ReferenceError("Building ID not exists.");
    }
    else {
        let properties_revised = _.cloneDeep(properties);
        properties_revised["id"] = this.nextBuildingComponentID++;
        target.addComponent(properties_revised);
    }
};

/**
 * 
 * @param {String} difficulty - one of DIFFICULTY_*
 */
BuildingManager.prototype.init = function (difficulty) {
    this.add({ type: "dorm" });
    this.add({ type: "teaching" });
    this.add({ type: "cafeteria" });
}

BuildingManager.prototype.debugPrint = function () {
    console.log("[BuildingManager DebugPrint]");
    console.log("building number: " + this.buildings.length);
    for (let b of this.buildings) {
        b.debugPrint();
    }
    console.log("------------------------------------------------------");
};



module.exports = BuildingManager;
