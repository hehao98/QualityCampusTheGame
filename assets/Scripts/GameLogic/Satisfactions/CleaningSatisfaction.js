// SatisfactionActive abstruct all in-game active satisfactions

let utilities = require("utilities");
let PassiveSatisfaction = require("PassiveSatisfaction");
// let SatisfactionSpecifications = require("SatisfactionSpecifications");
/**
 * 
 * @param -  
 */
class CleaningSatisfaction extends PassiveSatisfaction {

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

// CleaningSatisfaction.prototype.debugPrint = function () {
// };


module.exports = CleaningSatisfaction;