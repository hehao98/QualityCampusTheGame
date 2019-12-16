// Class ScheduleManager

let _ = require("lodash");
let utilities = require("utilities");

let Schedule = require("Schedule");
let Globals = require("GlobalVariables");


class ScheduleManager {

    /**
     * 
     * @param {BuildingManager} properties.buildingManager 
     */
    constructor(properties) {
        // properties
        this.nextScheduleID = 0;
        this.schedules = [];
        // constructor left-overs
    }

}

// methods
/**
 * @param {Object} properties.studentID - 
 *  ID of the student owning this schedule 
 * @returns {Schedule} schedule -
 *  content of generated schedule
 */
ScheduleManager.prototype.getNewSchedule = function (properties = {}) {
    let propertiesRevised = _.cloneDeep(properties);
    propertiesRevised["id"] = this.nextScheduleID++;
    propertiesRevised["content"] = {
        [Globals.MORNING]: Globals.buildingManager.assignBuilding(
            "teaching", Globals.MORNING),
        [Globals.NOON]: Globals.buildingManager.assignBuilding(
            "cafeteria", Globals.NOON),
        [Globals.AFTERNOON]: Globals.buildingManager.assignBuilding(
            "teaching", Globals.AFTERNOON),
        [Globals.EVENING]: Globals.buildingManager.assignBuilding(
            "cafeteria", Globals.EVENING),
        [Globals.NIGHT]: Globals.buildingManager.assignBuilding(
            "dorm", Globals.NIGHT),
    };

    let schedule = new Schedule(propertiesRevised);
    this.schedules.push(schedule);
    return schedule;
};

/**
 * @param {Number} id - id of the schedule
 */
ScheduleManager.prototype.remove = function (id) {
    let target = _.find(
        this.schedules,
        function (schedule) { return schedule.id === schedule.id; }
    );
    if (target === undefined) {
        throw new ReferenceError("schedule ID not exists.");
    }
    else {
        for (let time in target.content) {
            let buildingID = target.content[time];
            Globals.buildingManager.unAssignBuilding(buildingID, time);
        }
        _.remove(this.schedules, (schedule) => (
            schedule.id === id
        ));
    }
};


ScheduleManager.prototype.debugPrint = function () {
    utilities.log("[ScheduleManager DebugPrint]");
    utilities.log("schedule number: " + this.schedules.length);
    for (let schedule of this.schedules) {
        schedule.debugPrint();
    }
    utilities.log("------------------------------------------------------");
};


module.exports = ScheduleManager;
