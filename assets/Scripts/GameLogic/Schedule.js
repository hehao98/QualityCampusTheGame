// Schedule abstruct all in-game schedules
// let ScheduleSpecifications = require("ScheduleSpecifications");
/**
 * see createSchedule
 */
function Schedule(properties) {
    // properties
    this.id = properties.id;
    this.studentsID = properties.studentsID;
    this.content = undefined;
    // constructor left-overs

}


// ------------------- methods ------------------- //



Schedule.prototype.debugPrint = function (properties) {
    console.log(" ".repeat(properties.indent) +
        `[${this.id}]`);
};

/**
 * warpped function for new Schedule(...)
 * @param {Object} properties.id - ID of the schedule 
 */
function createSchedule(properties) {
    return new Schedule(properties || {});
}

module.exports = createSchedule;
