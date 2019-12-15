// Building abstruct all in-game buildings
let Globals = require("GlobalVariables");
let utilities = require("utilities");
let BuildingSpecifications = require("BuildingSpecifications");
let BuildingComponent = require("BuildingComponent");
const _ = require("lodash");

let nameGenerators = {
    dorm: BuildingSpecifications.dorm.nameGenerator(),
    teaching: BuildingSpecifications.teaching.nameGenerator(),
    cafeteria: BuildingSpecifications.cafeteria.nameGenerator(),
    lab: BuildingSpecifications.lab.nameGenerator(),
    careerCenter: BuildingSpecifications.careerCenter.nameGenerator(),
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
        this.capacity = 0;

        // constructor left-overs
        // this.loadSpecifications();
        this.name = nameGenerators[this.type].next().value;
    }

}

// methods

Building.prototype.loadSpecifications = function () {
    utilities.log("loading for", "debug");
    utilities.log(this, "debug");
    const specification =
        BuildingSpecifications[this.type][this.tier].defaultProperties;
    for (let property in specification) {
        this[property] = specification[property];
    }
    // * updating unversity level modifiers
    if (this.researchTrainingProvided > 0) {
        let sum = 0;
        for (let building of Globals.buildingManager.buildings) {
            sum += building.researchTrainingProvided || 0;
        }
        Globals.universityLevelModifiers.researchTrainingProvided = sum;
    }
    if (this.careerTrainingProvided > 0) {
        let sum = 0;
        for (let building of Globals.buildingManager.buildings) {
            sum += building.careerTrainingProvided || 0;
        }
        Globals.universityLevelModifiers.careerTrainingProvided = sum;
    }
    // * updating modifiers provided by components
    let modifiers = {
        // <target property name>: multiplier
    };


    for (let component of this.components) {
        for (let property in component) {
            if (property === "capacity" || Globals.INDEXES.includes(property)) {
                if (modifiers[property] === undefined) {
                    modifiers[property] = 1.0;
                }
                modifiers[property] *= (1 + component[property]);
            }
        }
    }
    for (let target in modifiers) {
        this[target] *= modifiers[target];
    }


    return Globals.OK;

};

Building.prototype.update = function () {
    if (this.upgradingEndTime &&
        Globals.tick === this.upgradingEndTime) {
        this.tier++;
        this.loadSpecifications();
    }
    if (this.buildingEndTime &&
        Globals.tick === this.buildingEndTime) {
        this.tier = 0;
        this.loadSpecifications();
    }
    return Globals.OK;
};

/**
 * @param {String} properties.componentName - name of component
 */
Building.prototype.addComponent = function (properties) {
    this.components.push(
        new BuildingComponent(properties));
    this.loadSpecifications();
    return Globals.OK;
};

/**
 * @param {Number} id component id for removal
 */
Building.prototype.removeComponent = function (id) {

    _.remove(this.components, { id: id });
    this.loadSpecifications();

    return Globals.OK;
};

Building.prototype.debugPrint = function () {
    // utilities.log(this);
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
