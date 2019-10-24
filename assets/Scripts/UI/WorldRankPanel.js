// The script that controls the world rank panel

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        prefab: cc.Prefab,
        contentPanel: cc.Node,
        contentPool: [cc.Node],
    }),

    onLoad() {
        this.contentPanel.removeAllChildren();
        for (let i = 0; i < 500; ++i) {
            let node = cc.instantiate(this.prefab);
            node.active = false;
            this.contentPool.push(node);
            this.contentPanel.addChild(node);
        }
        this.updateInfo();
    },

    updateInfo() {
        this.game.worldRankManager.universities.forEach((univ, i) => {
            let node = this.contentPool[i];

            let labels = node.getComponentsInChildren(cc.Label);
            labels.forEach(label => {
                switch (label.node.name) {
                case "InfoLabel":
                    label.string = "#" + univ.rank + "\t" + univ.name;
                    break;
                case "TeachIndexLabel":
                    label.string = univ.teachIndex;
                    break;
                case "ResearchIndexLabel":
                    label.string = univ.researchIndex;
                    break;
                case "CareerIndexLabel":
                    label.string = univ.careerIndex;
                    break;
                }
            });

            node.active = true;
        }, this);
    }
});
