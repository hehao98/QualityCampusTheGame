// Class StudentManager

let _ = require("lodash");
let Student = require("Student");
let utilities = require("utilities");
let Globals = require("GlobalVariables");

/**
 * constructor. param  
 */
class StudentManager {

    /**
     * 
     * @param {Resource} properties.fund
     */
    constructor(properties = {}) {
        // properties
        this.nextStudentID = 0;
        // this.nextBuildingComponentID = 0;
        this.students = [];
        this.fundModifierId = Globals.game.fund.addModifier({ type: "student", amount: 0 });

        // constructor left-overs
    }

}

// * methods

/**
 * @param {Number} properties.talent
 * 
 */
StudentManager.prototype.add = function (properties = {}) {
    let propertiesRevised = _.cloneDeep(properties);
    propertiesRevised["id"] = this.nextStudentID++;
    let student = new Student(propertiesRevised);
    this.students.push(student);
    Globals.game.fund.setModifierAmount(this.fundModifierId, this.students.length * 5);
};

/**
 * reassign all schedules for students. called at the
 * beginning of a semester
 * 
 */
StudentManager.prototype.reassign = function (properties = {}) {
    // remove old
    for (let student of this.students) {
        if (student.schedule != undefined) {
            Globals.scheduleManager.remove(student.schedule.id);
            student.schedule = undefined;
        }
    }

    // assign new
    for (let student of this.students) {
        student.assignSchedule(Globals.scheduleManager.getNewSchedule({
            studentID: student.id,
        }));
    }
};


/**
 * 
 * @param {String} difficulty - one of DIFFICULTY_*
 */
StudentManager.prototype.init = function (difficulty) {

};

StudentManager.prototype.getStudentById = function (id) {
    return _.find(this.students,
        function (student) {
            return student.id === id;
        });
};


/**
 * routine update
 */
StudentManager.prototype.update = function () {
    const inDayTime = Globals.tick % Globals.TICKS_DAY;

    if (Globals.tick % Globals.TICKS_SEMESTER === 0) {
        this.reassign();
    }

    // students leave old building and arrive at new building
    for (let student of this.students) {
        student.where = student.schedule.content[inDayTime];

    }
    // update satisfactions for all students
    // execute in updateSatisfaction()

    if ((Globals.tick + 1) % (2 * Globals.TICKS_SEMESTER) === 0) {
        this.graduate();
    }
};

/**
 * @param {Number} tick
 */
StudentManager.prototype.updateSatisfaction = function () {
    for (let student of this.students) {
        for (let type in student.indexes) {
            let current = Globals.buildingManager.getSatisfaction(
                student.where, type);
            utilities.log("sat update (undef. if no.): " + student.where +
                " " + current, "debug");
            student.indexes[type].update(current);
        }
    }
};

/**
 */
StudentManager.prototype.graduate = function () {
    const meanTalent = _.meanBy(this.students,
        (student) => student.talent);
    let nGraduations = 0;
    for (let student of this.students) {
        if (Math.random() < 0.25 + (student.talent - meanTalent) / 10) {
            student.uponGraduation = true;
            nGraduations++;
        }
    }
    _.remove(this.students, (student) => student.updateSatisfaction);
    utilities.log(nGraduations + " students graduated", "info");
    return nGraduations;
};

/**
 * @param {String} type
 */
StudentManager.prototype.getOverallIndex = function (type) {
    let sum = 0.0;
    let cnt = 0;
    for (let student of this.students) {
        cnt++;
        sum += student.getIndex(type);
    }
    return sum / cnt;
};

StudentManager.prototype.debugPrint = function () {
    utilities.log("[StudentManager DebugPrint]");
    utilities.log("student number: " + this.students.length);
    if (utilities.logPermitted("debug")) {
        for (let student of this.students) {
            student.debugPrint({ indent: 4 });
        }
    }
    utilities.log(this.getOverallIndex(
        "relaxationSatisfaction") + " " +
        this.getOverallIndex("studySatisfaction") +
        " " + this.getOverallIndex("livingConditionSatisfaction") +
        " " + this.getOverallIndex("studyIndex"));
    utilities.log(this);
    console.log("------------------------------------------------------");
};


module.exports = StudentManager;
