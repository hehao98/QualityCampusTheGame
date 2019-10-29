let createBuildingManager = require("BuildingManager");
let createStudentManager = require("StudentManager");

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

    let StudentManager = createStudentManager();
    StudentManager.add({});
    StudentManager.add({});
    StudentManager.debugPrint();
    
};

module.exports = test;