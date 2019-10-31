// BuildingComponent abstruct all in-game building components

let BuildingComponentSpecifications =
    require("BuildingComponentSpecifications");

/**
 * see createBuildingComponent
 */
function BuildingComponent(properties) {
    // properties
    this.type = properties.type;
    this.id = properties.id;
    this.tier = 0;

    // constructor left-overs
    this.loadSpecifications();
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

/**
 * warpped function for new Building(...)
 * @param {Object} properties.type - The type of the building 
 * @param {Object} properties.id - ID of the building 
 */
function createBuildingComponent(properties) {
    return new BuildingComponent(properties || {});
}

module.exports = createBuildingComponent;
