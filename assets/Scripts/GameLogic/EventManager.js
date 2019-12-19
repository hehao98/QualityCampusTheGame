// Class EventManager
// For each game tick, it iteratively checks whether the condition of 
// some events are met, and generate these events

let _ = require("lodash");
let EventSpecification = require("EventSpecification");
let Utilities = require("utilities");

class EventManager {
    /**
     * @param {Game} properties.game
     */
    constructor(properties) {
        this.game = properties.game;
        this.specs = EventSpecification;
        this.maximumEvents = 5;
        this.nextEventId = 0;
        this.currentEvents = [];
        this.currentEventTypes = new Set();
        this.eventStartCallback = function() {};
        this.eventEndCallback = function() {};
        // constructor left-overs
    }
}

/**
 * This function should be called in Game.js start() function
 */
EventManager.prototype.init = function() {
    for (let type in this.specs) {
        let event = this.specs[type];
        event.nextTriggerTick = Utilities.randomInt(event.minCoolTick, event.maxCoolTick);
    }
};

/**
 * This function should be called in the Game.js update() function
 * @param {Number} tick current game tick
 */
EventManager.prototype.update = function(tick) {
    // Find whether we can trigger some events
    for (let type in this.specs) {
        let spec = this.specs[type];

        if (this.currentEvents.length >= this.maximumEvents) {
            continue;
        }
        if (tick < spec.nextTriggerTick) {
            continue;
        }
        if (this.currentEventTypes.has(type)) {
            continue;
        }
        
        // This event should be triggered now
        for (let event of spec.events) {
            if (event.trigger(this.game)) {
                let thisEvent = _.cloneDeep(event);
                this.eventStartCallback();
                thisEvent.timeoutTick = tick + thisEvent.timeout;
                thisEvent.id = this.nextEventId++;
                thisEvent.type = type;
                this.currentEvents.unshift(thisEvent);
                this.currentEventTypes.add(type);
            }
        }

        spec.nextTriggerTick = tick + Utilities.randomInt(spec.minCoolTick, spec.maxCoolTick);
    }

    // For existing events, count it toward timeoutTick, 
    // automatically resolve it if time out
    this.currentEvents.forEach((event, eventId) => {
        if (tick >= event.timeoutTick) {
            this.resolveEvent(eventId, event.defaultActionId);
        }
    }, this);
};

/**
 * TODO: integrate this with real button call backs
 */
EventManager.prototype.buttonCallback = function(eventId, actionId) {
    this.resolveEvent(eventId, actionId);
};

/**
 * resolve the event either automatically or by user choice
 * @param {Number} eventId array index in this.currentEvents
 * @param {Number} actionId array index in event.action
 */
EventManager.prototype.resolveEvent = function(eventId, actionId) {
    let index = this.currentEvents.findIndex(e => e.id === eventId);
    if (index === -1) return;
    this.currentEvents[index].action[actionId].consequence(this.game);
    this.currentEventTypes.delete(this.currentEvents[index].type);
    this.currentEvents = this.currentEvents.filter(e => e.id !== eventId);
    this.eventEndCallback();
};

module.exports = EventManager;