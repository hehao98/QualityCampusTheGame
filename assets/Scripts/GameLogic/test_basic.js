let createBuildingManager = require("BuildingManager");
let createStudentManager = require("StudentManager");
let createScheduleManager = require("ScheduleManager");


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

    let scheduleManager = createScheduleManager();
    let studentManager = createStudentManager({
        scheduleManager: scheduleManager
    });
    studentManager.add({});
    studentManager.add({});
    studentManager.debugPrint();

};

module.exports = test;