// Student abstruct all in-game students
// let StudentSpecifications = require("StudentSpecifications");
const RelaxationSatisfacion = require("RelaxationSatisfacion");
const CleaningSatisfaction = require("CleaningSatisfaction");
const StudySatisfaction = require("StudySatisfaction");
const StudyIndex = require("StudyIndex");
const CareerIndex = require("CareerIndex");
const ResearchIndex = require("ResearchIndex");
const utilities = require("utilities");
const _ = require("lodash");

/**
 *  
 */

class Student {

    /**
     * 
     * @param {Object} properties
     * @param {Number} properties.id
     * @param {Number} properties.talent
     */
    constructor(properties) {
        // properties
        this.id = properties.id;
        this.talent = properties.talent || 1.0;
        this.indexes = {
            relaxationSatisfaction: new RelaxationSatisfacion(
                { studentID: this.id }),
            cleaningSatisfaction: new CleaningSatisfaction(
                { studentID: this.id }),
            studySatisfaction: new StudySatisfaction(
                { studentID: this.id }),
            studyIndex: new StudyIndex({
                studentID: this.id,
                value: this.talent * 0.45
            }),
            careerIndex: new CareerIndex({
                studentID: this.id,
                value: 0
            }),
            researchIndex: new ResearchIndex({
                studentID: this.id,
                value: 0
            }),
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

/**
 * 
 */
Student.prototype.getIndex = function (name) {
    if (this.indexes[name] != undefined) {
        return this.indexes[name].value;
    }
    switch (name) {
        case "livingConditionSatisfaction":
            return _.meanBy(["relaxationSatisfaction"],
                (type) => this.indexes[type].value);
        default:
            throw new Error("Unknown index: " + name);
    }
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
