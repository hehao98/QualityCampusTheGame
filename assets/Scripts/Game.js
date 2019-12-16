// Core manager class.
// Serve as the entry point for managing all kinds of game logic

let Globals = require("GlobalVariables");
let utilities = require("utilities");
let Resource = require("Resource");
let WorldRankManager = require("WorldRankManager");
let BuildingManager = require("BuildingManager");
let StudentManager = require("StudentManager");
let ProfessorManager = require("ProfessorManager");
let ScheduleManager = require("ScheduleManager");
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
        professorNumber: 0,
        worldRankFlagTriggers: [],
        worldRankFlags: [],

        // Classes that manages game logic
        difficulty: Globals.DIFFICULTY_NORMAL,
        fund: Object,
        buildingManager: Object,
        studentManager: Object,
        scheduleManager: Object,
        professorManager: Object,
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
        studentPanel: require("StudentPanel"),
        professorPanel: require("ProfessorPanel"),
        resourceDetailPanel: require("ResourceDetailPanel"),
        popupManager: require("PopupManager"),
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // Set game reference in window
        // so that it can be accessed in Chrome console for debugging
        Globals.game = window.game = this;

        // Copy initial data to Globals
        // Must be done before the initilization of all game objects!
        Globals.initialData = this.initialData.json;

        // Initialize all game objects from here
        // Initialize Resource System
        Globals.tick = this.currentTick;
        this.fund = new Resource({ name: "fund" });
        this.fund.value = this.initialData.json.startFund;
        this.initialData.json.fundModifiers.forEach(modifier => {
            this.fund.addModifier(modifier);
        });

        this.gameObjectives = this.initialData.json.gameObjectives;
        this.worldRankFlagTriggers = [400, 300, 200, 100, 50, 30, 10, 1];
        this.worldRankFlags = [false, false, false, false, false, false, false, false];

        this.worldRankManager = new WorldRankManager({
            game: this,
            universityData: this.universityData
        });

        Globals.buildingManager = this.buildingManager =
            new BuildingManager();
        Globals.scheduleManager = this.scheduleManager =
            new ScheduleManager();
        Globals.studentManager = this.studentManager =
            new StudentManager();
        Globals.AdmissionManager = this.admissionManager =
            new AdmissionManager();

        this.professorManager = new ProfessorManager({
            fund: this.fund,
            studentManager: this.studentManager,
            initialData: this.initialData.json,
        });

        this.pkuHoleManager = new PkuHoleManager({ game: this });
        this.eventManager = new EventManager({ game: this });

        // * university level modifiers
        Globals.universityLevelModifiers = {
            careerTrainingProvided: 0,
            researchTrainingProvided: 0,
        };
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

        // Show an welcome dialog
        this.isPaused = true;
        this.popupManager.showDialogBox(
            utilities.replaceAll(this.initialData.json.welcomeMessage,
                "{univname}", this.universityName),
            [
                {
                    string: "开始！",
                    callback: function () {
                        this.isPaused = false;
                    },
                    thisPointer: this,
                    destroyDialog: true,
                },
                {
                    string: "查看详细教程",
                    callback: function () {
                        window.open("https://hehao98.github.io/posts/2019/12/quality-campus-tutorial/");
                    },
                    thisPointer: this,
                    destroyDialog: false,
                }
            ]
        );

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

                if (this.fund.value < 0) {
                    this.gameOver();
                }
            }
        }
    },

    updateGameSystem() {
        // Update corresponding game logic
        this.fund.updateResource(this.currentTick);

        this.studentManager.update(this.currentTick);
        this.buildingManager.update(this.currentTick);
        this.studentManager.updateSatisfaction();
        this.studentManager.debugPrint();
        this.buildingManager.debugPrint();
        // this.buildingManager.debugPrint();

        this.teachIndex = this.studentManager.getOverallIndex("studyIndex");
        this.careerIndex = this.studentManager.getOverallIndex("careerIndex");
        this.researchIndex = this.studentManager.getOverallIndex("researchIndex");
        let studySatisfaction = this.studentManager.getOverallIndex(
            "studySatisfaction"
        );
        let relaxationSatisfaction = this.studentManager.getOverallIndex(
            "relaxationSatisfaction"
        );
        this.studentSatisfaction = (relaxationSatisfaction + studySatisfaction) / 2;
        this.professorNumber = this.professorManager.number;

        this.pkuHoleManager.update(this.currentTick);
        this.eventManager.update(this.currentTick);
        if (this.currentTick % Globals.TICKS_WEEK === 0) {
            this.worldRankManager.updateRanking();
            // If the player have achieved a new ranking, popup
            this.worldRankFlagTriggers.forEach((targetRank, idx) => {
                let ranking = this.worldRankManager.getCurrentRanking(this.universityName);
                if (ranking < targetRank && this.worldRankFlags[idx] === false) {
                    this.popupManager.showPopup("恭喜" + this.universityName
                        + "进入世界前"
                        + targetRank
                        + "名"
                    );
                    this.worldRankFlags[idx] = true;
                }
            }, false);
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
                this.isPaused = true;
                this.popupManager.showDialogBox(
                    utilities.replaceAll(this.gameObjectives[this.currentObjective].achieveMessage,
                        "{univname}", this.universityName),
                    [
                        {
                            string: "好的！",
                            callback: function () {
                                this.isPaused = false;
                            },
                            thisPointer: this,
                            destroyDialog: true,
                        },
                        {
                            string: "再接再厉",
                            callback: function () {
                                this.isPaused = false;
                            },
                            thisPointer: this,
                            destroyDialog: false,
                        }
                    ]
                );

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
            if (this.studentPanel) this.studentPanel.updatePanel();
            if (this.professorPanel) this.professorPanel.updatePanel();
            if (this.resourceDetailPanel) this.resourceDetailPanel.updatePanel();
            if (this.currentTick % Globals.TICKS_WEEK === 0) {
                if (this.worldRankPanel) this.worldRankPanel.updateInfo();
            }
        } else {
            this.resourcePanel.updatePanel();
            this.gameObjectivePanel.updatePanel();
            this.pkuHolePanel.updatePanel();
            this.buildingPage.updateBuildingListInfo();
            this.eventPanel.updatePanel();
            this.studentPanel.updatePanel();
            this.professorPanel.updatePanel();
            this.resourceDetailPanel.updatePanel();
            if (this.currentTick % Globals.TICKS_WEEK === 0) {
                this.worldRankPanel.updateInfo();
            }
        }
    },

    gameOver() {
        this.isPaused = true;
        this.popupManager.showDialogBox( 
            utilities.replaceAll(this.initialData.json.gameOverMessage, "{univname}", this.universityName), 
            [
                {
                    string: "回到主菜单",
                    callback: function () {
                        cc.director.loadScene("MainMenu");
                    },
                    thisPointer: this,
                    destroyDialog: true,
                },
                {
                    string: "辣鸡游戏！不玩了！",
                    callback: function () {
                        window.close();
                    },
                    thisPointer: this,
                    destroyDialog: true,
                }
            ]
        );
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
