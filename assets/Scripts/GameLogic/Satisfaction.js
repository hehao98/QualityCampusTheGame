// Satisfaction abstruct all in-game satisfactions

let utilities = require("utilities");
let Index = require("Index").Index;
let createIndex = require("Index").createIndex;

// let SatisfactionSpecifications = require("SatisfactionSpecifications");
/**
 * 
 * @param - see createSatisfaction
 */
function Satisfaction(properties) {
    // deligate
    Index.call(this, properties);
    // properties
    // constructor left-overs
    // this.loadSpecifications();
}
utilities.inherits(Satisfaction, Index);

// methods

/**
 *
 */

// Satisfaction.prototype.debugPrint = function () {
// };

/**
 * warpped function for new Satisfaction(...)
 * @param {Object} properties.value - The type of the satisfaction 
 * @param {Object} properties.studentID - ID of the satisfaction 
 */
function createSatisfaction(properties) {
    return new Satisfaction(properties || {});
}

module.exports = {
    createSatisfaction: createSatisfaction,
    Satisfaction: Satisfaction,
};