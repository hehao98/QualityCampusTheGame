// The script that controls the world rank panel

cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        prefab: cc.Prefab,
        contentPanel: cc.Node,
        contentPoolSize: 6,
        contentPool: [cc.Node],
        highlightSprite: cc.SpriteFrame,
        normalSprite: cc.SpriteFrame,
    }),

    start() {
        this.contentPanel.removeAllChildren();
        for (let i = 0; i < this.contentPoolSize; ++i) {
            let node = cc.instantiate(this.prefab);
            node.active = false;
            this.contentPool.push(node);
            this.contentPanel.addChild(node);
        }
    },

    updateInfo() {
        this.game.worldRankManager
            .getNeighborUniversities(
                this.game.universityName,
                this.contentPoolSize
            )
            .forEach((univ, i) => {
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

                if (univ.name === this.game.universityName) {
                    node.getComponent(cc.Sprite).spriteFrame = this.highlightSprite;
                } else {
                    node.getComponent(cc.Sprite).spriteFrame = this.normalSprite;
                }

                node.active = true;
            }, this);
    }
});
