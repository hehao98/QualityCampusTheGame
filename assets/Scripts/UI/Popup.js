cc.Class({
    extends: cc.Component,

    properties: {
        beginPosition: cc.Vec2,
        endPosition: cc.Vec2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.position = this.beginPosition;
    },

    start () {
        let action = cc.moveTo(1, this.endPosition.x, this.endPosition.y);
        action.easing(cc.easeIn(3.0));
        this.node.runAction(action);
        this.scheduleOnce(function() {
            this.node.destroyAllChildren();
            this.node.destroy();
        }, 4);
    },

    closePopup() {
        this.node.destroyAllChildren();
        this.node.destroy();
    }
});
