
cc.Class({
    extends: cc.Component,

    properties: () => ({
        startX: 0,
        width: 0,
        maskWidth: 0,
    }),

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.startX = this.node.x;
        this.width = this.node.width;
    },

    update (dt) {
        let speed = 1;
        this.node.x += speed * dt * 100;
        if (this.node.x >= this.startX + this.node.width - this.maskWidth) {
            this.node.x = this.startX;
        }
    },
});
