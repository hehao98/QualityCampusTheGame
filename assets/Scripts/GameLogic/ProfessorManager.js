const BOOST_LEVEL = {
    research: [0.1, 0.2, 0.3, 0.4, 0.5],
    career: [0.1, 0.2, 0.3, 0.4, 0.5],
    teach: [0.1, 0.2, 0.3, 0.4, 0.5],
};

class ProfessorManager {
    constructor(properties) {
        this.fund = properties.fund;
        this.studentManager = properties.studentManager;
        this.number = properties.initialData.professorNumber;
        this.teachLevel = properties.initialData.professorTeachLevel;
        this.researchLevel = properties.initialData.professorAcademicLevel;
        this.careerLevel = properties.initialData.professorCareerLevel;

        this.nextRecruitCost = this.getRecruitCost(); 
    }
}

/**
 * @return {Number} cost needed to recruit next professor
 */
ProfessorManager.prototype.getRecruitCost = function() {
    return this.number * 100;
};

/**
 * @return {Boolean} true when success, false otherwise
 */
ProfessorManager.prototype.recruitProfessor = function() {
    if (this.fund.use(this.nextRecruitCost) === false) {
        return false;
    }
    this.nextRecruitCost = this.getRecruitCost();
    this.number++;
    return true;
};

/**
 * @param {String} type "academic", "teach", or "career"
 * @return {Boolean} true when success, false otherwise
 */
ProfessorManager.prototype.upgradeLevel = function(type) {
    if (this[type + "Level"] + 1 >= BOOST_LEVEL[type].length) {
        return false;
    }
    this[type + "Level"]++;
    return true;
};

ProfessorManager.prototype.getProfNumberBoost = function() {
    let ratio = this.number / this.studentManager.students.length;
    return ratio * 10;
};

/**
 * @return {Object} {
 *     teachIndexBoost: float, range [0-1]
 *     careerIndexBoost: float, range [0-1]
 *     academicIndexBoost: float range [0-1]
 * }
 */
ProfessorManager.prototype.getEffect = function() {
    return {
        teachIndexBoost: BOOST_LEVEL.teach[this.teachLevel] 
            * this.getProfNumberBoost(),
        careerIndexBoost: BOOST_LEVEL.career[this.careerLevel] 
            * this.getProfNumberBoost(),
        researchIndexBoost: BOOST_LEVEL.research[this.researchLevel] 
            * this.getProfNumberBoost(),
    };
};

module.exports = ProfessorManager;