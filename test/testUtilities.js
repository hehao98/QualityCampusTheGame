let assert = require("chai").assert;
let Utilities = require("utilities");
let Globals = require("GlobalVariables");

describe("Utilities", function() {
    it("should replace all occurrences in a string correctly", function() {
        let str = "aaacccaaa";
        assert.strictEqual(Utilities.replaceAll(str, "aaa", "bbb"), "bbbcccbbb");
    }), 

    it("should handle tick conversion correctly", function() {
        let tickProps = Utilities.getTickProperties(1600);
        assert.strictEqual(tickProps.year, 2024);
        assert.strictEqual(tickProps.semester, 12);
        assert.strictEqual(tickProps.week, 2);
        assert.strictEqual(tickProps.day, Globals.DAY.SAT);
        assert.strictEqual(tickProps.time, Globals.TIME.MORNING);     
    });

    it("should convert tick to string correctly", function() {
        let tickString = Utilities.getTickString(1600);
        assert.strictEqual(tickString, "2024学年第二学期第2周星期六 上午");
    });

    it("should generate random int numbers", function() {
        for (let i = 0; i < 1000; ++i) {
            let a = -100;
            let b = 100;
            let c = Utilities.randomInt(a, b);
            assert.isTrue(c <= 100 && c >= -100);
        }
    });

    it("should convert number to chinese", function() {
        assert.strictEqual(Utilities.numberToChinese(123), "一百二十三");
    });

    it("should convert number to Roman number", function() {
        assert.strictEqual(Utilities.numberToRoman(1), "I");
        assert.strictEqual(Utilities.numberToRoman(2), "II");
        assert.strictEqual(Utilities.numberToRoman(3), "III");
        assert.strictEqual(Utilities.numberToRoman(4), "IV");
        assert.strictEqual(Utilities.numberToRoman(5), "V");
        assert.strictEqual(Utilities.numberToRoman(83), "LXXXIII");
    });

    it("should convert number to percentage", function() {
        assert.strictEqual(Utilities.numberToRoman(0.1), "10.00%");
        assert.strictEqual(Utilities.numberToRoman(0.2), "20.00%");
        assert.strictEqual(Utilities.numberToRoman(0), "0.00%");
    });
});