// Building abstruct all in-game buildings
let Globals = require("GlobalVariables");
let BuildingSpecifications = require("BuildingSpecifications");
let BuildingComponent = require("BuildingComponent");

class Building {

    constructor(properties) {
        // properties
        this.type = properties.type;
        this.id = properties.id;
        this.components = [];
        this.tier = 0;
        this.nStudentAssigned = {
            [Globals.MORNING]: 0,
            [Globals.NOON]: 0,
            [Globals.AFTERNOON]: 0,
            [Globals.EVENING]: 0,
            [Globals.NIGHT]: 0,
        };

        // constructor left-overs
        this.loadSpecifications();
    }

}

// methods

Building.prototype.loadSpecifications = function () {
    let specification =
        BuildingSpecifications[this.type][this.tier].defaultProperties;
    for (let property in specification) {
        this[property] = specification[property];
    }
};
Building.prototype.upgrade = function () {
    this.tier++;
    this.loadSpecifications();
    return true;
};

/**
 *
 */
Building.prototype.addComponent = function (properties) {
    this.components.push(
        new BuildingComponent(properties));
};

Building.prototype.debugPrint = function () {
    console.log(`[${this.id}] ` +
        `${this.type} Lv.${this.tier} ` +
        `[${this.components.length} components]` +
        `${JSON.stringify(this.nStudentAssigned)}`);
    for (let c of this.components) {
        c.debugPrint({ indent: 4 });
    }
};

module.exports = Building;
