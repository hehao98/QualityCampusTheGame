// SatisfactionActive abstruct all in-game active satisfactions

let utilities = require("utilities");
let Satisfaction = require("Satisfaction");
// let SatisfactionSpecifications = require("SatisfactionSpecifications");
/**
 * 
 * @param - see createSatisfaction
 */
class SatisfactionActive extends Satisfaction {

    constructor(properties) {
        // deligate
        super(properties);
        // properties

        // constructor left-overs
        // this.loadSpecifications();
    }
}

// methods

/**
 *
 */

// SatisfactionActive.prototype.debugPrint = function () {
// };

// /**
//  * warpped function for new SatisfactionActive(...)
//  * @param {Object} properties.value - The type of the satisfaction 
//  * @param {Object} properties.studentID - ID of the satisfaction 
//  */
// function createSatisfactionActive(properties) {
//     return new Satisfaction(properties || {});
// }

module.exports = SatisfactionActive;