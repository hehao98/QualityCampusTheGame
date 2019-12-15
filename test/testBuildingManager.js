let assert = require("chai").assert;
let BuildingManager = require("BuildingManager");
let BuildingSpecifications = require("BuildingSpecifications");


describe("BuildingManager", function () {
    let buildingManager = new BuildingManager();
    let dormID = undefined;
    it("should init correctly", function () {
        assert.isTrue(buildingManager != undefined);
    });
    it("should generate building names correctly", function () {
        let dorm = BuildingSpecifications.dorm.nameGenerator();
        assert.strictEqual(dorm.next().value, "二十八号楼");
    });
    it("should add building correctly", function () {
        assert.strictEqual(buildingManager.add({ type: "dorm" }), OK);
        dormID = _.find(buildingManager.buildings,
            function (building) {
                return building.type === "dorm";
            }).id;
        assert.isTrue(dormID > 0);

    });
    it("should add building component correctly", function () {

        assert.strictEqual(buildingManager.addComponent(
            { buildingID: dormID, componentName: "clean" }), OK);
    });

}); 
