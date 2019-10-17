// A class to manage a specfic kind of resource (e.g. fund, influence, etc)

let Game = require("Game");

let Resource = cc.Class({
    extends: cc.Component,

    properties: () => ({
        resourceName: "",
        value: 0,
        modifiers: {
            default: [],
            type: [cc.Object],
        },
    }),

    updateResource(tick) {
        let that = this;
        let toBeRemoved = [];
        this.modifiers.forEach(modifier => {
            if (modifier.type === "once") {
                that.value += modifier.amount;
                toBeRemoved.push(modifier.name);
            } else if (modifier.type === "interval") {
                if (modifier.interval === "semester" && tick % Game.TICKS_SEMESTER === 0) {
                    that.value += modifier.amount;
                }
                if (modifier.interval === "week" && tick % Game.TICKS_WEEK === 0) {
                    that.value += modifier.amount;
                }
            }
        });
        toBeRemoved.forEach(name => { this.removeModifier(name); });
    },

    addModifier(modifier) {
        this.modifiers.push(modifier);
    },

    removeModifier(modifierName) {
        this.modifiers = this.modifiers.filter(modifier => (modifier.name !== modifierName));
    }
});

module.exports = Resource;