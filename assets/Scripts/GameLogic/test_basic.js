let createBuildingManager = require("BuildingManager");

let test = function () {
    let buildingManager = createBuildingManager();
    buildingManager.add({ type: "dorm" });
    buildingManager.add({ type: "teaching" });
    buildingManager.debugPrint();
    buildingManager.addComponent({
        buildingID: 0,
        type: "clean",
    });
    buildingManager.debugPrint();

};

module.exports = test;