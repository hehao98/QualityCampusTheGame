// Satisfaction abstruct all in-game satisfactions

let utilities = require("utilities");
let Index = require("Index");


// let SatisfactionSpecifications = require("SatisfactionSpecifications");
class Satisfaction extends Index {

    /**
     * 
     * @param -  
     */
    constructor(properties) {
        // deligate
        if (properties.value === undefined) {
            properties.value = 0.5;
        }
        super(properties);
        // properties

        // constructor left-overs
        // this.loadSpecifications();
    }
}

// methods
/**
 * @param {Number} buildingValue - satisfactions provided by the building.
 *  undefined if not provided.
 */
Satisfaction.prototype.update = function (buildingValue) {
    if (buildingValue === undefined) {
        return;
    }
    this.value = 0.95 * this.value + 0.05 * buildingValue;
}

module.exports = Satisfaction;