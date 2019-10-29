// Student abstruct all in-game students
// let StudentSpecifications = require("StudentSpecifications");
/**
 * see createStudent
 */
function Student(properties) {
    // properties
    this.id = properties.id;
    this.schedule = this.generateSchedule();

    // constructor left-overs
    // this.loadSpecifications();

}


// ------------------- methods ------------------- //

Student.prototype.generateSchedule = function () {

};


Student.prototype.loadSpecifications = function () {
    // may not be needed
};


Student.prototype.debugPrint = function () {
    console.log(`[${this.id}]`);

};

/**
 * warpped function for new Student(...)
 * @param {Object} properties.id - ID of the student 
 */
function createStudent(properties) {
    return new Student(properties || {});
}

module.exports = createStudent;
