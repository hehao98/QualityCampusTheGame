let assert = require("chai").assert;
let WorldRankManager = require("WorldRankManager");

describe("WorldRankManager", function() {
    let game = {
        universityName: "pku",
        teachIndex: 0,
        researchIndex: 0,
        careerIndex: 0
    };
    let universityData = {
        json: [
            { name: "thu" },
            { name: "pku" },
            { name: "fdu" },
            { name: "sjtu" }
        ]
    };
    let worldRankManager = new WorldRankManager({
        game: game,
        universityData: universityData
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
        assert.strictEqual(worldRankManager.getPlayerRanking(), 3);

        game.teachIndex = 100000;
        game.researchIndex = 100000;
        game.careerIndex = 100000;

        worldRankManager.updateRanking();

        assert.strictEqual(worldRankManager.getPlayerRanking(), 1);
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