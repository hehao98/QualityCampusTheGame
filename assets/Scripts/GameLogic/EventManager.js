// Class EventManager
// For each game tick, it iteratively checks whether the condition of 
// some events are met, and generate these events

let EventSpecification = require("EventSpecification");

class EventManager {
    /**
     * @param {Game} properties.game
     * @param {BuildingManager} properties.buildingManager
     * @param {StudentManager} properties.studentManager
     */
    constructor(properties) {
        this.game = properties.game;
        this.buildingManager = properties.buildingManager;
        this.studentManager = properties.studentManager;
        this.holePosts = [];
        this.bbsTopics = [];
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