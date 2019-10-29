// Class StudentManager

let _ = require("lodash");
let createStudent = require("Student");

/**
 * constructor. param see createScheduleManager
 */
function StudentManager(properties) {
    // properties
    this.nextStudentID = 0;
    // this.nextBuildingComponentID = 0;
    this.students = [];
    this.scheduleManager = properties.scheduleManager;

    // constructor left-overs

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
    this.students.push(createStudent(propertiesRevised));

};

StudentManager.prototype.debugPrint = function () {
    console.log("[StudentManager DebugPrint]");
    console.log("student number: " + this.students.length);
    for (let s of this.students) {
        s.debugPrint({ indent: 4 });
    }
    console.log("------------------------------------------------------");
};

/**
 * warpped function for new StudentManager(...)
 */
function createStudentManager(properties) {
    return new StudentManager(properties || {});
}

module.exports = createStudentManager;
