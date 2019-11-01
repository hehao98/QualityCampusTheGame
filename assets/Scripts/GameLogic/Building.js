// Building abstruct all in-game buildings
let BuildingSpecifications = require("BuildingSpecifications");
let BuildingComponent = require("BuildingComponent");

class Building {

    constructor(properties) {
        // properties
        this.type = properties.type;
        this.id = properties.id;
        this.components = [];
        this.tier = 0;


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
        `[${this.components.length} components]`);
    for (let c of this.components) {
        c.debugPrint({ indent: 4 });
    }
};

module.exports = Building;
