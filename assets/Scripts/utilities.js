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
    /**
     *   数字转中文
     *   @param {Number} 形如123的数字
     *   @returns {String} 返回转换成的形如 一百二十三 的字符串     
     */
    units: '个十百千万@#%亿^&~',
    chars: '零一二三四五六七八九',
    numberToChinese: function (number) {
        var a = (number + '').split(''), s = [], t = this;
        if (a.length > 12) {
            throw new Error('too big');
        } else {
            for (var i = 0, j = a.length - 1; i <= j; i++) {
                if (j == 1 || j == 5 || j == 9) {
                    //两位数 处理特殊的 1*
                    if (i == 0) {
                        if (a[i] != '1') s.push(t.chars.charAt(a[i]));
                    } else {
                        s.push(t.chars.charAt(a[i]));
                    }
                } else {
                    s.push(t.chars.charAt(a[i]));
                }
                if (i != j) {
                    s.push(t.units.charAt(j - i));
                }
            }
        }
        //return s;
        return s.join('').replace(/零([十百千万亿@#%^&~])/g,
            function (m, d, b) {//优先处理 零百 零千 等
                b = t.units.indexOf(d);
                if (b != -1) {
                    if (d == '亿') return d;
                    if (d == '万') return d;
                    if (a[j - b] == '0') return '零'
                }
                return '';
            }).replace(/零+/g, '零').replace(/零([万亿])/g,
                function (m, b) {
                    // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
                    return b;
                }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(
                    /[@#%^&~]/g, function (m) {
                        return {
                            '@': '十', '#': '百', '%': '千', '^':
                                '十', '&': '百', '~': '千'
                        }[m];
                    }).replace(/([亿万])([一-九])/g,
                        function (m, d, b, c) {
                            c = t.units.indexOf(d);
                            if (c != -1) {
                                if (a[j - c] == '0') {
                                    return d + '零' + b
                                }
                            }
                            return m;
                        });
    }
};

module.exports = utilities;
