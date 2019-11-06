let BuildingManager = require("BuildingManager");
let StudentManager = require("StudentManager");
let ScheduleManager = require("ScheduleManager");
let ActiveSatisfaction = require("ActiveSatisfaction");

let test = function () {
    let buildingManager = new BuildingManager();
    buildingManager.add({ type: "dorm" });
    buildingManager.add({ type: "teaching" });
    buildingManager.debugPrint();
    buildingManager.addComponent({
        buildingID: 0,
        type: "clean",
    });
    buildingManager.debugPrint();

    let scheduleManager = new ScheduleManager();
    let studentManager = new StudentManager({
        scheduleManager: scheduleManager,
    });
    studentManager.add({});
    studentManager.add({});
    studentManager.debugPrint();

    // Index
    let sat = new ActiveSatisfaction({
        value: 10,
        studentID: 0,
    });
    console.log(sat.value);
};

module.exports = test;