const regeneratorRuntime = require("regenerator-runtime/runtime");
const utilities = require("utilities");
const Globals = require("GlobalVariables");

let BuildingSpecifications = {
    dorm: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.3,
                cleaningSatisfaction: 0.3,
                studySatisfaction: 0.3,
                fundToCurrentTier: 5000,
                income: -10,
                description: "连非洲来的留学生都忍不住对住里面的学生深表同情。",
                effects: "休闲满意度：0.3\n清洁满意度：0.3\n学习满意度：0.3\n维护费：10万",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: Globals.TICKS_WEEK,
        },
        1: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.4,
                cleaningSatisfaction: 0.4,
                studySatisfaction: 0.4,
                fundToCurrentTier: 3000,
                income: -20,
                description: "两位白发苍苍的老人在楼下说：“嘿！这楼还和我们当年住的一模一样！”。",
                effects: "休闲满意度：0.4\n清洁满意度：0.4\n学习满意度：0.4\n维护费：20万",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.2 * Globals.TICKS_WEEK,
        },
        2: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 5000,
                income: -30,
                description: "这楼甚至有专门的自习室，方便学生每天爆肝赶DDL。",
                effects: "休闲满意度：0.5\n清洁满意度：0.5\n学习满意度：0.5\n维护费：30万",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.2 * Globals.TICKS_WEEK,
        },
        3: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.7,
                studySatisfaction: 0.5,
                fundToCurrentTier: 10000,
                income: -40,
                description: "据说上床下桌就已经能让某些学校的学生们恰柠檬了。",
                effects: "休闲满意度：0.6\n清洁满意度：0.7\n学习满意度：0.5\n维护费：40万",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.4 * Globals.TICKS_WEEK,
        },
        4: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.7,
                studySatisfaction: 0.7,
                fundToCurrentTier: 10000,
                income: -50,
                description: "这配置从各个方面都绝对不输世界一流大学的水准！",
                effects: "休闲满意度：0.6\n清洁满意度：0.7\n学习满意度：0.7\n维护费：50万",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 1.4 * Globals.TICKS_WEEK,
        },
        5: {
            defaultProperties: {
                capacity: 250,
                relaxationSatisfaction: 0.85,
                cleaningSatisfaction: 0.85,
                studySatisfaction: 0.8,
                fundToCurrentTier: 20000,
                income: -100,
                description: "震惊！美国人看了沉默！欧洲人看了流泪！竟然还有这种宿舍楼！",
                effects: "休闲满意度：0.85\n清洁满意度：0.85\n学习满意度：0.8\n维护费：100万",
                picturePath: "Pictures/dorm",
                iconPath: "Icons/dorm",
            },
            buildTime: 2 * Globals.TICKS_WEEK,
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
                income: -10,
                description: "虽然黑板、投影仪和桌椅都有不少问题，但是至少可以拿来上课。",
                effects: "休闲满意度：0.5\n清洁满意度：0.5\n学习满意度：0.5\n维护费：10万",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: Globals.TICKS_WEEK,
        },
        1: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 6000,
                income: -20,
                description: "要是有人在抖腿的话，整排桌子都会跟着一起晃。",
                effects: "休闲满意度：0.5\n清洁满意度：0.5\n学习满意度：0.5\n维护费：20万",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.2 * Globals.TICKS_WEEK,
        },
        2: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 7500,
                income: -30,
                description: "走廊里甚至有舒适的自习座位，尽管有人长期占座。",
                effects: "休闲满意度：0.5\n\n清洁满意度：0.5\n\n学习满意度：0.5",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.2 * Globals.TICKS_WEEK,
        },
        3: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.65,
                studySatisfaction: 0.7,
                fundToCurrentTier: 8000,
                income: -40,
                description: "教室和自习座位多到再也不需要占座了。",
                effects: "休闲满意度：0.6\n\n清洁满意度：0.65\n\n学习满意度：0.7",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.4 * Globals.TICKS_WEEK,
        },
        4: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.65,
                studySatisfaction: 0.7,
                fundToCurrentTier: 8000,
                income: -50,
                description: "啊！简直让人沉迷于学习无法自拔！",
                effects: "休闲满意度：0.6\n\n清洁满意度：0.65\n\n学习满意度：0.7",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 1.2 * Globals.TICKS_WEEK,
        },
        5: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.7,
                cleaningSatisfaction: 0.8,
                studySatisfaction: 0.85,
                fundToCurrentTier: 12000,
                income: -80,
                description: "在这栋楼里，学生过于热爱学习以致“凌晨三点灯火通明”的谣言，在网上一直流传着。",
                effects: "休闲满意度：0.7\n\n清洁满意度：0.8\n\n学习满意度：0.85",
                picturePath: "Pictures/teaching",
                iconPath: "Icons/teaching",
            },
            buildTime: 2 * Globals.TICKS_WEEK,
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
                income: 100,
                description: "虽然学校一直不承认，但似乎总有学生吃完之后会拉肚子。",
                effects: "休闲满意度：0.5\n\n清洁满意度：0.5",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: Globals.TICKS_WEEK,
        },
        1: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.6,
                fundToCurrentTier: 8000,
                income: 200,
                description: "至少达到了食品安全最低标准，而且不用站着吃饭。",
                effects: "休闲满意度：0.5\n\n清洁满意度：0.6",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 1.5 * Globals.TICKS_WEEK,
        },
        2: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.6,
                fundToCurrentTier: 6000,
                income: 300,
                description: "食品的营养和卫生程度连一个医学生都挑不出刺来。",
                effects: "休闲满意度：0.6\n\n清洁满意度：0.6",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 1.2 * Globals.TICKS_WEEK,
        },
        3: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.6,
                cleaningSatisfaction: 0.8,
                fundToCurrentTier: 8000,
                income: 400,
                description: "“XX稳定看X大，X大稳定看食堂！”",
                effects: "休闲满意度：0.6\n\n清洁满意度：0.8",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 1.5 * Globals.TICKS_WEEK,
        },
        4: {
            defaultProperties: {
                capacity: 120,
                relaxationSatisfaction: 0.8,
                cleaningSatisfaction: 0.8,
                fundToCurrentTier: 12000,
                income: 500,
                description: "据说这个食堂不仅能在X众点评上获得了五颗星，连米X林的评委都赞不绝口，差点打了三星。",
                effects: "休闲满意度：0.8\n\n清洁满意度：0.8",
                picturePath: "Pictures/cafeteria",
                iconPath: "Icons/cafeteria",
            },
            buildTime: 2 * Globals.TICKS_WEEK,
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
                researchTrainingProvided: 0.2,
                fundToCurrentTier: 7000,
                income: -80,
                description: "虽然啥仪器也买不起，但这是迈向研究型大学的第一步！",
                effects: "研究点数：0.2",
                picturePath: "Pictures/lab",
                iconPath: "Icons/lab",
            },
            buildTime: Globals.TICKS_WEEK,
        },
        1: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.7,
                cleaningSatisfaction: 0.8,
                researchTrainingProvided: 0.4,
                fundToCurrentTier: 27000,
                income: -160,
                description: "建设研究型大学。",
                effects: "研究点数：0.4",
                picturePath: "Pictures/lab",
                iconPath: "Icons/lab",
            },
            buildTime: 2 * Globals.TICKS_WEEK,
        },
        2: {
            defaultProperties: {
                capacity: 300,
                relaxationSatisfaction: 0.8,
                cleaningSatisfaction: 0.95,
                researchTrainingProvided: 0.8,
                fundToCurrentTier: 70000,
                income: -240,
                description: "国家重点实验室。",
                effects: "研究点数：0.8",
                picturePath: "Pictures/lab",
                iconPath: "Icons/lab",
            },
            buildTime: 4 * Globals.TICKS_WEEK,
        },
        nameGenerator: function* () {
            yield "理科一号楼";
            yield "理科二号楼";
            yield "社科研究所";
            yield "朗润园";
            yield "微电子大厦";
            let id = 3;
            while (true) {
                yield "理科" + utilities.numberToChinese(
                    id) + "号楼";
                yield "社科" + utilities.numberToChinese(
                    id) + "号楼";
                id++;
            }
        },
    },
    careerCenter: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                careerTrainingProvided: 0.2,
                fundToCurrentTier: 4000,
                income: -40,
                description: "车库上的创新创业中心。",
                effects: "",
                picturePath: "",
                iconPath: "",
            },
            buildTime: Globals.TICKS_WEEK,
        },
        1: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.7,
                cleaningSatisfaction: 0.8,
                careerTrainingProvided: 0.4,
                fundToCurrentTier: 14000,
                income: -80,
                description: "创新创业。",
                effects: "",
                picturePath: "",
                iconPath: "",
            },
            buildTime: 2 * Globals.TICKS_WEEK,
        },
        2: {
            defaultProperties: {
                capacity: 300,
                relaxationSatisfaction: 0.8,
                cleaningSatisfaction: 0.95,
                careerTrainingProvided: 0.8,
                fundToCurrentTier: 40000,
                income: -160,
                description: "百强企业的摇篮。",
                effects: "",
                picturePath: "",
                iconPath: "",
            },
            buildTime: 4 * Globals.TICKS_WEEK,
        },
        nameGenerator: function* () {
            let id = 1;
            while (true) {
                yield "双创中心" + utilities.numberToChinese(
                    id) + "号楼";
            }
        },
    }

};

module.exports = BuildingSpecifications;