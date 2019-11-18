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
let BuildingSpecifications = require("BuildingSpecifications");
let AdmissionManager = require("AdmissionManager");
let PkuHoleManager = require("PkuHoleManager");
let EventManager = require("EventManager");
const regeneratorRuntime = require("regenerator-runtime/runtime");
window.regeneratorRuntime = regeneratorRuntime;


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
        studentManager: Object,
        scheduleManager: Object,
        worldRankManager: Object,
        pkuHoleManager: Object,
        eventManager: Object,

        // Classes that manages UI
        worldRankPanel: require("WorldRankPanel"),
        resourcePanel: require("ResourcePanel"),
        gameObjectivePanel: require("GameObjectivePanel"),
        buildingPage: require("BuildingPage"),
        pkuHolePanel: require("PkuHolePanel"),
        eventPanel: require("EventPanel"),
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // Set game reference in window
        // so that it can be accessed in Chrome console for debugging
        window.game = this;

        // Copy initial data to Globals
        // Must be done before the initilization of all game objects!
        Globals.initialData = this.initialData.json;

        // Initialize all game objects from here
        // Initialize Resource System
        // TODO ES6
        Globals.tick = this.currentTick;
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
        Globals.studentManager = this.studentManager =
            new StudentManager({
                scheduleManager: this.scheduleManager,
                buildingManager: this.buildingManager,
            });
        Globals.AdmissionManager = this.admissionManager =
            new AdmissionManager({});

        this.pkuHoleManager = new PkuHoleManager({ game: this });
        this.eventManager = new EventManager({ game: this });

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

        this.admissionManager.setTarget(
            Globals.initialData.initialStudentNumber);
        this.admissionManager.admit();
        this.pkuHoleManager.init();
        this.eventManager.init();
    },

    start() {
        // Init UI
        this.refreshUI();

        if (utilities.logPermitted("info")) {
            this.buildingManager.debugPrint();
            this.studentManager.debugPrint();
        }

        //if (Globals.TEST_MODE) {
        //    let test = require("testBasic.js");
        //    test();
        //}
    },

    update(dt) {
    // dt is in seconds
    // Manage time
        if (!this.isPaused) {
            this.timeSinceLastUpdate += dt;
            if (this.timeSinceLastUpdate >= this.speedModifier) {
                this.timeSinceLastUpdate -= this.speedModifier;

                utilities.log(this.currentTick);

                this.updateGameSystem();

                this.updateGameObjective();

                this.timeString = utilities.getTickString(this.currentTick);
                Globals.tick = ++this.currentTick;

                // Finally Update all UIs
                this.refreshUI();
            }
        }
    },

    updateGameSystem() {
        // Update corresponding game logic
        this.fund.updateResource(this.currentTick);
        this.influence.updateResource(this.currentTick);
            
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
        // Overall satisfaction is the average value of all detailed satisfactions
        this.studentSatisfaction = (this.relaxationSatisfaction + this.studySatisfaction) / 2;
        this.pkuHoleManager.update(this.currentTick);
        this.eventManager.update(this.currentTick);
        if (this.currentTick % Globals.TICKS_WEEK === 0) {
            this.worldRankManager.updateRanking();
        }
    },

    updateGameObjective() {
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
        if (Globals.TEST_MODE) {
            // In test mode, some of the UI parts might not exist
            if (this.resourcePanel) this.resourcePanel.updatePanel();
            if (this.gameObjectivePanel) this.gameObjectivePanel.updatePanel();
            if (this.pkuHolePanel) this.pkuHolePanel.updatePanel();
            if (this.eventPanel) this.eventPanel.updatePanel();
            if (this.currentTick % Globals.TICKS_WEEK === 0) {
                if (this.worldRankPanel) this.worldRankPanel.updateInfo();
            }
        } else {
            this.resourcePanel.updatePanel();
            this.gameObjectivePanel.updatePanel();
            this.pkuHolePanel.updatePanel();
            this.buildingPage.updateBuildingListInfo();
            this.eventPanel.updatePanel();
            if (this.currentTick % Globals.TICKS_WEEK === 0) {
                this.worldRankPanel.updateInfo();
            }
        }
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
