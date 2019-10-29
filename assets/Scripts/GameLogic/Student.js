// Student abstruct all in-game students
// let StudentSpecifications = require("StudentSpecifications");
/**
 * see createStudent
 */

function Student(properties) {
    // properties
    this.id = properties.id;
    this.schedule = properties.schedule;

    // constructor left-overs
    // this.loadSpecifications();

}


// ------------------- methods ------------------- //


Student.prototype.loadSpecifications = function () {
    // may not be needed
};


Student.prototype.debugPrint = function () {
    console.log(`[${this.id}]`);
    this.schedule.debugPrint();

};

/**
 * warpped function for new Student(...)
 * @param {Object} properties.id - ID of the student 
 * @param {Object} properties.schedule - schedule
 */
function createStudent(properties) {
    return new Student(properties || {});
}

module.exports = createStudent;
