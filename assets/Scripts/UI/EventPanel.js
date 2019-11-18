cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        prefab: cc.Prefab,
        contentPoolSize: 5,
        contentPool: [cc.Node],
        contentPanel: cc.Node
    }),

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.contentPanel.removeAllChildren();
        for (let i = 0; i < this.contentPoolSize; ++i) {
            let node = cc.instantiate(this.prefab);
            node.active = false;
            this.contentPool.push(node);
            this.contentPanel.addChild(node);
        }
    },

    updatePanel() {
        this.contentPool.forEach(node => node.active = false);
        this.game.eventManager.currentEvents.forEach((event, idx) => {
            this.contentPool[idx].active = true;
            let labels = this.contentPool[idx].getComponentsInChildren(cc.Label);
            labels.forEach(label => {
                switch (label.node.name) {
                case "Title":
                    label.string = event.name;
                    break;
                case "Content":
                    label.string = event.description;
                    break;
                case "ChoiceLabel1":
                    label.string = event.action[0].name;
                    break;
                case "EffectLabel1":
                    label.string = event.action[0].description;
                    break;
                case "ChoiceLabel2":
                    label.string = event.action[1].name;
                    break;
                case "EffectLabel2":
                    label.string = event.action[1].description;
                    break;
                }
            });
        }, this);
    }
});
