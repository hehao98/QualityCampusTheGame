// Building abstruct all in-game buildings
let Globals = require("GlobalVariables");
let utilities = require("utilities");
let BuildingSpecifications = require("BuildingSpecifications");
let BuildingComponent = require("BuildingComponent");

let nameGenerators = {
    dorm: BuildingSpecifications.dorm.nameGenerator(),
    teaching: BuildingSpecifications.teaching.nameGenerator(),
    cafeteria: BuildingSpecifications.cafeteria.nameGenerator(),
    lab: BuildingSpecifications.lab.nameGenerator(),
};

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

        this.name = nameGenerators[this.type].next().value;
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

// Building.prototype.upgrade = function () {
//     this.tier++;
//     this.loadSpecifications();
//     return OK;
// };

/**
 *
 */
Building.prototype.addComponent = function (properties) {
    this.components.push(
        new BuildingComponent(properties));
};

Building.prototype.debugPrint = function () {
    utilities.log(`[${this.id}] ` +
        `${this.type} Lv.${this.tier} ` +
        `[${this.components.length} components]` +
        `${JSON.stringify(this.nStudentAssigned)} ` +
        this.buildingEndTime);
    for (let component of this.components) {
        component.debugPrint({ indent: 4 });
    }
};

module.exports = Building;
