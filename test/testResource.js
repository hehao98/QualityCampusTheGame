let assert = require("chai").assert;
let Resource = require("Resource");
let Globals = require("GlobalVariables");

describe("Resource", function() {
    it("should be created given name and value properties", function() {
        let resource = new Resource({ name: "test", value: 10 });
        assert.strictEqual(resource.name, "test");
        assert.strictEqual(resource.value, 10);
        resource.use(5);
        assert.strictEqual(resource.value, 5);
        assert.strictEqual(resource.totalSpent, 5);
    });

    it("should update resource with modifiers", function() {
        let resource = new Resource({ name: "test", value: 10 });
        let id = resource.addModifier({
            type: "building",
            amount: 10,
        });

        assert.strictEqual(resource.modifiers.length, 1);
        resource.updateResource(Globals.TICKS_WEEK * 5);  
        assert.strictEqual(resource.value, 20);
        resource.removeModifier(id);   
        assert.strictEqual(resource.modifiers.length, 0);
        resource.updateResource(Globals.TICKS_WEEK * 6);
        assert.strictEqual(resource.value, 20); 
        
        assert.strictEqual(resource.totalSpent, 0);
        assert.strictEqual(resource.totalEarned, 10);
    });

    it("should sum different modifiers correctly", function() {
        let resource = new Resource({ name: "test", value: 10 });
        let id = resource.addModifier({
            type: "building",
            amount: 10,
        });
        let id2 = resource.addModifier({
            type: "student",
            amount: 20,
        });
        let id3 = resource.addModifier({
            type: "professor",
            amount: -15,
        });

        assert.strictEqual(resource.getWeeklyModification(), 15); 
        assert.strictEqual(resource.getWeeklyModification("building"), 10); 
        assert.strictEqual(resource.getWeeklyGain("student"), 20); 
        assert.strictEqual(resource.getWeeklyCost("professor"), -15); 

        resource.setModifierAmount(id2, 100);
        assert.strictEqual(100, resource.getWeeklyGain("student"));
    });
});
