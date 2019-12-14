let assert = require("chai").assert;
let Resource = require("Resource");
let StudentManager = require("StudentManager");
let ProfessorManager = require("ProfessorManager");

let properties = {
    fund: new Resource({ name: "fund", value: 1000 }),
    studentManager: {
        students: [0, 0, 0, 0, 0],
    },
    initialData: {
        professorNumber: 5,
        professorTeachLevel: 0,
        professorAcademicLevel: 0,
        professorCareerLevel: 0,
    }
};

describe("ProfessorManager", function () {
    it("should recruit professor with money", function () {
        let professorManager = new ProfessorManager(properties);
        let cost = professorManager.getRecruitCost();
        let ret = professorManager.recruitProfessor();
        assert.strictEqual(ret, true);
        assert.strictEqual(professorManager.fund.value, 1000 - cost);
        assert.strictEqual(professorManager.number, 6);
        assert.strictEqual(professorManager.fund.getWeeklyModification("professor"), 
            ProfessorManager.PROF_COST * 6);
    });

    it("should upgrade professor level and get boosting result", function () {
        let professorManager = new ProfessorManager(properties);
        assert.strictEqual(professorManager.number, 5);
        assert.strictEqual(professorManager.teachLevel, 0);
        assert.strictEqual(professorManager.careerLevel, 0);
        assert.strictEqual(professorManager.researchLevel, 0);

        let ret = professorManager.upgradeLevel("teach");
        assert.strictEqual(ret, true);
        assert.strictEqual(professorManager.teachLevel, 1);

        ret = professorManager.upgradeLevel("career");
        ret = professorManager.upgradeLevel("career");
        ret = professorManager.upgradeLevel("career");
        assert.strictEqual(professorManager.careerLevel, 3);

        ret = professorManager.upgradeLevel("research");
        ret = professorManager.upgradeLevel("research");
        ret = professorManager.upgradeLevel("research");
        ret = professorManager.upgradeLevel("research");
        ret = professorManager.upgradeLevel("research");
        assert.strictEqual(ret, false);
        assert.strictEqual(professorManager.researchLevel, 4);

        let boost = professorManager.getEffect();
        assert.containsAllKeys(boost, [
            "teachIndexBoost", 
            "careerIndexBoost", 
            "researchIndexBoost"
        ]);
    });
});