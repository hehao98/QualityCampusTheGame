// Contains Specifications for Events

let Globals = require("GlobalVariables");

let EventSpecifications = {
    studySatisfactionEvents: {
        minCoolTick: 100,
        maxCoolTick: 500,
        nextTriggerTick: 0,
        events: [
            {
                name: "有同学患上了严重抑郁症！",
                description: "因各方面条件太差，有学生患上了严重抑郁症",
                timeout: 100,
                timeoutTick: 0,
                defaultActionId: 0,
                trigger: function (game) {
                    return game.studentManager.getOverallIndex("studySatisfaction") < 0.5;
                },
                action: [
                    {
                        name: "封锁全部消息",
                        description: "虽然学生可能不会对此非常满意，但是这样可以有效减少悲观情绪蔓延",
                        prerequisite: null,
                        consequence: function (game) {
                            EventSpecifications.studySatisfactionEvents.nextTriggerTick += 200;
                        }
                    },
                    {
                        name: "增加心理辅导资源",
                        description: "（消耗资金10万）可以暂时提升学生的满意度",
                        prerequisite: function (game) {
                            return game.fund.value >= 10;
                        },
                        consequence: function (game) {
                            game.fund.use(10);
                            //game.studentManager.students.forEach(s => {
                            //    s.indexes.studySatisfaction += 0.1;
                            //    if (s.index.studySatisfaction >= 1) {
                            //        s.index.studySatisfaction = 1;
                            //    }
                            //});
                        }
                    }
                ]
            },
            {
                name: "特奖答辩又搞出了大新闻！",
                description: "在上次的特奖答辩中，XX系的X同学说TA在国外交换期间，每周能读3000篇论文，" +
                    "写出32篇论文，取得了全科4.0的好成绩。可是，似乎网友对此并不买账，他们在X乎和X博上宣称这位同学是量子波动速读带师，并借此抹黑学校！我们该怎么办？",
                timeout: 100,
                timeoutTick: 0,
                defaultActionId: 0,
                trigger: function (game) {
                    return game.studentManager.getOverallIndex("studySatisfaction") > 0.9;
                },
                action: [
                    {
                        name: "置之不理",
                        description: "网民的记忆和金鱼差不多，不用管他们（会对我们的学术声誉产生影响）",
                        prerequisite: null,
                        consequence: function (game) { }
                    },
                    {
                        name: "花钱撤下热搜",
                        description: "（消耗资金100万）避免此事件进一步造成负面影响",
                        prerequisite: function (game) {
                            return game.fund.value >= 100;
                        },
                        consequence: function (game) {
                            game.fund.use(100);
                        }
                    },
                ]
            },
        ]
    },
    otherEvents: {
        minCoolTick: 100,
        maxCoolTick: 500,
        nextTriggerTick: 0,
        events: [
            {
                name: "震惊！某博导竟然脚踩n条船！",
                description: "最近，在X博上的控诉显示，我们学校的某位博导竟然打着自己情商低找不到女朋友的幌子，" +
                    "同时与多名女性交往，甚至与学生也有不当行为。我们该怎么办？",
                timeout: 100,
                timeoutTick: 0,
                defaultActionId: 0,
                trigger: function (game) {
                    return game.professorManager.number >= 10;
                },
                action: [
                    {
                        name: "将其开除",
                        description: "（教师数-1）决不能姑息这样的行为",
                        prerequisite: null,
                        consequence: function (game) {
                            game.professorManager.number--;
                        }
                    },
                    {
                        name: "花钱撤下热搜",
                        description: "（消耗资金100万）避免此事件进一步造成负面影响",
                        prerequisite: function (game) {
                            return game.fund.value >= 100;
                        },
                        consequence: function (game) {
                            game.fund.use(100);
                        }
                    },
                ]
            }
        ]
    }
};

module.exports = EventSpecifications;
