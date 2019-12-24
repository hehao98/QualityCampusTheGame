// Class BuildingManager manages all in-game buildings

const _ = require("lodash");
const utilities = require("utilities");
const BuildingSpecifications = require("BuildingSpecifications");
const BuildingComponentSpecifications =
    require("BuildingComponentSpecifications");
const Building = require("Building");
const Globals = require("GlobalVariables");

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
 *  add building free of charge and time
 * @param {Boolean} properties.componentsProperties - 
 *  components that will add to this building
 * @returns {Boolean} whether succeed or not
 */
BuildingManager.prototype.add = function (properties) {
    if (properties.freeOfCharge != true) {
        // check whether resource is enough
        let fund = BuildingSpecifications[properties.type][
            0].defaultProperties.fundToCurrentTier;
        const success = Globals.game.fund.use(fund);
        if (!success) { return Globals.ERR_NOT_ENOUGH_RESOURCES; }
    }
    let revised = _.cloneDeep(properties);
    revised["id"] = this.nextBuildingID++;
    let building = new Building(revised);
    this.buildings.push(building);
    building.buildingStartTime = Globals.tick;
    if (properties.freeOfCharge) {
        building.buildingEndTime = 0;
        building.loadSpecifications();
    } else {
        building.buildingEndTime =
            Globals.tick + BuildingSpecifications[
                properties.type][0].buildTime;
    }
    building.upgradingStartTime = 0;
    building.upgradingEndTime = 0;

    // * add components if any
    for (let componentProperties of properties.componentsProperties || []) {
        let revisedComponentProperties = _.cloneDeep(componentProperties);
        revisedComponentProperties.buildingID = revised.id;
        this.addComponent(revisedComponentProperties);
    }

    return Globals.OK;
};

/**
 * 
 * @param {Number} id - ID of the building 

 */
BuildingManager.prototype.getBuildingById = function (id) {
    return _.find(this.buildings,
        function (building) { return building.id === id; }
    );
};
/**
 * 
 * @param {Object} properties.id - ID of the building 
 * @param {Boolean} properties.freeOfCharge - 
 *  add building free of charge
 * @returns {Boolean} whether succeed or not
 */
BuildingManager.prototype.upgrade = function (properties) {
    const target = _.find(this.buildings,
        function (building) { return building.id === properties.id; }
    );
    if (!target) {
        throw new RangeError("Building ID not exists: " + properties.id);
    }
    const newTier = target.tier + 1;
    const info = utilities.safeGet(BuildingSpecifications,
        [target.type, newTier]);
    utilities.log(info, "debug");
    if (!info) {
        throw new RangeError("Building type not exists or " +
            "no upgrade available for this type of building at " +
            "this tier: " + target.type, newTier);
    }
    if (properties.freeOfCharge != true) {
        // check whether resource is enough
        let fund = info.defaultProperties.fundToCurrentTier;
        const success = Globals.game.fund.use(fund);
        if (!success) return Globals.ERR_NOT_ENOUGH_RESOURCES;
    }
    utilities.log("check passed");

    target.upgradingStartTime = Globals.tick;
    if (properties.freeOfCharge) {
        target.upgradingEndTime = 0;
        target.tier++;
        target.loadSpecifications();
    } else {
        target.upgradingEndTime = Math.ceil(
            Globals.tick + info.buildTime);
    }
    return Globals.OK;
};


/**
 * 
 * @param {Object} properties.buildingID - ID of the building
 * @param {String} properties.componentName - name of component
 * @param {String} properties.freeOfCharge - requires no fund or time
 * 
 */
BuildingManager.prototype.addComponent = function (properties) {

    const target = _.find(
        this.buildings,
        function (building) {
            return building.id === properties.buildingID;
        }
    );
    if (target === undefined) {
        throw new ReferenceError("Building ID not exists.");
    }

    // * check funding
    if (!properties.freeOfCharge) {
        const fund = BuildingComponentSpecifications[properties.componentName][
            0].defaultProperties.fundToCurrentTier || 0;
        const success = Globals.game.fund.use(fund);
        if (!success) {
            return Globals.ERR_NOT_ENOUGH_RESOURCES;
        }
    }

    let properties_revised = _.cloneDeep(properties);
    properties_revised["id"] = this.nextBuildingComponentID++;


    return target.addComponent(properties_revised);

};

/**
 * 
 * @param {Object} properties.buildingID - ID of the building
 * @param {String} properties.componentName - name of component
 * @param {String} properties.componentId - ID of component
 * 
 */
BuildingManager.prototype.removeComponent = function (properties) {
    const target = _.find(
        this.buildings,
        function (building) {
            return building.id === properties.buildingID;
        }
    );
    if (target === undefined) {
        throw new ReferenceError("Building ID not exists.");
    }
    // TODO check funding
    const fund = BuildingComponentSpecifications[
        properties.componentName][0].defaultProperties.fundToRemove || 0;
    const success = Globals.game.fund.use(fund);
    if (!success) {
        return Globals.ERR_NOT_ENOUGH_RESOURCES;
    }
    return target.removeComponent(properties.componentId);
};

/**
 * 
 * @param {String} properties.difficulty - one of DIFFICULTY_*
 */
BuildingManager.prototype.init = function (properties) {
    for (let buildingProperties of Globals.initialData.buildings) {
        this.add(buildingProperties);

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
    for (let building of this.buildings) {
        if (building.type === type &&
            Globals.tick >= building.buildingEndTime) {
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
    const inDayTime = (tick + 1) % Globals.TICKS_DAY;
    // if (tick % Globals.TICKS_SEMESTER === 0) {
    // }
    for (let building of this.buildings) {
        building.update();
        building.nStudent = building.nStudentAssigned[inDayTime];
    }
};

BuildingManager.prototype.getBuildingLists = function () {
    return this.buildings;
};

BuildingManager.prototype.getMaxStudentCapacity = function () {
    let result = 0;
    for (let building of this.buildings) {
        if (building.type === "dorm")
            result += building.capacity;
    }
    return result;
};


BuildingManager.prototype.debugPrint = function () {
    utilities.log("building number: " + this.buildings.length, "debug");
    utilities.log(this);
    utilities.log("------------------------------------------------------", "debug");
};




module.exports = BuildingManager;
