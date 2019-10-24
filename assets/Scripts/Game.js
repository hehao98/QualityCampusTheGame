// Core manager class.
// Serve as the entry point for managing all kinds of game logic

let Globals = require("Globals");
let createBuildingManager = require("BuildingManager");

let Game = cc.Class({
    extends: cc.Component,

    properties: () => ({
        universityName: "",

        // Initial Data

        // Properties for time management
        currentTick: 0,
        speedModifier: 1,
        timeSinceLastUpdate: 0,
        isPaused: false,
        timeString: "",

        // Properties for game objective management
        researchIndex: 0,
        teachIndex: 0,
        careerIndex: 0,
        studentSatisfication: 0,
        professorSatisfication: 0,

        // Classes that manages game logic
        fund: require("Resource"),
        influence: require("Resource"),
        buildingManager: Object,
        worldRankManager: require("WorldRankManager"),
        worldRankPanel: require("WorldRankPanel")
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad () { // Initialize all game objects from here
        let that = this;
        cc.loader.loadRes("InitialData", function (err, jsonAsset) {
            that.fund.value = jsonAsset.json.startFund;
            jsonAsset.json.fundModifiers.forEach((modifier) => {
                that.fund.addModifier(modifier);
            });
            that.influence.value = jsonAsset.json.startInfluence;
            jsonAsset.json.influenceModifiers.forEach((modifier) => {
                that.influence.addModifier(modifier);
            });
        });

        let buildingManager = createBuildingManager();
        // console.log(buildingManager);
        // console.log(require("lodash").sum([1,3,4]));

    },

    start () {
        this.universityName = Globals.universityName;
        this.timeString = this.getTickString();

        this.worldRankManager.addPlayerUniversity(
            this.universityName, 
            this.teachIndex, 
            this.researchIndex, 
            this.careerIndex
        );

        this.worldRankPanel.updateInfo();
    },

    update (dt) { // dt is in seconds
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
