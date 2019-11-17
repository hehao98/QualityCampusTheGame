// Module that declares all PkuHole events

let Globals = require("GlobalVariables");

let PkuHoleSpecifications = {
    studySatisfaction: {
        minCoolTick: 20,
        maxCoolTick: 40,
        nextTriggerTick: 0,
        events: [
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("studySatisfaction") < 0.33;
                },
                candidates: [
                    "啊实在是太难了学不进去了",
                    "我想退学",
                    "摸鱼一时爽，考后火葬场",
                    "这学校是什么垃圾，课程设置不合理",
                    "整天学习学习，学个屁"
                ]
            },
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("studySatisfaction") <= 0.66
                        && game.studentManager.getOverallIndex("studySatisfaction") >= 0.33;
                },
                candidates: [
                    "我要学习，不能再刷手机了",
                    "迷茫，不知道自己能不能适应这个专业",
                    "高数期中60，我还真没见过像我这么菜的",
                    "学不会写代码，哭了",
                    "有没有人告诉我怎么入门机器学习呀"
                ]
            },
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("studySatisfaction") > 0.66;
                },
                candidates: [
                    "今天又是认真学习的一天呢",
                    "X院的XXX不要再卖弱了行不行，大家都知道您很聚了",
                    "我今天读了3000页英文文献，好开心呀",
                    "心に残っているのは勉強だけ",
                    "身边的人都这么热爱学习，焦虑"
                ]
            }
        ]
    },
    studyIndex: {
        minCoolTick: 20,
        maxCoolTick: 40,
        nextTriggerTick: 0,
        events: [
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("studyIndex") < 0.33;
                },
                candidates: [
                    "又挂科了，好难受啊",
                    "高数期中只有20分，我还是去跳楼算了",
                    "我要怎么办才能死掉呢，好想死啊",
                    "担心毕业找不到工作",
                    "申请季全聚德就是我"
                ]
            },
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("studyIndex") <= 0.66
                        && game.studentManager.getOverallIndex("studyIndex") >= 0.33;
                },
                candidates: [
                    "有谁听说过学长学姐毕业996之后咋样了嘛",
                    "好不容易憋出一篇论文，祈祷能中SCI",
                    "最近不太想学习，可也不想一直混下去呀",
                    "求问要怎么找实习呀",
                    "如果要留学，要不要找留学机构"
                ]
            },
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("studyIndex") > 0.66;
                },
                candidates: [
                    "又中了一篇文章，太棒了",
                    "绩点成等差数列每学期递增，开心",
                    "大佬们是不是都绩点3.9呀",
                    "校强我弱，自闭了",
                    "高数期中人均90....",
                ]
            }
        ]
    },
    relaxationSatisfaction: {
        minCoolTick: 20,
        maxCoolTick: 40,
        nextTriggerTick: 0,
        events: [
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("relaxationSatisfaction") < 0.33;
                },
                candidates: [
                    "感觉自己睡也睡不好，吃也吃不好，要秃了",
                    "根本不想吃食堂",
                    "贵校不愧是贵校，东西也太贵了",
                    "最近精神状态一直很差，感觉自己要抑郁了",
                    "头疼"
                ]
            },
            {
                trigger: function(game) {
                    return game.studentManager.getOverallIndex("relaxationSatisfaction") > 0.66;
                },
                candidates: [
                    "吹爆我们的食堂",
                    "开心",
                ]
            }
        ]
    }
};

module.exports = PkuHoleSpecifications;
