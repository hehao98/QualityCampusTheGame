// ResearchIndex abstruct Research Index for students
const utilities = require("utilities");
const Index = require("Index");
const Globals = require("GlobalVariables");
const _ = require("lodash");

/**
 * 
 * @param -  
 */
class ResearchIndex extends Index {
    constructor(properties) {
        super(properties);
    }
}

// methods

/**
 *
 */
ResearchIndex.prototype.debugPrint = function () {
    utilities.log(this.value);
};

/**
 *
 */
ResearchIndex.prototype.update = function () {
    const student = Globals.studentManager.getStudentById(this.studentID);
    const dailyGain = Globals.universityLevelModifiers.careerTrainingProvided *
        _.max([0, student.indexes.studyIndex.value - 0.3]) /
        (8 * Globals.TICKS_SEMESTER);
    this.value = this.value + dailyGain;
};

module.exports = ResearchIndex;