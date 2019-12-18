let assert = require("chai").assert;
let EventManager = require("EventManager");

describe("EventManager", function() {
    let game = {
        studentManager: {
            getOverallIndex: function(str) { return 0.1; }
        },
        professorManager: {
            number: 5,
        }
    };

    it("should init correctly", function() {
        let eventManager = new EventManager({ game: game });
        eventManager.init();
        assert.isTrue(eventManager.specs.studySatisfactionEvents.nextTriggerTick > 0);
        
    });

    it("should trigger events and resolve events if timeout", function() {
        let eventManager = new EventManager({ game: game });
        eventManager.init();
        eventManager.update(eventManager.specs.studySatisfactionEvents.maxCoolTick + 1);
        assert.strictEqual(eventManager.currentEvents.length, 1);
        assert.strictEqual(eventManager.currentEventTypes.size, 1);
        eventManager.update(eventManager.specs.studySatisfactionEvents.maxCoolTick + 1 + 10000);
        assert.strictEqual(eventManager.currentEvents.length, 0);
        assert.strictEqual(eventManager.currentEventTypes.size, 0);
    });

    it("should trigger events and resolve events if chosen by player", function() {
        let eventManager = new EventManager({ game: game });
        eventManager.init();
        eventManager.update(eventManager.specs.studySatisfactionEvents.maxCoolTick + 1);
        assert.strictEqual(eventManager.currentEvents.length, 1);
        assert.strictEqual(eventManager.currentEventTypes.size, 1);
        eventManager.resolveEvent(0, 0);
        assert.strictEqual(eventManager.currentEvents.length, 0);
        assert.strictEqual(eventManager.currentEventTypes.size, 0);
    });
});