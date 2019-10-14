// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const TICKS_SEMESTER = 20 * 7 * 5;
const TICKS_WEEK = 7 * 5;

cc.Class({
    extends: cc.Component,

    properties: {
        // Properties for time management
        currentTick: 0,
        speedModifier: 1,
        timeSinceLastUpdate: 0,
        isPaused: false,
        timeString: "",

        // Properties for resource management
        fund: 0,
        fundModifiers: {
            default: [],
            type: [cc.Object]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let that = this;
        cc.loader.loadRes('InitialData', function (err, jsonAsset) {
            jsonAsset.json.fundModifiers.forEach((modifier) => {
                that.addFundModifier(modifier);
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
                this.updateResource(this.currentTick);
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

    updateResource(tick) {
        let that = this;
        let toBeRemoved = [];
        this.fundModifiers.forEach(modifier => {
            if (modifier.type === "once") {
                that.fund += modifier.amount;
                toBeRemoved.push(modifier.name);
            } else if (modifier.type === "interval") {
                if (modifier.interval === "semester" && tick % TICKS_SEMESTER === 0) {
                    that.fund += modifier.amount;
                }
                if (modifier.interval === "week" && tick % TICKS_WEEK === 0) {
                    that.fund += modifier.amount;
                }
            }
        });
        toBeRemoved.forEach(name => { this.removeFundModifier(name) });
    },

    addFundModifier(modifier) {
        // Apply sanity checks
        console.assert(modifier.hasOwnProperty("name"));
        console.assert(modifier.hasOwnProperty("type"));
        console.assert(modifier.hasOwnProperty("amount"));

        this.fundModifiers.push(modifier);
    },

    removeFundModifier(modifierName) {
        this.fundModifiers = this.fundModifiers.filter(modifier => (modifier.name !== modifierName));
    }
});
