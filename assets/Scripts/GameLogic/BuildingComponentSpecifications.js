let BuildingComponentSpecifications = {
    clean: {
        0: {
            defaultProperties: {
                cleaningSatisfaction: +0.10,
                fundToCurrentTier: 1500,
                description: "雇佣了负责的清洁工人。",
                picturePath: "",
                iconPath: "",
            },
        },
        1: {
            defaultProperties: {
                cleaningSatisfaction: +0.15,
                fundToCurrentTier: 2500,
                description: "雇佣了负责的清洁工人。",
                picturePath: "",
                iconPath: "",
            },
        },
        2: {
            defaultProperties: {
                cleaningSatisfaction: +0.20,
                fundToCurrentTier: 4000,
                description: "雇佣了负责的清洁工人。",
                picturePath: "",
                iconPath: "",
            },
        },
    },
    studyArea: {
        0: {
            defaultProperties: {
                studySatisfaction: +0.10,
                fundToCurrentTier: 2000,
                description: "自习区",
                picturePath: "",
                iconPath: "",
            },
        },
        1: {
            defaultProperties: {
                studySatisfaction: +0.15,
                fundToCurrentTier: 5000,
                description: "自习区",
                picturePath: "",
                iconPath: "",
            },
        },
        2: {
            defaultProperties: {
                studySatisfaction: +0.20,
                fundToCurrentTier: 8000,
                description: "自习区",
                picturePath: "",
                iconPath: "",
            },
        },
    },

    noRepair: {
        0: {
            defaultProperties: {
                fundToRemove: 800,
                name: "皇帝的新修理工",
                description: "该建筑内大量设施损坏而不见修理。",
                capacity: -0.3,
                picturePath: "",
                iconPath: "",
            }
        }
    },
    buildingAtNight: {
        0: {
            defaultProperties: {
                fundToRemove: 2000,
                name: "夜间施工",
                description: "该建筑附近有工地夜间施工，学生难以安眠。",
                relaxationSatisfaction: -0.3,
                picturePath: "",
                iconPath: "",
            }
        }
    },
    unstableWaterTemperature: {
        0: {
            defaultProperties: {
                fundToRemove: 1500,
                name: "薛定谔的水温",
                description: "浴室水温忽高忽低。小概率导致学生感冒/烧伤。",
                cleaningSatisfaction: -0.2,
                picturePath: "",
                iconPath: "",
            }
        }
    },
    dirtyFood: {
        0: {
            defaultProperties: {
                fundToRemove: 4000,
                name: "屡教不改",
                description: "该餐厅因食品安全问题被长期投诉，真诚道歉，永不悔改。",
                cleaningSatisfaction: -0.2,
                picturePath: "",
                iconPath: "",
            }
        }
    },
    highHCHO: {
        0: {
            defaultProperties: {
                fundToRemove: 800,
                name: "高效人肉除甲醛",
                description: "该建筑内甲醛超标。",
                cleaningSatisfaction: -0.2,
                picturePath: "",
                iconPath: "",
            }
        }
    },
    crowdedByDesign: {
        0: {
            defaultProperties: {
                fundToRemove: 1000,
                name: "摩肩接踵",
                description: "该建筑设计存在缺陷，导致实际容量下降。" +
                    "可能的原因有座椅拥挤，桌面狭小，桌面晃动严重；" +
                    "水房龙头紧贴，水花飞溅；排队空间狭小或与建筑安全出入口重叠。",
                capacity: -0.3,
                picturePath: "",
                iconPath: "",
            }
        }
    },
};

module.exports = BuildingComponentSpecifications;