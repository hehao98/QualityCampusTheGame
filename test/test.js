let assert = require("assert");
let Resource = require("Resource");
let WorldRankManager = require("WorldRankManager");
let Globals = require("GlobalVariables");

describe("Resource", function() {
    let resource = new Resource({ name: "test", value: 10 });

    it("can be created with name and value properties", function() {
        assert(resource.name === "test");
        assert(resource.value === 10);
    });

    it("can add and process once modifers", function() {
        resource.addModifier({
            name: "once_modifier",
            type: "once",
            amount: 100
        });

        assert(resource.modifiers.length === 1);

        resource.updateResource(1);

        assert(resource.value === 110);
        assert(resource.modifiers.length === 0);
    });

    it("can manage and understand interval modifiers", function() {
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
        assert(resource.value === 120);
        resource.updateResource(Globals.TICKS_SEMESTER * 3);
        assert(resource.value === 120 + 10 - 100);

        resource.removeModifier("test_modifier2");
        assert(resource.modifiers.length === 1);
        assert(resource.modifiers[0].name === "test_modifier1");

        resource.addModifier({
            name: "test_modifier3",
            type: "interval",
            amount: 120,
            interval: "week"
        });
        assert(resource.getModificationAmount() === 130);
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

    it("can load initial data and ignore player univerisity", function() {
        assert(worldRankManager.getUniversityCount() === 3);
        assert(worldRankManager.universities[0].rank === 1);
        assert(worldRankManager.universities[1].rank === 2);
        assert(worldRankManager.universities[2].rank === 3);
        worldRankManager.universities.forEach(univ => {
            assert(univ.teachIndex && univ.careerIndex && univ.researchIndex);
        });
    });

    it("can handle player univerisity with others", function() {
        worldRankManager.addPlayerUniversity("pku", 0, 0, 0);
        // last univeristy should be removed
        assert(worldRankManager.universities.length === 3);
        assert(worldRankManager.universities[2].name === "pku");
        assert(worldRankManager.getCurrentRanking("pku") === 3);

        game.teachIndex = 100000;
        game.researchIndex = 100000;
        game.careerIndex = 100000;

        worldRankManager.updateRanking();

        assert(worldRankManager.getCurrentRanking("pku") === 1);
    });

    it("can hold player ranking values while altering other universities' ranking", function() {
        let univ = worldRankManager.getUniversity("pku");
        let oldTeachIndex = game.teachIndex;
        let oldCareerIndex = game.careerIndex;
        let oldResearchIndex = game.researchIndex;
        let checksum = worldRankManager.universities.reduce(
            (acc, univ) =>
                acc + univ.teachIndex + univ.careerIndex + univ.researchIndex
        );

        worldRankManager.updateRanking();

        assert(univ.teachIndex === oldTeachIndex);
        assert(univ.careerIndex === oldCareerIndex);
        assert(univ.researchIndex === oldResearchIndex);

        let checksum2 = worldRankManager.universities.reduce(
            (acc, univ) =>
                acc + univ.teachIndex + univ.careerIndex + univ.researchIndex
        );

        assert(checksum != checksum2);
    });
});
