// StudyIndex abstruct all in-game StudyIndex
let utilities = require("utilities");
let Index = require("Index");

/**
 * 
 * @param -  
 */
class StudyIndex extends Index {
    constructor(properties) {
        if (properties.value === undefined) {
            properties.value = 0.5;
        }
        super(properties);

        // constructor left-overs
        // this.loadSpecifications();
    }
}


// methods

/**
 *
 */

StudyIndex.prototype.debugPrint = function () {
    utilities.log(this.value);
};


module.exports = StudyIndex;