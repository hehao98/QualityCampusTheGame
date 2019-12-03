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
                description: "勉强能住人的宿舍楼。",
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
                description: "容量大一些宿舍楼。",
                effects: "高级",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.2 * Globals.TICKS_SEMESTER,
        },
        2: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 5000,
                description: "容量更大的宿舍楼。",
                effects: "高级",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.2 * Globals.TICKS_SEMESTER,
        },
        3: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.7,
                studySatisfaction: 0.5,
                fundToCurrentTier: 10000,
                description: "干净整洁的宿舍楼。",
                effects: "高级",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.4 * Globals.TICKS_SEMESTER,
        },
        4: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.7,
                studySatisfaction: 0.7,
                fundToCurrentTier: 10000,
                description: "甚至有地方自习。",
                effects: "高级",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.4 * Globals.TICKS_SEMESTER,
        },
        5: {
            defaultProperties: {
                capacity: 120,
                relaxationSatisfaction: 0.85,
                cleaningSatisfaction: 0.85,
                studySatisfaction: 0.8,
                fundToCurrentTier: 20000,
                description: "豪华宿舍楼。",
                effects: "高级",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 2 * Globals.TICKS_SEMESTER,
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
                description: "破破烂烂的教学楼。",
                effects: "低级",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: Globals.TICKS_SEMESTER,
        },
        1: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 6000,
                description: "破破烂烂的教学楼。",
                effects: "低级",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.2 * Globals.TICKS_SEMESTER,
        },
        2: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 7500,
                description: "破破烂烂的教学楼。",
                effects: "低级",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.2 * Globals.TICKS_SEMESTER,
        },
        3: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.65,
                studySatisfaction: 0.7,
                fundToCurrentTier: 8000,
                description: "干净整洁。",
                effects: "低级",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.4 * Globals.TICKS_SEMESTER,
        },
        4: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.65,
                studySatisfaction: 0.7,
                fundToCurrentTier: 8000,
                description: "干净整洁。",
                effects: "低级",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.2 * Globals.TICKS_SEMESTER,
        },
        5: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.7,
                cleaningSatisfaction: 0.8,
                studySatisfaction: 0.85,
                fundToCurrentTier: 12000,
                description: "学习圣地。",
                effects: "低级",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 2 * Globals.TICKS_SEMESTER,
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
        1: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.6,
                fundToCurrentTier: 8000,
                description: "吃了不再拉肚子。",
                effects: "低级",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 1.5 * Globals.TICKS_SEMESTER,
        },
        2: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.6,
                fundToCurrentTier: 6000,
                description: "不再站着吃饭。",
                effects: "低级",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 1.2 * Globals.TICKS_SEMESTER,
        },
        3: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.8,
                fundToCurrentTier: 8000,
                description: "干净卫生的食堂。",
                effects: "低级",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 1.5 * Globals.TICKS_SEMESTER,
        },
        4: {
            defaultProperties: {
                capacity: 120,
                relaxationSatisfaction: 0.8,
                cleaningSatisfaction: 0.8,
                fundToCurrentTier: 12000,
                description: "豪华餐厅。",
                effects: "低级",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 2 * Globals.TICKS_SEMESTER,
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
        },
        nameGenerator: function* () {
            let id = 1;
            while (true) {
                yield "第" + utilities.numberToChinese(
                    id++) + "实验室";
            }
        },
    }
};

module.exports = BuildingSpecifications;