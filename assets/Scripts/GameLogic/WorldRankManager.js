// The class that manages the rankings of all in-game universities.

let assert = require("assert");

const UNIV_TOTAL = 500;

class WorldRankManager {
    constructor(properties) {
        this.game = properties.game;
        this.playerRanking = 0;
        this.universities = [];

        properties.universityData.json
            .filter((x, i) => i < UNIV_TOTAL)
            .forEach((univ, i) => {
                if (univ.name === this.game.universityName) return;
                this.universities.push({
                    name: univ.name,
                    rank: i,
                    teachIndex: (1 / UNIV_TOTAL) * (UNIV_TOTAL - i),
                    researchIndex: (1 / UNIV_TOTAL) * (UNIV_TOTAL - i),
                    careerIndex: (1 / UNIV_TOTAL) * (UNIV_TOTAL - i),
                });
            });

        this.updateRanking();
    }
}

// should only be called in Game.js
WorldRankManager.prototype.addPlayerUniversity = function(
    name,
    teachIndex,
    researchIndex,
    careerIndex
) {
    assert(name === this.game.universityName);

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
    let playerIndex = this.universities.findIndex(
        univ => univ.name == this.game.universityName
    );
    if (playerIndex != -1) {
        this.universities[playerIndex].teachIndex = this.game.teachIndex;
        this.universities[playerIndex].researchIndex = this.game.researchIndex;
        this.universities[playerIndex].careerIndex = this.game.careerIndex;
    }

    this.universities.forEach(univ => {
        if (univ.name === this.game.universityName) {
            return;
        }
        let fluctuation =
            (univ.teachIndex + univ.careerIndex + univ.researchIndex) * 0.03;
        univ.teachIndex += (Math.random() - 0.5) * fluctuation;
        univ.researchIndex += (Math.random() - 0.5) * fluctuation;
        univ.careerIndex += (Math.random() - 0.5) * fluctuation;
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

    this.playerRanking = this.getCurrentRanking(this.game.universityName);
};

WorldRankManager.prototype.getNeighborUniversities = function(univName, size) {
    let idx = this.universities.findIndex(univ => univ.name === univName);

    assert(idx !== -1);

    let afterSize = Math.min(
        this.universities.length - idx - 1,
        Math.floor(size / 2)
    );
    let beforeSize = Math.min(idx, size - afterSize - 1);
    while (afterSize + beforeSize + 1 < size) {
        if (afterSize + 1 < this.universities.length) {
            afterSize++;
        } else if (beforeSize > 0) {
            beforeSize--;
        }
    }

    let result = [];
    for (let i = idx - beforeSize; i <= idx + afterSize; ++i) {
        result.push(i);
    }
    return result;
};

WorldRankManager.prototype.getCurrentRanking = function(univName) {
    let results = this.universities.filter(univ => univ.name === univName);
    if (results.length === 0) return -1;
    return results[0].rank;
};

WorldRankManager.prototype.getPlayerRanking = function() {
    return this.playerRanking;
};

WorldRankManager.prototype.getUniversity = function(univName) {
    return this.universities.filter(univ => univ.name === univName)[0];
};

WorldRankManager.prototype.getUniversityCount = function() {
    return this.universities.length;
};

module.exports = WorldRankManager;
