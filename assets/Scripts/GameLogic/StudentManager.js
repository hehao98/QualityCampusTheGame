// Class StudentManager

let _ = require("lodash");
let createStudent = require("Student");

/**
 * constructor. param see createBuildingManager
 */
function StudentManager(properties) {
    // properties
    this.nextStudentID = 0;
    // this.nextBuildingComponentID = 0;
    this.students = [];


    // constructor left-overs

}

// methods
/**
 * 
 */
StudentManager.prototype.add = function (properties) {
    let r = _.cloneDeep(properties);
    r["id"] = this.nextStudentID++;
    this.students.push(createStudent(r));

};

StudentManager.prototype.debugPrint = function () {
    console.log("[StudentManager DebugPrint]");
    console.log("student number: " + this.students.length);
    for (let b of this.students) {
        b.debugPrint();
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
