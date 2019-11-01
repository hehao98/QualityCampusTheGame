// BuildingComponent abstruct all in-game building components

let BuildingComponentSpecifications =
    require("BuildingComponentSpecifications");

/**
 *  
 */
class BuildingComponent {
    constructor(properties) {
        // properties
        this.type = properties.type;
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
    console.log(" ".repeat(properties.indent) +
        `[${this.id}] ` +
        `${this.type} Lv.${this.tier}`);
};


module.exports = BuildingComponent;
