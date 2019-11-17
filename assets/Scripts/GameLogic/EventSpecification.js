// Contains Specifications for Events

let Globals = require("Globals");

let EventSpecifications = {
    studySatisfactionEvents: {
        minCoolTime: 100,
        maxCoolTime: 200,
        nextTriggerTick: 0,
        events: [
            {
                type: "low_satisfaction",
                name: "有人跳楼了！",
                description: "住在28号楼的同学们无不听到了一声巨响，有学生选择了结束他的生命！",
                image: "",
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("studySatisfaction") < 0.2;
                },
                action: [
                    {
                        name: "封锁全部消息",
                        description: "虽然学生可能不会对此非常满意，但是这样可以有效避免类似的事情再次发生",
                        consequence: function(game) {
                            EventSpecifications.studySatisfactionEvents.nextTriggerTick += 200;
                        }
                    },
                    {
                        name: "增加心理辅导资源",
                        description: "（消耗资金10万）可以暂时提升学生的满意度",
                        consequence: function(game) {
                            game.studentManager.students.forEach(s => {
                                s.indexes.studySatisfaction += 0.1;
                                if (s.index.studySatisfaction >= 1) {
                                    s.index.studySatisfaction = 1;
                                }
                            });
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = EventSpecifications;
