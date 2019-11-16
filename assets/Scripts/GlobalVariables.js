// The file that declares and stores all globals 

module.exports = {
    // globals that will be set in the main menu scene
    // and will be loaded when initializing the game scene
    universityName: "中关村文理学院",

    // Constants related to game logic
    TICKS_SEMESTER: 20 * 7 * 5,
    TICKS_WEEK: 7 * 5,
    TICKS_DAY: 5,
    DAY: {
        MON: 0,
        TUE: 1,
        WED: 2,
        THU: 3,
        FRI: 4,
        SAT: 5,
        SUN: 6,
    },
    TIME: {
        MORNING: 0,
        NOON: 1,
        AFTERNOON: 2,
        EVENING: 3,
        NIGHT: 4
    },

    DIFFICULTY_NORMAL: "normal",

    // Globals that declares UI design colors
    // FONT_COLOR1: new cc.Color(206, 207, 211),
    // FONT_COLOR2: new cc.Color(30, 35, 51),
    // EDGE_COLOR: new cc.Color(51, 56, 76),
    // BG_COLOR1: new cc.Color(18, 24, 40),
    // BG_COLOR2: new cc.Color(31, 36, 53),
    // BG_COLOR3: new cc.Color(93, 101, 124),
    // BG_COLOR4: new cc.Color(40, 45, 64),
    // MAIN_COLOR: new cc.Color(133, 223, 186),
    // MAIN_COLOR_DISABLED: new cc.Color(72, 111, 106),
    // INFO_COLOR: new cc.Color(125, 186, 222),
    // INPUT_BACkGROUND: new cc.Color(110, 117, 137),

    // set to true to enable Test Mode. default: [false]
    TEST_MODE: false,

    LOG_LEVEL: "info",

    MORNING: 0,
    NOON: 1,
    AFTERNOON: 2,
    EVENING: 3,
    NIGHT: 4,

    UI: {
        buildingListPageView: null,
    }
};