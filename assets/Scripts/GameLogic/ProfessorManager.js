let Globals = require("Globals");

const BOOST_LEVEL = {
    academic: [],
    career: [],
    teach: [],
};

class ProfessorManager {
    constructor(properties) {
        this.game = properties.game;
        this.fund = properties.fund;

        this.number = Globals.initialData.professorNumber;
        this.teachLevel = Globals.initialData.professorTeachLevel;
        this.academicLevel = Globals.initialData.professorAcademicLevel;
        this.careerLevel = Globals.initialData.professorCareerLevel;

        this.nextRecruitCost = this.getRecruitCost(); 

        this.MAX_TEACH_LEVEL = 5;
        this.MAX_ACADEMIC_LEVEL = 5;
        this.MAX_CAREER_LEVEL = 5;
    }
}

ProfessorManager.prototype.getRecruitCost = function() {

};

/**
 * @return {Boolean} true when success, false otherwise
 */
ProfessorManager.prototype.recruitProfessor = function() {
    if (this.fund.use(this.nextRecruitCost) === false) {
        return false;
    }
    this.nextRecruitCost = this.getRecruitCost();
    return true;
};

/**
 * @param {String} type "academic", "teach", or "career"
 * @return {Boolean} true when success, false otherwise
 */
ProfessorManager.prototype.upgradeLevel = function(type) {
    if (this[type + "Level"] === this["MAX_" + type.toUpperCase() + "_LEVEL"]) {
        return false;
    }
    this[type + "Level"]++;
    return true;
};

/**
 * @return {Object} {
 *     teachIndexBoost: float, range [0-1]
 *     careerIndexBoost: float, range [0-1]
 *     academicIndexBoost: float range [0-1]
 * }
 */
ProfessorManager.prototype.getEffect = function() {
    
};

module.exports = ProfessorManager;