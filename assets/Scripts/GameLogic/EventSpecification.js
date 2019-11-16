// Contains Specifications for Events

let Globals = require("Globals");

let EventSpecifications = {
    studySatisfactionEvents: {
        minCoolTime: 50,
        maxCoolTime: 100,
        events: [
            {
                type: "low_satisfaction",
                name: "satisfaction",
                description: "",
                image: "",
                trigger: function(game) {},
                action: [
                    {
                        name: "",
                        type: "", // positive or negative
                        effectDescription: "",
                        consequence: function(game) {}
                    },
                    {
                        name: "",
                        type: "",
                        effectDescription: "",
                        consequence: function(game) {}
                    }
                ]
            }
        ]
    }
};

module.exports = EventSpecifications;
