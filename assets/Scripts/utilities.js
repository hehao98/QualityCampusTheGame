/**
 * utilities defines global utility functions and properties
 */


let Globals = require("GlobalVariables");
let assert = require("assert");

let utilities = {
    // ES5 inherition
    inherits: function (Child, Parent) {
        var Trans = function () { };
        Trans.prototype = Parent.prototype;
        Child.prototype = new Trans();
        Child.prototype.constructor = Child;
    },

    logLevels: {
        "debug": 5,
        "info": 10,
        "warning": 15,
        "error": 20,
        "fatal": 25,
    },
    logPermitted: function (level) {
        return this.logLevels[level] >=
            this.logLevels[Globals.LOG_LEVEL];
    },
    log: function (message, level = "info") {
        if (this.logPermitted(level)) {
            console.log(message);
        }
    },
    /**
     * Given a game tick, return all its related info in an object
     * Return object has the following fields
     *     year - start from 2018
     *     semester - the accumulated semester count, start from 1
     *     week - current week, range 1 - 20 as one semester have 20 weeks
     *     day - current weekday, range 0 to 6 (Mon to Sun)
     *     time - current time, range 0 - 4 (Morning, Noon, Afternoon, Evening, Night)
     * @param {Number} tick
     * @returns {Object} tick information object
     */
    getTickProperties: function (tick) {
        let tickInfo = {
            year: 0,
            semester: 0,
            week: 0,
            day: 0,
            time: 0
        };

        assert(Number.isInteger(tick) && tick >= 0);

        tickInfo.semester = Math.floor(tick / Globals.TICKS_SEMESTER) + 1;
        tickInfo.year = 2018 + Math.floor(tickInfo.semester / 2);
        tickInfo.week = Math.floor((tick % Globals.TICKS_SEMESTER) /
            Globals.TICKS_WEEK) + 1;
        tickInfo.day = Math.floor(
            (tick % Globals.TICKS_WEEK) / Globals.TICKS_DAY
        );
        tickInfo.time = tick % Globals.TICKS_DAY;

        return tickInfo;
    },

    /**
     * Given a tick, construct a string for display
     * @param {Number} tick
     * @returns {string} the string for display
     */
    getTickString: function (tick) {
        // 一个tick是一秒钟，一天5个tick，分别对应上午、中午、下午
        // 晚上、凌晨。一学期共20周，一年两个学期，这样一年的游戏时长就是大约20分钟
        let weekStr = ["一", "二", "三", "四", "五", "六", "日"];
        let dayTimeStr = ["上午", "中午", "下午", "晚上", "凌晨"];
        let props = this.getTickProperties(tick);
        return (
            props.year +
            "学年第" +
            (props.semester % 2 ? "一" : "二") +
            "学期第" +
            props.week +
            "周星期" +
            weekStr[props.day] +
            " " +
            dayTimeStr[props.time]
        );
    },
};

module.exports = utilities;
