let BuildingSpecifications = {
    dorm: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 5000,
                description: "",
                picturePath: "",
                iconPath: "",
            },
        },
        1: {
            defaultProperties: {
                capacity: 150,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                studySatisfaction: 0.5,
                fundToCurrentTier: 3000,
                description: "",
                picturePath: "",
                iconPath: "",

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
                fundToCurrentTier: 5000,
                description: "",
                picturePath: "",
                iconPath: "",

            },
        },
    },
    cafeteria: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                fundToCurrentTier: 5000,
                description: "",
                picturePath: "",
                iconPath: "",

            },
        },
    },
    lab: {
        0: {
            defaultProperties: {
                capacity: 100,
                relaxationSatisfaction: 0.5,
                cleaningSatisfaction: 0.5,
                researchIndex: 0.2,
                description: "",
                picturePath: "",
                iconPath: "",

            },
        }
    }
};

module.exports = BuildingSpecifications;