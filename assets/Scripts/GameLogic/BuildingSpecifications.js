const regeneratorRuntime = require("regenerator-runtime/runtime");
const utilities = require("utilities");
const Globals = require("GlobalVariables");

let BuildingSpecifications = {
    dorm: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 5000,
                description: "这是低级的宿舍楼",
                effects: "低级",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: Globals.TICKS_SEMESTER,
        },
        1: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 3000,
                description: "这是高级的宿舍楼",
                effects: "高级",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: Globals.TICKS_SEMESTER,
        },
        nameGenerator: function* () {
            let id = 28;
            while (true) {
                yield utilities.numberToChinese(
                    id++) + "号楼";
            }
        },


    },
    teaching: {
        0: {
            defaultProperties: {
                capacity: 50,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 5000,
                description: "这是低级的教学楼",
                effects: "低级",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: Globals.TICKS_SEMESTER,
        },
        nameGenerator: function* () {
            yield "理科教学楼";
            yield "文史楼";
            let id = 1;
            while (true) {
                yield "第" + utilities.numberToChinese(
                    id++) + "教学楼";
            }
        },
    },
    cafeteria: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                fundToCurrentTier: 5000,
                description: "这是低级的食堂",
                effects: "低级",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: Globals.TICKS_SEMESTER,
        },
        nameGenerator: function* () {
            yield "勺园食堂";
            yield "燕南食堂";
            let id = 1;
            while (true) {
                yield "学" + utilities.numberToChinese(
                    id++) + "食堂";
            }
        },
    },
    lab: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                researchIndex: 0.2,
                fundToCurrentTier: 7000,
                description: "这是低级的实验室",
                effects: "低级",
                picturePath: "Pictures/lab",
                iconPath: "Icons/lab",
            },
            buildTime: Globals.TICKS_SEMESTER,
        }
    }
};

module.exports = BuildingSpecifications;