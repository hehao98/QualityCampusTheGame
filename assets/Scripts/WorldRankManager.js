// The class that manages the rankings of all in-game universities.

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        universities: [cc.Object],
        playerUniversityName: "",
    }),

    onLoad () {
        let that = this;
        cc.loader.loadRes("CollegesGlobal", function(err, jsonAsset) {
            jsonAsset.json.forEach(univ => {
                that.universities.push({
                    name: univ.name,
                    rank: Number.parseInt(univ.rank),
                    teachIndex: 0,
                    researchIndex: 0,
                    careerIndex: 0
                });
            });
            that.initRankingData();
        });
    },

    start () {},

    initRankingData() {
        this.universities.forEach((univ, index) => {
            univ.teachIndex = Math.floor(20000 / univ.rank);
            univ.researchIndex = Math.floor(20000 / univ.rank);
            univ.careerIndex = Math.floor(20000 / univ.rank);
            this.universities[index] = univ;
        });
    },

    // should only be called in Game.js
    addPlayerUniversity(name, teachIndex, researchIndex, careerIndex) {
        let index = this.universities.findIndex(univ => univ.name === name);
        if (index !== -1) {
            this.universities[index].teachIndex = teachIndex;
            this.universities[index].researchIndex = researchIndex;
            this.universities[index].careerIndex = careerIndex;
        } else {
            this.universities.push({
                name: name,
                rank: -1,
                teachIndex: teachIndex,
                researchIndex: researchIndex,
                careerIndex: careerIndex
            });
        }
        this.updateRanking();
    },

    updateRanking() {
        this.universities.sort((a, b) => {
            return b.teachIndex + b.researchIndex + b.careerIndex 
                - a.researchIndex - a.teachIndex - a.careerIndex;
        });
        this.universities.forEach((univ, i) => {
            this.universities[i].rank = i + 1;
        });
        console.log(this);
    },

    getCurrentRanking(univName) {
        return this.universities.filter(univ => univ.name === univName)[0].rank;
    },

    getUniversityCount() {
        return this.universities.length;
    }
});
