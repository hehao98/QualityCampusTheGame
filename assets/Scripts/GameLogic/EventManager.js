// Class EventManager
// For each game tick, it iteratively checks whether the condition of 
// some events are met, and generate these events

let EventSpecification = require("EventSpecification");

class EventManager {
    /**
     * @param {Game} properties.game
     */
    constructor(properties) {
        this.game = properties.game;
        // constructor left-overs
    }
}

EventManager.prototype.init = function() {
    
};

EventManager.prototype.update = function() {

};

EventManager.prototype.getStudentOverallSatisfaction = function() {

};

EventManager.prototype.getStudentCanteenSatisfaction = function() {

};

EventManager.prototype.getStudentStudySatisfaction = function() {

};

module.exports = EventManager;