
let PkuHoleSpecifications = require("PkuHoleSpecifications");
let Utilities = require("utilities");

class PkuHoleManager {
    /**
     * Constructor
     * @param {Game} properties.game the Game object in Game.js
     */
    constructor(properties) {
        this.game = properties.game;

        this.specifications = PkuHoleSpecifications;
        this.posts = []; // ordered from most recent to old
        this.postPoolSize = 30;
        this.nextPostID = 0;
        this.updateUICallback = function() {};
        // constructor left-overs
    }
}

/**
 * This function should be called in Game.js start() function
 */
PkuHoleManager.prototype.init = function() {
    for (let type in this.specifications) {
        let event = this.specifications[type];
        event.nextTriggerTick = Utilities.randomInt(event.minCoolTick, event.maxCoolTick);
    }
};

/**
 * This function should be called in the Game.js update() function
 * @param {Number} tick current game tick
 */
PkuHoleManager.prototype.update = function(tick) {
    for (let type in this.specifications) {
        let spec = this.specifications[type];

        if (tick < spec.nextTriggerTick) {
            continue;
        }
        
        // This event should be triggered now
        for (let event of spec.events) {
            if (event.trigger(this.game)) {
                let contentId = Utilities.randomInt(0, event.candidates.length - 1);
                this.addPost(event.candidates[contentId], tick);
            }
        }

        spec.nextTriggerTick = tick + Utilities.randomInt(spec.minCoolTick, spec.maxCoolTick);
    }
};

/**
 * Add post to the list, may remove existing post if exceeds post pool size
 * @param {String} content content in this post
 * @param {Number} tick post time in ticks
 */
PkuHoleManager.prototype.addPost = function(content, tick) {
    let newPost = {
        id: this.nextPostID++,
        date: Utilities.getTickString(tick),
        content: content
    };
    if (this.posts.length === this.postPoolSize) {
        this.posts.pop();
    }
    this.posts.unshift(newPost);
    this.updateUICallback();
};

module.exports = PkuHoleManager;