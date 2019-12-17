let assert = require("chai").assert;
const BuildingManager = require("BuildingManager");
const BuildingSpecifications = require("BuildingSpecifications");
const Globals = require("GlobalVariables");
const Resource = require("Resource");
const _ = require("lodash");
const utilities = require("utilities");

describe("BuildingManager", function () {
    // * env settings
    let buildingManager = new BuildingManager();
    let dorm = undefined;
    let dormID = undefined;
    Globals.game = {};
    let fund = Globals.game.fund = new Resource({ name: "fund", value: 80000000 });

    it("should init correctly", function () {
        assert.isTrue(buildingManager != undefined);
    });
    it("should generate building names correctly", function () {
        let dorm = BuildingSpecifications.dorm.nameGenerator();
        assert.strictEqual(dorm.next().value, "二十八号楼");
    });
    it("should add building correctly", function () {
        assert.strictEqual(buildingManager.add({ type: "dorm" }), Globals.OK);
        dorm = _.find(buildingManager.buildings,
            function (building) {
                return building.type === "dorm";
            });
        dormID = dorm.id;
        dorm.loadSpecifications();  // load in advance for testing
        assert.isTrue(dormID >= 0);
    });
    it("should add building component correctly", function () {
        assert.strictEqual(buildingManager.addComponent(
            { buildingID: dormID, componentName: "studyArea" }), Globals.OK);
        assert.strictEqual(buildingManager.getBuildingById(dormID).studySatisfaction, 0.55);
    });

    it("should remove building component correctly", function () {
        assert.strictEqual(buildingManager.removeComponent(
            { buildingID: dormID, componentName: "studyArea", componentId: 0 }), Globals.OK);
        assert.strictEqual(buildingManager.getBuildingById(dormID).studySatisfaction, 0.5);
    });

});

