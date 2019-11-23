cc.Class({
    extends: cc.Component,

    properties: () => ({
        popupManager: require("PopupManager")
    }),

    // LIFE-CYCLE CALLBACKS:

    showTestPopup() {
        this.popupManager.showPopup("This is a popup message");
    },

    showTestMessageBox() {
        this.popupManager.showMessageBox(
            "Some message info",
            () => {
                console.log("OK!");
            },
            () => {
                console.log("Cancel!");
            },
            this
        );
    }
});
