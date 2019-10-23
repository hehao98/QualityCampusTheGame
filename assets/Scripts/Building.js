// Building abstruct all in-game buildings

/**
 * see createBuilding
 */
function Building(properties) {
    this.type = properties.type;
    this.id = properties.id;
    this.rank = 0;
    this.debugPrint = function(){
        console.log(this.type);
    };
}

/**
 * warpped function for new Building(...)
 * @param {Object} properties.type - The type of the building 
 * @param {Object} properties.id - ID of the building 
 */
function createBuilding(properties){
    return new Building(properties || {});
}

module.exports = createBuilding;
