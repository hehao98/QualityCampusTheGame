let Globals = require("GlobalVariables");

const BOOST_LEVEL = {
    research: [0.1, 0.2, 0.3, 0.4, 0.5],
    career: [0.1, 0.2, 0.3, 0.4, 0.5],
    teach: [0.1, 0.2, 0.3, 0.4, 0.5],
};

const LEVEL_UPGRADE_COST = [1000, 2000, 3000, 5000, 0];

const PROF_COST = -8;

class ProfessorManager {
    constructor(properties) {
        this.fund = properties.fund;
        this.studentManager = properties.studentManager;
        this.number = properties.initialData.professorNumber;
        this.teachLevel = properties.initialData.professorTeachLevel;
        this.researchLevel = properties.initialData.professorAcademicLevel;
        this.careerLevel = properties.initialData.professorCareerLevel;

        this.nextRecruitCost = this.getRecruitCost(); 
        this.modifierId = this.fund.addModifier({ 
            type: "professor", 
            amount: this.number * PROF_COST
        });
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
    this.fund.setModifierAmount(this.modifierId, this.number * PROF_COST);
    return true;
};

/**
 * @param {String} type "research", "teach", or "career"
 * @return {Boolean} true or false
 */
ProfessorManager.prototype.isHighestLevel = function(type) {
    return this[type + "Level"] === BOOST_LEVEL[type].length - 1;
};

/**
 * @param {String} type "research", "teach", or "career"
 * @return {Number} 0 when success, < 0 otherwise
 */
ProfessorManager.prototype.upgradeLevel = function(type) {
    if (this[type + "Level"] + 1 >= BOOST_LEVEL[type].length) {
        return Globals.ERR_NO_MORE_LEVEL;
    }
    if (this.fund.use(LEVEL_UPGRADE_COST[this[type + "Level"]]) === false) {
        return Globals.ERR_NOT_ENOUGH_RESOURCES;
    }
    this[type + "Level"]++;
    return 0;
};

/**
 * @return {Number} the boost adjusted by professor student ratio
 */
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
module.exports.BOOST_LEVEL = BOOST_LEVEL;
module.exports.PROF_COST = PROF_COST;
module.exports.LEVEL_UPGRADE_COST = LEVEL_UPGRADE_COST;
