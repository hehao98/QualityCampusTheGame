// Class StudentManager

let _ = require("lodash");
let Student = require("Student");
let utilities = require("utilities");
let Globals = require("GlobalVariables");
let GlobalSpecifications = require("GlobalSpecifications");
/**
 * constructor. param  
 */
class StudentManager {

    /**
     * 
     * @param {ScheduleManager} properties.scheduleManager
     * @param {BuildingManager} properties.buildingManager
     */
    constructor(properties) {
        // properties
        this.nextStudentID = 0;
        // this.nextBuildingComponentID = 0;
        this.students = [];
        this.scheduleManager = properties.scheduleManager;
        this.buildingManager = properties.buildingManager;

        // constructor left-overs
    }

}

// methods

/**
 *  - schedule assigned to this student
 * 
 */
StudentManager.prototype.add = function (properties) {
    let propertiesRevised = _.cloneDeep(properties);
    propertiesRevised["id"] = this.nextStudentID++;
    let student = new Student(propertiesRevised);
    this.students.push(student);

};

/**
 * reassign all schedules for students. called at the
 * beginning of a semester
 * 
 */
StudentManager.prototype.reassign = function (properties) {
    // remove old
    for (let student of this.students) {
        if (student.schedule != undefined) {
            this.scheduleManager.remove(student.schedule.id);
            student.schedule = undefined;
        }
    }

    // assign new
    for (let student of this.students) {
        student.assignSchedule(this.scheduleManager.getNewSchedule({
            studentID: student.id,
        }));
    }
};


/**
 * 
 * @param {String} difficulty - one of DIFFICULTY_*
 */
StudentManager.prototype.init = function (difficulty) {
    for (let i = 0; i < GlobalSpecifications.initialStudentNumber; ++i) {
        this.add({});
    }
};

/**
 * @param {Number} tick
 */
StudentManager.prototype.update = function (tick) {
    const inDayTime = tick % Globals.TICKS_DAY;

    if (tick % Globals.TICKS_SEMESTER === 0) {
        this.reassign({});
    }

    // students leave old building and arrive at new building
    for (let student of this.students) {
        student.where = student.schedule.content[inDayTime];

    }
    // update satisfactions for all students
    // done in updateSatisfaction
};

/**
 * @param {Number} tick
 */
StudentManager.prototype.updateSatisfaction = function () {
    for (let student of this.students) {
        for (let type in student.indexes) {
            let current = this.buildingManager.getSatisfaction(
                student.where, type);
            utilities.log("sat update (undef. if no.): " + student.where +
                " " + current, "debug");
            student.indexes[type].update(current);
        }
    }
};

/**
 * @param {String} type
 */
StudentManager.prototype.getOverallIndex = function (type) {
    let sum = 0.0;
    let cnt = 0;
    for (let student of this.students) {
        cnt++;
        sum += student.indexes[type].value;
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
        " " + this.getOverallIndex("studyIndex"));
    console.log("------------------------------------------------------");
};


module.exports = StudentManager;
