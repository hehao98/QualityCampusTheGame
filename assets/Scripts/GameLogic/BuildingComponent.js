// BuildingComponent abstruct all in-game building components
let utilities = require("utilities");
let BuildingComponentSpecifications =
    require("BuildingComponentSpecifications");

/**
 *  
 */
class BuildingComponent {
    constructor(properties) {
        // properties
        this.type = properties.componentName;
        this.id = properties.id;
        this.tier = 0;

        // constructor left-overs
        this.loadSpecifications();
    }
}


// methods
BuildingComponent.prototype.loadSpecifications = function () {
    let specification =
        BuildingComponentSpecifications[
            this.type][this.tier].defaultProperties;
    for (let property in specification) {
        this[property] = specification[property];
    }
};
BuildingComponent.prototype.upgrade = function () {
    this.tier++;
    this.loadSpecifications();
};

BuildingComponent.prototype.debugPrint = function (properties) {
    utilities.log(" ".repeat(properties.indent) +
        `[${this.id}] ` +
        `${this.type} Lv.${this.tier}`);
};


module.exports = BuildingComponent;
