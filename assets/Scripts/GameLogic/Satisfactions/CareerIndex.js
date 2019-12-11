// CareerIndex abstruct all in-game CareerIndex
let utilities = require("utilities");
let Index = require("Index");
let Globals = require("GlobalVariables");

/**
 * 
 * @param -  
 */
class CareerIndex extends Index {
    constructor(properties) {
        super(properties);
    }
}

// methods

/**
 *
 */
CareerIndex.prototype.debugPrint = function () {
    utilities.log(this.value);
};

/**
 *
 */
CareerIndex.prototype.update = function () {
    const student = Globals.studentManager.getStudentById(this.studentID);
    const dailyGain = Globals.careerTrainingProvided *
        student.indexes.studyIndex / (8 * Globals.TICKS_SEMESTER);
    this.value = this.value + dailyGain;
};

module.exports = CareerIndex;