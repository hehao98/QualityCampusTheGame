// Student abstruct all in-game students
// let StudentSpecifications = require("StudentSpecifications");
/**
 *  
 */

class Student {

    constructor(properties) {
        // properties
        this.id = properties.id;
        this.schedule = properties.schedule;

        // constructor left-overs
        // this.loadSpecifications();
    }

}


// ------------------- methods ------------------- //


Student.prototype.loadSpecifications = function () {
    // may not be needed
};


Student.prototype.debugPrint = function (properties) {
    console.log(" ".repeat(properties.indent) +
        `[${this.id}]`);
    this.schedule.debugPrint({ indent: properties.indent + 4 });

};


module.exports = Student;
