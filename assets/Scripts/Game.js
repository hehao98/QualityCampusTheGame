// Core manager class.
// Serve as the entry point for managing all kinds of game logic

let Globals = require("GlobalVariables");
let createResource = require("Resource");
let createWorldRankManager = require("WorldRankManager");
let createBuildingManager = require("BuildingManager");
let createStudentManager = require("StudentManager");
let createScheduleManager = require("ScheduleManager");

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
        timeString: "",

        // Properties for game objective management
        gameObjectives: Object,
        currentObjective: 0,
        researchIndex: 0,
        teachIndex: 0,
        careerIndex: 0,
        studentSatisfaction: 0,
        professorSatisfaction: 0,

        // Classes that manages game logic
        fund: Object,
        influence: Object,
        buildingManager: Object,
        StudentManager: Object,
        scheduleManager: Object,
        worldRankManager: Object,

        // Classes that manages UI
        worldRankPanel: require("WorldRankPanel"),
        resourcePanel: require("ResourcePanel"),
        gameObjectivePanel: require("GameObjectivePanel"),
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad() { // Initialize all game objects from here
        // Initialize Resource System
        this.fund = createResource({ name: "fund" });
        this.influence = createResource({ name: "influence" });
        this.fund.value = this.initialData.json.startFund;
        this.initialData.json.fundModifiers.forEach((modifier) => {
            this.fund.addModifier(modifier);
        });
        this.influence.value = this.initialData.json.startInfluence;
        this.initialData.json.influenceModifiers.forEach((modifier) => {
            this.influence.addModifier(modifier);
        });

        this.gameObjectives = this.initialData.json.gameObjectives;

        this.worldRankManager = createWorldRankManager({
            game: this,
            universityData: this.universityData
        });

        this.buildingManager = createBuildingManager();
        this.StudentManager = createStudentManager();
        this.ScheduleManager = createScheduleManager();

        if (Globals.TEST_MODE) {
            let test = require("testBasic.js");
            test();
        }
    },

    start() {
        this.universityName = Globals.universityName;
        this.timeString = this.getTickString();

        this.worldRankManager.addPlayerUniversity(
            this.universityName,
            this.teachIndex,
            this.researchIndex,
            this.careerIndex
        );

        this.worldRankPanel.updateInfo();
        
        this.refreshUI();
    },

    update(dt) { // dt is in seconds
        // Manage time 
        if (!this.isPaused) {
            this.timeSinceLastUpdate += dt;
            if (this.timeSinceLastUpdate >= this.speedModifier) {
                this.currentTick++;
                this.timeSinceLastUpdate -= this.speedModifier;
                this.timeString = this.getTickString();

                // Update corresponding game logic
                this.fund.updateResource(this.currentTick);
                this.influence.updateResource(this.currentTick);

                if (this.currentTick % Globals.TICKS_WEEK === 0) {
                    this.worldRankManager.updateRanking();
                    this.worldRankPanel.updateInfo();
                }

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
                if (this.currentObjective < this.gameObjectives.length) {
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
                
                // Finally Update all UIs
                this.refreshUI();
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
    },

    // Given a tick, construct a string for display
    getTickString() {
        // 一个tick是一秒钟，一天5个tick，分别对应上午、中午、下午
        // 晚上、凌晨。一学期共20周，一年两个学期，这样一年的游戏时长就是大约20分钟
        let weekStr = ["一", "二", "三", "四", "五", "六", "日"];
        let dayTimeStr = ["上午", "中午", "下午", "晚上", "凌晨"];
        let semester = Math.floor(this.currentTick / Globals.TICKS_SEMESTER) + 1;
        let year = 2018 + Math.floor(semester / 2);
        let week = Math.floor(this.currentTick % Globals.TICKS_SEMESTER / Globals.TICKS_WEEK) + 1;
        let weekDay = Math.floor((this.currentTick % Globals.TICKS_WEEK) / Globals.TICKS_DAY);
        let day = dayTimeStr[this.currentTick % Globals.TICKS_DAY];
        return year + "学年第" + (semester % 2 ? "一" : "二") + "学期第" + week + "周星期" + weekStr[weekDay] + " " + day;
    },
});

module.exports = Game;
