let Globals = require("GlobalVariables");
let utilities = require("utilities");
const _ = require("lodash");

/**
 * 
 * @param -  
 */
class AdmissionManager {
    constructor(properties = {}) {
        // properties
        this.admissionTarget = 0;
    }
}


// methods

/**
 *
 */
AdmissionManager.prototype.setTarget = function (target) {
    this.admissionTarget = target;
};

AdmissionManager.prototype.getExpectedTalentForNewStudents = function () {
    const nStudent = Globals.studentManager.students.length;
    const overallSatisfaction = nStudent ? _.meanBy(Globals.SATISFACTIONS,
        (satisfaction) => Globals.studentManager.getOverallIndex(satisfaction)) : 0.46;
    return (4 * overallSatisfaction - 1) / 3;
};

AdmissionManager.prototype.admit = function () {
    const nStudent = Globals.studentManager.students.length;
    for (let i = 0; i < this.admissionTarget - nStudent; ++i) {
        Globals.studentManager.add({ talent: this.getExpectedTalentForNewStudents() });
    }
};


AdmissionManager.prototype.debugPrint = function () {
};

AdmissionManager.prototype.update = function () {
    if (Globals.tick % (Globals.TICKS_SEMESTER * 2) === 0) {
        this.admit();
    }
};


module.exports = AdmissionManager;