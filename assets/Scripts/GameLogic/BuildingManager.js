// Class BuildingManager manages all in-game buildings

let _ = require("lodash");
let utilities = require("utilities");
let Building = require("Building");
let Globals = require("GlobalVariables");

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
    this.add({ type: "teaching" });
    this.add({ type: "cafeteria" });
};

/**
 * @param {Number} tick
 */
BuildingManager.prototype.update = function (tick) {
    const inDayTime = tick % Globals.TICKS_DAY;

    // if (tick % Globals.TICKS_SEMESTER === 0) {
        
    // }
    for (let building of this.buildings) {
        building.nStudent = building.nStudentAssigned[inDayTime];
    }


};

/**
 * @param {String} type
 * @param {Number} time
 */
BuildingManager.prototype.assignBuilding = function (type, time) {
    // id: assigned/capacity
    let available = {};
    let summedRate = 0.0;
    utilities.log(type, "info");
    for (let building of this.buildings) {
        if (building.type === type) {
            const rate = (building.capacity + 1) /
                (building.nStudentAssigned[time] + 1);
            utilities.log(rate);
            available[building.id] = rate;
            summedRate += rate;
        }
    }
    let choosedAccumlatedRate = Math.random() * summedRate;
    utilities.log("total " + summedRate, "debug");
    utilities.log("choosed " + choosedAccumlatedRate, "debug");


    let choosedID = undefined;
    for (let id in available) {
        if (choosedAccumlatedRate >= available[id]) {
            choosedAccumlatedRate -= available[id];
        }
        else {
            choosedID = id;
            break;
        }
    }
    utilities.log("ID: " + choosedID, "info");
    // for float error
    if (choosedID === undefined) {
        choosedID = Object.keys(available)[0];
    }
    choosedID = Number(choosedID);
    utilities.log(choosedID, "debug");
    let target = _.find(this.buildings,
        function (building) {
            utilities.log(building.id + " " + choosedID, "debug");
            // TODO mix type
            return building.id === choosedID;
        });
    utilities.log(JSON.stringify(target), "debug");

    target.nStudentAssigned[time]++;
    return choosedID;
};

/**
 * @param {String} id
 * @param {Number} time
 */
BuildingManager.prototype.unAssignBuilding = function (id, time) {
    let target = _.find(this.buildings,
        function (building) {
            // TODO mix type
            return building.id == id;
        });
    target.nStudentAssigned[time]--;
};

/**
 * @param {Number} tick
 */
BuildingManager.prototype.getSatisfaction = function (buildingID, type) {
    let target = _.find(this.buildings,
        function (building) {
            utilities.log((typeof building.id) +
                (typeof buildingID), "debug");
            return building.id === buildingID;
        });

    if (target[type] === undefined) {
        return undefined;
    }
    // base value
    let satisfaction = target[type];


    // revision by crowdness
    let crowdCoefficients = target.nStudent / target.capacity;
    satisfaction = _.min([1, satisfaction *
        (Math.log(-crowdCoefficients + 2) / Math.E + 1)]);

    utilities.log(target, "debug");
    utilities.log(type + " sat: " + satisfaction + " " +
        target.nStudent + " " + target.capacity + " " +
        crowdCoefficients + " " + satisfaction, "debug");
    return satisfaction;

};

/**
 * @param {Number} tick
 */
BuildingManager.prototype.update = function (tick) {
    const inDayTime = tick % Globals.TICKS_DAY;

    // update student number in buildings
    for (let building of this.buildings) {
        building.nStudent = building.nStudentAssigned[inDayTime];
    }
};

BuildingManager.prototype.debugPrint = function () {
    console.log("[BuildingManager DebugPrint]");
    console.log("building number: " + this.buildings.length);
    for (let b of this.buildings) {
        b.debugPrint();
    }
    console.log("------------------------------------------------------");
};




module.exports = BuildingManager;
