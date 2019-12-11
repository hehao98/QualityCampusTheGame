let Globals = require("GlobalVariables");
let utilities = require("utilities");

/**
 * 
 * @param -  
 */
class AdmissionManager {
    constructor(properties) {
        // properties
        this.admissionTarget = 0;
    }
}


// methods

/**
 *
 */
AdmissionManager.prototype.setTarget = function (target) {
    this.admissionTarget = target;
};

AdmissionManager.prototype.admit = function () {
    for (let i = 0; i < this.admissionTarget; ++i) {
        Globals.studentManager.add({});
    }
};


AdmissionManager.prototype.debugPrint = function () {
};

AdmissionManager.prototype.update = function (buildingValue) {

};


module.exports = AdmissionManager;