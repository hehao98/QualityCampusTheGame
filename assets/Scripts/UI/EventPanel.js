cc.Class({
    extends: cc.Component,

    properties: () => ({
        game: require("Game"),
        popupManager: require("PopupManager"),
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

        let that = this;
        this.game.eventManager.eventStartCallback = function() {
            that.popupManager.showPopup("发生了突发事件！");
        };
        this.game.eventManager.eventEndCallback = function() {
            that.popupManager.showPopup("突发事件被解决了！");
        };
    },

    updatePanel() {
        let that = this;
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
            let buttons = this.contentPool[idx].getComponentsInChildren(cc.Button);
            buttons.forEach(button => {
                switch (button.node.name) {
                case "Button1":
                    button.interactable = false;
                    if (event.action[0].prerequisite === null) {
                        button.interactable = true;
                    }
                    else if (event.action[0].prerequisite(this.game)) {
                        button.interactable = true;
                    }
                    button.node.on(cc.Node.EventType.TOUCH_END, function () {
                        that.game.eventManager.resolveEvent(event.id, 0);
                    });
                    break;
                case "Button2":
                    button.interactable = false;
                    if (event.action[1].prerequisite === null) {
                        button.interactable = true;
                    }
                    else if (event.action[1].prerequisite(this.game)) {
                        button.interactable = true;
                    }
                    button.node.on(cc.Node.EventType.TOUCH_END, function () {
                        that.game.eventManager.resolveEvent(event.id, 1);
                    });
                    break;
                }
            });
            let progressBar = this.contentPool[idx].getComponentInChildren(cc.ProgressBar);
            progressBar.progress = (event.timeoutTick - this.game.currentTick) / event.timeout;
        }, this);
        
    }
});
