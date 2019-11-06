/**
 * utilities defines global utility functions and properties
 */
let Globals = require("GlobalVariables");

let utilities = {
    inherits: function (Child, Parent) {
        var Trans = function () { };
        Trans.prototype = Parent.prototype;
        Child.prototype = new Trans();
        Child.prototype.constructor = Child;
    },

    logLevels: {
        "debug": 5,
        "info": 10,
        "warning": 15,
        "error": 20,
        "fatal": 25,
    },
    logPermitted: function (level) {
        return this.logLevels[level] >=
            this.logLevels[Globals.LOG_LEVEL];
    },
    log: function (message, level = "info") {
        if (this.logPermitted(level)) {
            console.log(message);
        }
    }
};

module.exports = utilities;