// Satisfaction abstruct all in-game satisfactions

let utilities = require("utilities");
let Index = require("Index");


// let SatisfactionSpecifications = require("SatisfactionSpecifications");
class Satisfaction extends Index {

    /**
     * 
     * @param - see createSatisfaction
     */
    constructor(properties) {
        // deligate
        super(properties);
        // properties

        // constructor left-overs
        // this.loadSpecifications();
    }
}

// methods

module.exports = Satisfaction;