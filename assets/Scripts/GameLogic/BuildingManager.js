// Class BuildingManager manages all in-game buildings

let _ = require("lodash");
let utilities = require("utilities");
let BuildingSpecifications = require("BuildingSpecifications");
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
 * @param {Boolean} properties.freeOfCharge - 
 *  add building free of charge
 * @returns {Boolean} whether succeed or not
 */
BuildingManager.prototype.add = function (properties) {
    if (properties.freeOfCharge != true) {
        // check whether resource is enough
        let fund = BuildingSpecifications[properties.type][
            0].defaultProperties.fundToCurrentTier;
        const success = this.fund.use(fund);
        if (!success) { return false; }
    }
    let revised = _.cloneDeep(properties);
    revised["id"] = this.nextBuildingID++;
    let building = new Building(revised);
    this.buildings.push(building);
    return true;
};


/**
 * 
 * @param {Object} properties.id - ID of the building 
 * @param {Boolean} properties.freeOfCharge - 
 *  add building free of charge
 * @returns {Boolean} whether succeed or not
 */
BuildingManager.prototype.upgrade = function (properties) {
    let target = _.find(this.buildings,
        function (building) { return building.id === properties.id; }
    );
    if (target === undefined) {
        throw new ReferenceError("Building ID not exists.");
    }
    let newTier = target.tier + 1;
    if (properties.freeOfCharge != true) {
        // check whether resource is enough
        let fund = BuildingSpecifications[properties.type][
            newTier].defaultProperties.fundToCurrentTier;
        const success = this.fund.use(fund);
        if (!success) return false;
    }
    else {
        return target.upgrade();
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
 * @param {String} properties.difficulty - one of DIFFICULTY_*
 * @param {String} properties.fund
 * @param {String} properties.influence
 */
BuildingManager.prototype.init = function (properties) {
    this.fund = properties.fund;
    this.influence = properties.influence;
    this.add({ type: "dorm", freeOfCharge: true, });
    this.add({ type: "teaching", freeOfCharge: true, });
    this.add({ type: "teaching", freeOfCharge: true, });
    this.add({ type: "cafeteria", freeOfCharge: true, });

};

/**
 * @param {String} type
 * @param {Number} time
 */
BuildingManager.prototype.assignBuilding = function (type, time) {
    // id: assigned/capacity
    let available = {};
    let summedRate = 0.0;
    for (let building of this.buildings) {
        if (building.type === type) {
            const rate = (building.capacity + 1) /
                (building.nStudentAssigned[time] + 1);
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
    utilities.log("ID: " + choosedID, "debug");
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
    // if (tick % Globals.TICKS_SEMESTER === 0) {
    // }
    for (let building of this.buildings) {
        building.nStudent = building.nStudentAssigned[inDayTime];
    }
};


BuildingManager.prototype.debugPrint = function () {
    utilities.log("[BuildingManager DebugPrint]");
    utilities.log("building number: " + this.buildings.length);
    for (let building of this.buildings) {
        building.debugPrint();
    }
    utilities.log("------------------------------------------------------");
};




module.exports = BuildingManager;
