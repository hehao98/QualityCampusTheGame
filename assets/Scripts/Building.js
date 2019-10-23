// Building abstruct all in-game buildings

/**
 * see createBuilding
 */
function Building(properties) {
    this.type = properties.type;
}

/**
 * 
 * @param {string} properties.type - The type of the building 
 */
function createBuilding(properties){
    return new Building(properties || {});
}

module.exports = createBuilding;
