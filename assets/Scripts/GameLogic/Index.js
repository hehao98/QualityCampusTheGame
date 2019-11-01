// Index abstruct all in-game indexes
// let IndexSpecifications = require("IndexSpecifications");
/**
 * 
 * @param - see createIndex
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

// /**
//  * warpped function for new Index(...)
//  * @param {Object} properties.value - The type of the index 
//  * @param {Object} properties.studentID - ID of the index 
//  */
// function createIndex(properties) {
//     return new Index(properties || {});
// }

module.exports = Index;