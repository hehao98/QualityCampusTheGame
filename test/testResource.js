let assert = require("chai").assert;
let Resource = require("Resource");
let Globals = require("GlobalVariables");

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
