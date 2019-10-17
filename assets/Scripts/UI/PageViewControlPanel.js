cc.Class({
    extends: cc.Component,

    properties: {
        buttonBgs: [cc.Node],
        chosenColor: cc.Color,
        notChosenColor: cc.Color,
        pageView: cc.PageView,
    },

    start () {
        this.updateButtonColor(this.pageView.getCurrentPageIndex());
    },

    handlePageViewChange (event) {
        let idx = event.getCurrentPageIndex();
        this.updateButtonColor(idx);
    },

    updateButtonColor (idx) {
        for (let i = 0; i < this.buttonBgs.length; ++i) {
            this.buttonBgs[i].color = this.notChosenColor;
        }
        this.buttonBgs[idx].color = this.chosenColor;
    }
});
