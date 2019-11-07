let assert = require("chai").assert;
let Utilities = require("utilities");
let Resource = require("Resource");
let WorldRankManager = require("WorldRankManager");
let Globals = require("GlobalVariables");

describe("Utilities", function() {
    it("should handle tick conversion correctly", function() {
        let tickProps = Utilities.getTickProperties(1600);
        assert.strictEqual(tickProps.year, 2019);
        assert.strictEqual(tickProps.semester, 3);
        assert.strictEqual(tickProps.week, 6);
        assert.strictEqual(tickProps.day, Globals.DAY.SAT);
        assert.strictEqual(tickProps.time, Globals.TIME.MORNING);     
    });
    it("should convert tick to string correctly", function() {
        let tickString = Utilities.getTickString(1600);
        assert.strictEqual(tickString, "2019学年第一学期第6周星期六 上午");
    });
});

describe("Resource", function() {
    let resource = new Resource({ name: "test", value: 10 });

    it("should be created given name and value properties", function() {
        assert.strictEqual(resource.name, "test");
        assert.strictEqual(resource.value, 10);
    });

    it("should update resource value given a once modifer", function() {
        resource.addModifier({
            name: "once_modifier",
            type: "once",
            amount: 100
        });

        assert.strictEqual(resource.modifiers.length, 1);

        resource.updateResource(1);

        assert.strictEqual(resource.value, 110);
        assert.strictEqual(resource.modifiers.length, 0);
    });

    it("should update value periodically with interval modifiers", function() {
        resource.addModifier({
            name: "test_modifier1",
            type: "interval",
            amount: 10,
            interval: "week"
        });
        resource.addModifier({
            name: "test_modifier2",
            type: "interval",
            amount: -100,
            interval: "semester"
        });
        resource.updateResource(Globals.TICKS_WEEK * 5);
        assert.strictEqual(resource.value, 120);
        resource.updateResource(Globals.TICKS_SEMESTER * 3);
        assert.strictEqual(resource.value, 120 + 10 - 100);

        resource.removeModifier("test_modifier2");
        assert.strictEqual(resource.modifiers.length, 1);
        assert.strictEqual(resource.modifiers[0].name, "test_modifier1");

        resource.addModifier({
            name: "test_modifier3",
            type: "interval",
            amount: 120,
            interval: "week"
        });
        assert.strictEqual(resource.getModificationAmount(), 130);
    });
});

describe("WorldRankManager", function() {
    let game = {
        universityName: "pku",
        teachIndex: 123,
        researchIndex: 456,
        careerIndex: 789
    };
    let worldRankManager = new WorldRankManager({
        game: game,
        universityData: {
            json: [
                { name: "thu" },
                { name: "pku" },
                { name: "fdu" },
                { name: "sjtu" }
            ]
        }
    });

    it("should load initial data while ignoring player univerisity in initial data", function() {
        assert.strictEqual(worldRankManager.getUniversityCount(), 3);
        assert.strictEqual(worldRankManager.universities[0].rank, 1);
        assert.strictEqual(worldRankManager.universities[1].rank, 2);
        assert.strictEqual(worldRankManager.universities[2].rank, 3);
        worldRankManager.universities.forEach(univ => {
            assert.isOk(univ.teachIndex && univ.careerIndex && univ.researchIndex);
        });
    });

    it("should insert player univerisity in the correct ranking position", function() {
        worldRankManager.addPlayerUniversity("pku", 0, 0, 0);
        // last univeristy should be removed
        assert.strictEqual(worldRankManager.universities.length, 3);
        assert.strictEqual(worldRankManager.universities[2].name, "pku");
        assert.strictEqual(worldRankManager.getCurrentRanking("pku"), 3);

        game.teachIndex = 100000;
        game.researchIndex = 100000;
        game.careerIndex = 100000;

        worldRankManager.updateRanking();

        assert.strictEqual(worldRankManager.getCurrentRanking("pku"), 1);
    });

    it("should hold player ranking values while altering other universities' ranking", function() {
        let univ = worldRankManager.getUniversity("pku");
        let oldTeachIndex = game.teachIndex;
        let oldCareerIndex = game.careerIndex;
        let oldResearchIndex = game.researchIndex;
        let checksum = worldRankManager.universities.reduce(
            (acc, univ) =>
                acc + univ.teachIndex + univ.careerIndex + univ.researchIndex
        );

        worldRankManager.updateRanking();

        assert.strictEqual(univ.teachIndex, oldTeachIndex);
        assert.strictEqual(univ.careerIndex, oldCareerIndex);
        assert.strictEqual(univ.researchIndex, oldResearchIndex);

        let checksum2 = worldRankManager.universities.reduce(
            (acc, univ) =>
                acc + univ.teachIndex + univ.careerIndex + univ.researchIndex
        );

        assert.notStrictEqual(checksum, checksum2);
    });

    it("should return neighboring ranking universities correctly", function() {
        let univs = worldRankManager.getNeighborUniversities("pku", 3);
        assert.strictEqual(univs.length, 3);
        assert.strictEqual(univs[0].name, "pku");
    });
});
