/**
 * utilities defines global utility functions and properties
 */
let utilities = {
    inherits: function (Child, Parent) {
        var Trans = function () { };
        Trans.prototype = Parent.prototype;
        Child.prototype = new Trans();
        Child.prototype.constructor = Child;
    },
};

module.exports = utilities;