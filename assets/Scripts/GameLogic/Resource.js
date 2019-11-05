// A class to manage a specfic kind of resource (e.g. fund, influence, etc)

let assert = require("assert");
let Globals = require("GlobalVariables");

class Resource {

    constructor(properties) {
        this.name = properties.name;
        this.value = properties.value || 0;
        this.modifiers = [];
    }
}

/**
 * Checks and update the resource values according to its modifiers
 * Should only be called by Game.js at every tick.
 *
 * @param {Number} tick current game tick
 */
Resource.prototype.updateResource = function (tick) {
    let toBeRemoved = [];
    this.modifiers.forEach(modifier => {
        if (modifier.type === "once") {
            this.value += modifier.amount;
            toBeRemoved.push(modifier.name);
        } else if (modifier.type === "interval") {
            if (
                modifier.interval === "semester" &&
                tick % Globals.TICKS_SEMESTER === 0
            ) {
                this.value += modifier.amount;
            }
            if (
                modifier.interval === "week" &&
                tick % Globals.TICKS_WEEK === 0
            ) {
                this.value += modifier.amount;
            }
        }
    }, this);
    toBeRemoved.forEach(name => {
        this.removeModifier(name);
    });
};

/**
 * Add a modifier to this resource.
 * @param {Object} modifier.name The name of this modifier, should be unique
 * @param {Object} modifier.type string, should be "interval" or "once"
 * @param {Object} modifier.amount number, can be positive or negative
 * @param {Object} modifier.interval "week" or "semester", for interval modifiers
 */

Resource.prototype.addModifier = function (modifier) {
    assert(modifier.name);
    assert(modifier.type === "interval" || modifier.type === "once");
    assert(Number.isInteger(modifier.amount));
    if (modifier.type === "interval") {
        assert(
            modifier.interval === "week" || modifier.interval === "semester"
        );
    }

    this.modifiers.push(modifier);
};

/**
 * Remove a modifier with the given name
 * @param {Object} modifierName
 */
Resource.prototype.removeModifier = function (modifierName) {
    assert(this.modifiers.findIndex(m => m.name === modifierName) != -1);

    this.modifiers = this.modifiers.filter(
        modifier => modifier.name !== modifierName
    );
};

/**
 * @return {Number} Total weekly modification amount of this resource
 */
Resource.prototype.getModificationAmount = function () {
    let result = 0;
    this.modifiers.forEach(modifier => {
        if (modifier.type === "interval" && modifier.interval === "week") {
            result += modifier.amount;
        }
    });
    return result;
};



module.exports = Resource;