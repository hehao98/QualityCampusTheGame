// Module that declares all PkuHole events

let Globals = require("GlobalVariables");

let PkuHoleSpecifications = {
    studySatisfactionPosts: {
        minCoolTick: 50,
        maxCoolTick: 100,
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
    }
};

module.exports = PkuHoleSpecifications;
