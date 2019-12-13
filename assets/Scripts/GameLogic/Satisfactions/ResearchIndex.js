// ResearchIndex abstruct all in-game ResearchIndex
let utilities = require("utilities");
let Index = require("Index");
let Globals = require("GlobalVariables");

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
        _.min([0, student.indexes.studyIndex.value - 0.3]) /
        (8 * Globals.TICKS_SEMESTER);
    this.value = this.value + dailyGain;
};

module.exports = ResearchIndex;