// Index abstruct all in-game indexes
let utilities = require("utilities");

// let IndexSpecifications = require("IndexSpecifications");
/**
 * 
 * @param -  
 */
class Index {
    constructor(properties) {
        // properties
        this.value = properties.value;
        this.studentID = properties.studentID;

        // constructor left-overs
        // this.loadSpecifications();
    }
}


// methods

/**
 *
 */

Index.prototype.debugPrint = function () {
    utilities.log(this.value);
};

Index.prototype.update = function (buildingValue) {
    if (buildingValue === undefined) {
        return;
    }
    this.value = 0.95 * this.value + 0.05 * buildingValue;
};


module.exports = Index;