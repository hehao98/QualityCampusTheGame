// The class that manages the rankings of all in-game universities.

function WorldRankManager(properties) {
    this.game = properties.game;
    this.universities = [];

    properties.universityData.json
        .filter((x, i) => i < 500)
        .forEach((univ, i) => {
            if (univ.name === this.game.universityName) return;
            this.universities.push({
                name: univ.name,
                rank: i,
                teachIndex: Math.floor(20000 / (i + 1)),
                researchIndex: Math.floor(20000 / (i + 1)),
                careerIndex: Math.floor(20000 / (i + 1))
            });
        });

    this.updateRanking();
}

// should only be called in Game.js
WorldRankManager.prototype.addPlayerUniversity = function(
    name,
    teachIndex,
    researchIndex,
    careerIndex
) {
    let index = this.universities.findIndex(univ => univ.name === name);
    if (index !== -1) {
        this.universities[index].teachIndex = teachIndex;
        this.universities[index].researchIndex = researchIndex;
        this.universities[index].careerIndex = careerIndex;
    } else {
        this.universities[this.universities.length - 1] = {
            name: name,
            rank: -1,
            teachIndex: teachIndex,
            researchIndex: researchIndex,
            careerIndex: careerIndex
        };
    }
    this.updateRanking();
};

WorldRankManager.prototype.updateRanking = function() {
    this.universities.forEach(univ => {
        if (univ.name === this.game.universityName) {
            return;
        }
        let fluctuation =
            (univ.teachIndex + univ.careerIndex + univ.researchIndex) * 0.03;
        univ.teachIndex += Math.floor((Math.random() - 0.5) * fluctuation);
        univ.researchIndex += Math.floor((Math.random() - 0.5) * fluctuation);
        univ.careerIndex += Math.floor((Math.random() - 0.5) * fluctuation);
    });
    this.universities.sort((a, b) => {
        return (
            b.teachIndex +
            b.researchIndex +
            b.careerIndex -
            a.researchIndex -
            a.teachIndex -
            a.careerIndex
        );
    });
    this.universities.forEach((univ, i) => {
        univ.rank = i + 1;
    });
};

WorldRankManager.prototype.getCurrentRanking = function(univName) {
    return this.universities.filter(univ => univ.name === univName)[0].rank;
};

WorldRankManager.prototype.getUniversityCount = function() {
    return this.universities.length;
};

function createWorldRankManager(properties) {
    return new WorldRankManager(properties);
}

module.exports = createWorldRankManager;