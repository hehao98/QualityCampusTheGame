// Core manager class.
// Serve as the entry point for managing all kinds of game logic

let assert = require("assert");
let Globals = require("GlobalVariables");
let utilities = require("utilities");
let Resource = require("Resource");
let WorldRankManager = require("WorldRankManager");
let BuildingManager = require("BuildingManager");
let StudentManager = require("StudentManager");
let ScheduleManager = require("ScheduleManager");

let Game = cc.Class({
    extends: cc.Component,

    properties: () => ({
        universityName: "",

        // External data
        initialData: cc.JsonAsset,
        universityData: cc.JsonAsset,

        // Properties for time management
        currentTick: 0,
        speedModifier: 1,
        timeSinceLastUpdate: 0,
        isPaused: false,

        // Properties for game objective management
        gameObjectives: Object,
        currentObjective: 0,
        researchIndex: 0,
        teachIndex: 0,
        careerIndex: 0,
        studentSatisfaction: 0,
        professorSatisfaction: 0,

        // Other Properties that will be read by event manager
        studyIndex: 0,
        relaxationSatisfaction: 0,
        studySatisfaction: 0,

        // Classes that manages game logic
        difficulty: Globals.DIFFICULTY_NORMAL,
        fund: Object,
        influence: Object,
        buildingManager: Object,
        StudentManager: Object,
        scheduleManager: Object,
        worldRankManager: Object,

        // Classes that manages UI
        worldRankPanel: require("WorldRankPanel"),
        resourcePanel: require("ResourcePanel"),
        gameObjectivePanel: require("GameObjectivePanel")
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    // Copy initial data to Globals
    // Must be done before the initilization of all game objects!
        Globals.initialData = this.initialData.json;

        // Initialize all game objects from here
        // Initialize Resource System
        this.fund = new Resource({ name: "fund" });
        this.influence = new Resource({ name: "influence" });
        this.fund.value = this.initialData.json.startFund;
        this.initialData.json.fundModifiers.forEach(modifier => {
            this.fund.addModifier(modifier);
        });
        this.influence.value = this.initialData.json.startInfluence;
        this.initialData.json.influenceModifiers.forEach(modifier => {
            this.influence.addModifier(modifier);
        });

        this.gameObjectives = this.initialData.json.gameObjectives;

        this.worldRankManager = new WorldRankManager({
            game: this,
            universityData: this.universityData
        });

        this.buildingManager = new BuildingManager();

        this.scheduleManager = new ScheduleManager({
            buildingManager: this.buildingManager
        });
        this.studentManager = new StudentManager({
            scheduleManager: this.scheduleManager,
            buildingManager: this.buildingManager
        });

        if (utilities.logPermitted("info")) {
            this.buildingManager.debugPrint();
            this.studentManager.debugPrint();
        }

        if (Globals.TEST_MODE) {
            let test = require("testBasic.js");
            test();
        }
    },

    start() {
        this.universityName = Globals.universityName;

        // Init game logic
        this.worldRankManager.addPlayerUniversity(
            this.universityName,
            this.teachIndex,
            this.researchIndex,
            this.careerIndex
        );

        this.buildingManager.init({
            difficulty: this.difficulty,
            fund: this.fund,
            influence: this.influence
        });

        this.studentManager.init(this.difficulty);

        // Init UI
        this.worldRankPanel.updateInfo();

        this.refreshUI();
    },

    update(dt) {
    // dt is in seconds
    // Manage time
        if (!this.isPaused) {
            this.timeSinceLastUpdate += dt;
            if (this.timeSinceLastUpdate >= this.speedModifier) {
                this.timeSinceLastUpdate -= this.speedModifier;

                // Update corresponding game logic
                this.fund.updateResource(this.currentTick);
                this.influence.updateResource(this.currentTick);

                utilities.log(this.currentTick);
                this.studentManager.update(this.currentTick);
                this.buildingManager.update(this.currentTick);
                this.studentManager.updateSatisfaction();
                this.studentManager.debugPrint();
                this.buildingManager.debugPrint();

                this.studyIndex = this.studentManager.getOverallIndex("studyIndex");
                this.studySatisfaction = this.studentManager.getOverallIndex(
                    "studySatisfaction"
                );
                this.relaxationSatisfaction = this.studentManager.getOverallIndex(
                    "relaxationSatisfaction"
                );

                if (this.currentTick % Globals.TICKS_WEEK === 0) {
                    this.worldRankManager.updateRanking();
                    this.worldRankPanel.updateInfo();
                }

                this.updateGameObjective();

                this.timeString = utilities.getTickString(this.currentTick);
                this.currentTick++;

                // Finally Update all UIs
                this.refreshUI();
            }
        }
    },

    updateGameObjective() {
        // Just for testing game objectives
        if (Globals.TEST_MODE) {
            this.teachIndex += 10;
            this.researchIndex += 10;
            this.careerIndex += 10;
            this.studentSatisfaction = (this.studentSatisfaction + 1) % 100;
            this.professorSatisfaction = (this.professorSatisfaction + 1) % 100;
        }

        // After all game logic HAVE been updated
        // see whether we can update our game objectives
        if (this.currentObjective + 1 < this.gameObjectives.length) {
            let nextObjective = this.gameObjectives[this.currentObjective];
            let flag = true;
            Object.keys(nextObjective.thresholds).forEach(key => {
                if (this[key] < nextObjective.thresholds[key]) {
                    flag = false;
                }
            }, this);
            if (flag) {
                this.currentObjective++;
            }
        }
    },

    refreshUI() {
        this.resourcePanel.updatePanel();
        this.gameObjectivePanel.updatePanel();
    },

    // callback for buttons that control time elapse
    setSpeedModifier(event, newValue) {
        if (newValue === "pause") {
            this.isPaused = true;
        } else {
            this.isPaused = false;
            this.speedModifier = Number.parseFloat(newValue);
        }
    }
});

module.exports = Game;
