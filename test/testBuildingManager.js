let assert = require("chai").assert;
let BuildingManager = require("BuildingManager");
let BuildingSpecifications = require("BuildingSpecifications");


describe("BuildingManager", function () {
    let buildingManager = new BuildingManager();
    it("should init correctly", function () {

    });

    it("should generate building names correctly", function () {
        let dorm = BuildingSpecifications.dorm.nameGenerator();
        assert.strictEqual(dorm.next().value, "二十八号楼");

    });


}); 