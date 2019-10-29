// Class ScheduleManager

let _ = require("lodash");
let createSchedule = require("Schedule");

/**
 * constructor. param see createScheduleManager
 */
function ScheduleManager(properties) {
    // properties
    this.nextScheduleID = 0;
    this.schedules = [];
    // constructor left-overs

}

// methods
/**
 * @param {Object} properties.studentID - 
 *  ID of the student owning this schedule 
 * @returns {Schedule} schedule -
 *  content of generated schedule
 */
ScheduleManager.prototype.getNewSchedule = function (properties) {
    let propertiesRevised = _.cloneDeep(properties);
    propertiesRevised["id"] = this.nextScheduleID++;
    let schedule = createSchedule(propertiesRevised);
    this.schedules.push(schedule);
    return schedule;
};

ScheduleManager.prototype.debugPrint = function () {
    console.log("[ScheduleManager DebugPrint]");
    console.log("schedule number: " + this.schedules.length);
    for (let s of this.schedules) {
        s.debugPrint();
    }
    console.log("------------------------------------------------------");
};

/**
 * warpped function for new ScheduleManager(...)
 */
function createScheduleManager(properties) {
    return new ScheduleManager(properties || {});
}

module.exports = createScheduleManager;
