// StudyIndex abstruct all in-game StudyIndex
let utilities = require("utilities");
let Index = require("Index");
let Globals = require("GlobalVariables");

/**
 * 
 * @param -  
 */
class StudyIndex extends Index {
    constructor(properties) {
        super(properties);
        // constructor left-overs
        // this.loadSpecifications();
    }
}


// methods

/**
 *
 */
StudyIndex.prototype.debugPrint = function () {
    utilities.log(this.value);
};

/**
 *
 */
StudyIndex.prototype.update = function () {
    const student = Globals.studentManager.getStudentById(this.studentID);
    // student.debugPrint({});
    this.value = 0.98 * this.value + 0.02 * student.talent * (
        0.7 * student.indexes.studySatisfaction.value +
        0.3 * student.indexes.relaxationSatisfaction.value);
};

module.exports = StudyIndex;