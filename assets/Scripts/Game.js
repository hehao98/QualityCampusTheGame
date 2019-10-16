// Core manager class.
// Serve as the entry point for managing all kinds of game logic

export const TICKS_SEMESTER = 20 * 7 * 5;
export const TICKS_WEEK = 7 * 5;

let Game = cc.Class({
    extends: cc.Component,

    properties: () => ({
        // Properties for time management
        currentTick: 0,
        speedModifier: 1,
        timeSinceLastUpdate: 0,
        isPaused: false,
        timeString: "",

        // resources
        fund: require("Resource"),
        influence: require("Resource"),

        buildingManager: require("BuildingManager"),
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad () { // Initialize all game objects from here
        let that = this;
        cc.loader.loadRes('InitialData', function (err, jsonAsset) {
            jsonAsset.json.fundModifiers.forEach((modifier) => {
                that.fund.addModifier(modifier);
                that.fund.updateResource(0);
            });
            jsonAsset.json.influenceModifiers.forEach((modifier) => {
                that.influence.addModifier(modifier);
                that.influence.updateResource(0);
            });
        });
    },

    start () {
        this.timeString = this.getTickString();
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
        let semester = Math.floor(this.currentTick / (20 * 7 * 5)) + 1;
        let week = Math.floor(this.currentTick % (20 * 7 * 5) / 35) + 1;
        let weekDay = Math.floor((this.currentTick % (7 * 5)) / 5);
        let day = dayTimeStr[this.currentTick % 5];
        return semester + "学期第" + week + "周星期" + weekStr[weekDay] + " " + day;
    },
});

module.exports = Game;
