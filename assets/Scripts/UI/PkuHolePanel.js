cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        prefab: cc.Prefab,
        contentPoolSize: 30,
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

        let that = this;
        this.game.pkuHoleManager.updateUICallback = function () {
            that.contentPool.forEach(node => node.active = false);
            that.game.pkuHoleManager.posts.forEach((post, idx) => {
                that.contentPool[idx].active = true;
                let labels = that.contentPool[idx].getComponentsInChildren(cc.Label);
                labels.forEach(label => {
                    switch (label.node.name) {
                    case "PkuHoleNumber":
                        label.string = "#" + post.id;
                        break;
                    case "PkuHoleContent":
                        label.string = post.content;
                        break;
                    case "PkuHoleTime":
                        label.string = post.date;
                        break;
                    }
                });
            }, that);
        };
    },

    updatePanel() {
        
    }
});
