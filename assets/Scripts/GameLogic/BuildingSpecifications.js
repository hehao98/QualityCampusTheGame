let BuildingSpecifications = {
    dorm: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 50 * 10000000,
            },
        },
        1: {
            defaultProperties: {
                capacity: 200,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
            },
        },
    },
    teaching: {
        0: {
            defaultProperties: {
                capacity: 50,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 50 * 10000000,
            },
        },
    },
    cafeteria: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                fundToCurrentTier: 50 * 10000000,
            },
        },
    }
};

module.exports = BuildingSpecifications;