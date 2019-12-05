// SatisfactionActive abstruct all in-game active satisfactions

let utilities = require("utilities");
let Satisfaction = require("Satisfaction");
// let SatisfactionSpecifications = require("SatisfactionSpecifications");
/**
 * 
 * @param -  
 */
class PassiveSatisfaction extends Satisfaction {

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

// PassiveSatisfaction.prototype.debugPrint = function () {
// };


module.exports = PassiveSatisfaction;