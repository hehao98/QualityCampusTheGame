// Building abstruct all in-game buildings
let BuildingSpecifications = require("BuildingSpecifications");
/**
 * see createBuilding
 */
function Building(properties) {
    // properties
    this.type = properties.type;
    this.id = properties.id;
    this.rank = 0;

    // methods
    this.loadSpecifications = function () {
        let specification =
            BuildingSpecifications[this.type][this.rank].defaultProperties;
        for (let property in specification) {
            this[property] = specification[property];
        }
    };
    this.upgrade = function () {
        this.rank++;
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
function createBuilding(properties) {
    return new Building(properties || {});
}

module.exports = createBuilding;
