// BuildingComponent abstruct all in-game building components

let BuildingComponentSpecifications = require("BuildingComponentSpecifications");
/**
 * see createBuildingComponent
 */
function BuildingComponent(properties) {
    // properties
    this.type = properties.type;
    this.tier = 0;

    // methods
    this.loadSpecifications = function () {
        let specification =
            BuildingComponentSpecifications[this.type][this.tier].defaultProperties;
        for (let property in specification) {
            this[property] = specification[property];
        }
    };
    this.upgrade = function () {
        this.tier++;
        this.loadSpecifications();
    };

    this.debugPrint = function () {
        console.log(this);
    };

    // constructor left-overs
    this.loadSpecifications();

}

/**
 * warpped function for new Building(...)
 * @param {Object} properties.type - The type of the building 
 * @param {Object} properties.id - ID of the building 
 */
function createBuildingComponent(properties) {
    return new BuildingComponent(properties || {});
}

module.exports = createBuildingComponent;
