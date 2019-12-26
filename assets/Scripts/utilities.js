/**
 * utilities defines global utility functions and properties
 */


let Globals = require("GlobalVariables");
let assert = require("assert");

let utilities = {
    // ES5 inherition
    inherits: function (Child, Parent) {
        let Trans = function () { };
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
     * Replace all occurrence in a string
     * @param {String} str 
     * @param {String} find 
     * @param {String} replace 
     */
    replaceAll: function(str, find, replace) {
        return str.replace(
            new RegExp(find.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), 
            replace
        );
    },

    /**
     * Given min and max, return a random integer in [min, max]
     * @param {Number} min 
     * @param {Number} max 
     */
    randomInt: function (min, max) {
        assert(Number.isInteger(min) && Number.isInteger(max));
        if (min > max) {
            let temp = min;
            min = max;
            max = temp;
        }
        return Math.round(Math.random() * (max - min) + min);
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
     *   author: http://www.bbsmax.com/A/D8544xxp5E/
     *   @param {Number} 形如123的数字
     *   @returns {String} 返回转换成的形如 一百二十三 的字符串     
     */
    units: "个十百千万@#%亿^&~",
    chars: "零一二三四五六七八九",
    numberToChinese: function (number) {
        let a = (number + "").split(""), s = [], t = this;
        let j = a.length - 1;
        if (a.length > 12) {
            throw new Error("too big");
        } else {
            for (let i = 0, j = a.length - 1; i <= j; i++) {
                if (j == 1 || j == 5 || j == 9) {
                    //两位数 处理特殊的 1*
                    if (i == 0) {
                        if (a[i] != "1") s.push(t.chars.charAt(a[i]));
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
        return s.join("").replace(/零([十百千万亿@#%^&~])/g,
            function (m, d, b) {//优先处理 零百 零千 等
                b = t.units.indexOf(d);
                if (b != -1) {
                    if (d == "亿") return d;
                    if (d == "万") return d;
                    if (a[j - b] == "0") return "零";
                }
                return "";
            }).replace(/零+/g, "零").replace(/零([万亿])/g,
            function (m, b) {
                // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
                return b;
            }).replace(/亿[万千百]/g, "亿").replace(/[零]$/, "").replace(
            /[@#%^&~]/g, function (m) {
                return {
                    "@": "十", "#": "百", "%": "千", "^":
                                "十", "&": "百", "~": "千"
                }[m];
            }).replace(/([亿万])([一-九])/g,
            function (m, d, b, c) {
                c = t.units.indexOf(d);
                if (c != -1) {
                    if (a[j - c] == "0") {
                        return d + "零" + b;
                    }
                }
                return m;
            });
    },

    /**
     *   数字转罗马数字
     *   author: https://www.cnblogs.com/alicell/p/9179246.html
     *   @param {Number} 形如123的数字
     *   @returns {String} 返回转换成的罗马数字的字符串     
     */
    numberToRoman: function (num) {
        let newArr = [];
        let newStr;
        //先把数字转化为相应的罗马字母
        while (num > 0) {
            if (num - 1000 >= 0) {
                newArr.push("M");
                num -= 1000;
            } else if (num - 500 >= 0) {
                newArr.push("D");
                num -= 500;
            } else if (num - 100 >= 0) {
                newArr.push("C");
                num -= 100;
            } else if (num - 50 >= 0) {
                newArr.push("L");
                num -= 50;
            } else if (num - 10 >= 0) {
                newArr.push("X");
                num -= 10;
            } else if (num - 5 >= 0) {
                newArr.push("V");
                num -= 5;
            } else if (num - 1 >= 0) {
                newArr.push("I");
                num -= 1;
            }
        }
        newStr = newArr.join("");
        //将4和9的情况进行替换
        newStr = newStr.replace(/VI{4}|LX{4}|DC{4}|I{4}|X{4}|C{4}/g, function (match) {
            switch (match) {
            case "VIIII":
                return "IX";
            case "LXXXX":
                return "XC";
            case "DCCCC":
                return "CM";
            case "IIII":
                return "IV";
            case "XXXX":
                return "XL";
            case "CCCC":
                return "CD";
            }
        });
        return newStr;
    },

    safeGet(obj, keys) {
        let cur = obj;
        for (let key of keys) {
            if (cur === undefined) { return undefined; }
            cur = cur[key];
        }
        return cur;
    },

    numberToPercentage(number, effectiveNumber) {
        if (effectiveNumber == undefined)
            effectiveNumber = 2;
        let percentageNumber = (number * 100).toFixed(effectiveNumber);
        let percent = percentageNumber + "%";
        return percent;
    },
};

module.exports = utilities;
