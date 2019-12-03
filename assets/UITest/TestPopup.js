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
    },

    showTestDialogBox() {
        this.popupManager.showDialogBox(
            "AAA\n\nBBB\n\nCCC\n\nDDD\n\nEEE\n",
            [
                {
                    string: "好的",
                    callback: function() {
                        console.log("ok");
                    },
                    thisPointer: this,
                    destroyDialog: true,
                },
                {
                    string: "不好",
                    callback: function() {
                        console.log("cancel");
                    },
                    thisPointer: this,
                    destroyDialog: false,
                }
            ]
        );
    }
});
