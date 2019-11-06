// Class StudentManager

let _ = require("lodash");
let Student = require("Student");
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
}

/**
 * @param {Number} tick
 */
StudentManager.prototype.updateSatisfaction = function () {
    for (let student of this.students) {
        for (let type in student.satisfactions) {
            student.satisfactions[type].update(
                this.buildingManager.getSatisfaction(student.where, type));
        }
    }
}

StudentManager.prototype.debugPrint = function () {
    console.log("[StudentManager DebugPrint]");
    console.log("student number: " + this.students.length);
    for (let s of this.students) {
        s.debugPrint({ indent: 4 });
    }
    console.log("------------------------------------------------------");
};


module.exports = StudentManager;
