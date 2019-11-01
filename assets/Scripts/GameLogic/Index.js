// Index abstruct all in-game indexes
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
    console.log(this.value);
};


module.exports = Index;