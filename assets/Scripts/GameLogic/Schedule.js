// Schedule abstruct all in-game schedules
let utilities = require("utilities");

// let ScheduleSpecifications = require("ScheduleSpecifications");
/**
 *  
 */
class Schedule {

    /**
     * 
     * @param {Object} properties.content - content of the schedule
     */
    constructor(properties) {
        // properties
        this.id = properties.id;
        this.studentsID = properties.studentsID;
        this.content = properties.content;
        // constructor left-overs
    }
}


// ------------------- methods ------------------- //



Schedule.prototype.debugPrint = function (properties) {
    utilities.log(" ".repeat(properties.indent) +
        `[${this.id}]`);
};


module.exports = Schedule;
