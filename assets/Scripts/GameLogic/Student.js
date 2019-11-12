// Student abstruct all in-game students
// let StudentSpecifications = require("StudentSpecifications");
let RelaxationSatisfacion = require("RelaxationSatisfacion");
let StudySatisfaction = require("StudySatisfaction");
let StudyIndex = require("StudyIndex");
let utilities = require("utilities");


/**
 *  
 */

class Student {

    /**
     * 
     * @param {Object} properties
     * @param {Number} properties.id
     * @param {Schedule} properties.schedule
     */
    constructor(properties) {
        // properties
        this.id = properties.id;
        this.schedule = properties.schedule;
        this.indexes = {
            relaxationSatisfaction: new RelaxationSatisfacion(
                { studentID: this.id }),
            studySatisfaction: new StudySatisfaction(
                { studentID: this.id }),
            studyIndex: new StudyIndex(
                { studentID: this.id }),
        };
        this.where = undefined;

        // constructor left-overs
        // this.loadSpecifications();
    }

}


// ------------------- methods ------------------- //


Student.prototype.loadSpecifications = function () {
    // may not be needed
};

/**
 * 
 * @param {Schedule} properties.schedule
 */
Student.prototype.assignSchedule = function (schedule) {
    this.schedule = schedule;
};


Student.prototype.debugPrint = function (properties) {
    utilities.log(" ".repeat(properties.indent) +
        `[${this.id}] ${this.where}`);
    if (this.schedule != undefined) {
        this.schedule.debugPrint({ indent: properties.indent + 4 });
    }
    for (let type in this.indexes) {
        utilities.log(" ".repeat(properties.indent) +
            type.padStart(" ", 10) + " " +
            this.indexes[type].value);
    }
};


module.exports = Student;
