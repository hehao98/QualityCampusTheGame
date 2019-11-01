// Class StudentManager

let _ = require("lodash");
let Student = require("Student");
let GlobalSpecifications = require("GlobalSpecifications");
/**
 * constructor. param  
 */
class StudentManager {

    constructor(properties) {
        // properties
        this.nextStudentID = 0;
        // this.nextBuildingComponentID = 0;
        this.students = [];
        this.scheduleManager = properties.scheduleManager;

        // constructor left-overs
    }

}

// methods

/**
 * @param {Object} properties.schedule 
 *  - schedule assigned to this student
 * 
 */
StudentManager.prototype.add = function (properties) {
    let propertiesRevised = _.cloneDeep(properties);
    propertiesRevised["id"] = this.nextStudentID++;
    propertiesRevised["schedule"] =
        this.scheduleManager.getNewSchedule({
            studentID: propertiesRevised["id"],
        });
    this.students.push(new Student(propertiesRevised));

};

/**
 * 
 * @param {String} difficulty - one of DIFFICULTY_*
 */
StudentManager.prototype.init = function (difficulty) {
    for (let i = 0; i < GlobalSpecifications.initialStudentNumber; ++i) {
        this.add({});
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
