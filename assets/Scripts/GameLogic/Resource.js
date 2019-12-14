// A class to manage a specfic kind of resource (e.g. fund, etc)

let assert = require("assert");
let _ = require("lodash");
let Globals = require("GlobalVariables");

let modifierTypes = ["fixed", "building", "student", "teacher"];

class Resource {
    /**
     * @param {String} properties.name name of this resource
     * @param {Number} properties.value initial value, default zero 
     */
    constructor(properties) {
        this.name = properties.name;
        this.value = properties.value || 0;
        this.nextModifierId = 0;
        this.modifiers = [];

        // Some statistics for showing game progress
        this.totalEarned = 0;
        this.totalSpent = 0;
    }
}

/**
 * Checks and update the resource values according to its modifiers
 * Should only be called by Game.js at every tick.
 *
 * @param {Number} tick current game tick
 */
Resource.prototype.updateResource = function (tick) {
    if (tick % Globals.TICKS_WEEK === 0) {
        this.modifiers.forEach(modifier => {
            this.value += modifier.amount;
            if (modifier.amount > 0) {
                this.totalEarned += modifier.amount;
            } else {
                this.totalSpent -= modifier.amount;
            }
        }, this);
    }
};

/**
 * Try to use <amount> of this resource.
 * @param {Number} amount
 * @return {Boolean} success or not. only cost when succeed.
 */
Resource.prototype.use = function (amount) {
    if (this.value >= amount) {
        this.value -= amount;
        this.totalSpent += amount;
        return true;
    }
    else {
        return false;
    }
};

/**
 * Add a modifier to this resource, returns its id.
 * If the caller want to remove this modifier some times later, 
 * it must use this id.
 * It's the caller's responsibility to save modifier id.
 * 
 * @param {String} modifier.type see modifierTypes for acceptable values
 * @param {Object} modifier.amount number, can be positive or negative
 * @return {Number} modifier id
 */
Resource.prototype.addModifier = function (modifier) {
    assert(modifierTypes.includes(modifier.type));
    assert(Number.isInteger(modifier.amount));
    modifier = _.cloneDeep(modifier);
    modifier.id = this.nextModifierId++;
    this.modifiers.push(modifier);
    return modifier.id;
};

/**
 * Set a specific modifier to a new value
 * @param {Number} modifierId
 * @param {Number} newValue
 */
Resource.prototype.setModifierAmount = function (modifierId, newAmount) {
    let idx = this.modifiers.findIndex(m => m.id === modifierId);
    assert(idx !== -1);
    this.modifiers[idx].amount = newAmount;
};

/**
 * Remove a modifier with the given id.
 * @param {Number} modifierId
 */
Resource.prototype.removeModifier = function (modifierId) {
    assert(this.modifiers.findIndex(m => m.id === modifierId) != -1);
    this.modifiers = this.modifiers.filter(
        modifier => modifier.id !== modifierId
    );
};

/**
 * @param {String} type if undefined, consider all modifiers
 *     otherwise, consider only modifiers in certain type (see modifierTypes)
 * @return {Number} Total modification amount of this resource
 */
Resource.prototype.getWeeklyModification = function (type) {
    if (type !== undefined) {
        assert(modifierTypes.includes(type));
    }
    
    let result = 0;
    this.modifiers.forEach(modifier => {
        if (type === undefined || modifier.type === type) {
            result += modifier.amount;
        }
    });
    return result;
};

/**
 * @param {String} type if undefined, consider all modifiers
 *     otherwise, consider only modifiers in certain type (see modifierTypes)
 * @return {Number} Total weekly gain of this resource
 */
Resource.prototype.getWeeklyGain = function (type) {
    if (type !== undefined) {
        assert(modifierTypes.includes(type));
    }
    
    let result = 0;
    this.modifiers.forEach(modifier => {
        if (modifier.amount <= 0) return;
        if (type === undefined || modifier.type === type) {
            result += modifier.amount;
        }
    });
    return result;
};

/**
 * @param {String} type if undefined, consider all modifiers
 *     otherwise, consider only modifiers in certain type (see modifierTypes)
 * @return {Number} Total weekly cost of this resource
 */
Resource.prototype.getWeeklyCost = function (type) {
    if (type !== undefined) {
        assert(modifierTypes.includes(type));
    }
    
    let result = 0;
    this.modifiers.forEach(modifier => {
        if (modifier.amount >= 0) return;
        if (type === undefined || modifier.type === type) {
            result += modifier.amount;
        }
    });
    return result;
};

module.exports = Resource;
