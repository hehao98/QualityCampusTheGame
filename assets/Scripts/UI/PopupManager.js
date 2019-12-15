
cc.Class({
    extends: cc.Component,

    properties: {
        popupPrefab: cc.Prefab,
        messageBoxPrefab: cc.Prefab,
        dialogBoxPrefab: cc.Prefab,
    },

    /**
     * Display some info to remind player
     * @param {String} message the message to be displayed
     */
    showPopup(message) {
        let popup = cc.instantiate(this.popupPrefab);
        popup.parent = this.node;
        let label = popup.getComponentInChildren(cc.Label);
        label.string = message;
    },

    /**
     * Show a message box to the player to ask for decision
     * @param {String} message the message to be displayed on the message box
     * @param {Function} okCallback the function to call when OK button is pressed
     * @param {Function} cancelCallback the function to call when cancel button is pressed
     * @param {Object} thisPointer specify this in the callbacks
     */
    showMessageBox(message, okCallback, cancelCallback, thisPointer) {
        let messageBox = cc.instantiate(this.messageBoxPrefab);
        messageBox.parent = this.node;

        let label = messageBox.getComponentInChildren(cc.Label);
        label.string = message;

        let buttons = messageBox.getComponentsInChildren(cc.Button);
        buttons.forEach(button => {
            switch (button.node.name) {
            case "OkButton":
                button.node.on("click", okCallback, thisPointer);
                button.node.on("click", function() {
                    messageBox.destroyAllChildren();
                    messageBox.destroy();
                });
                break;
            case "CancelButton":
                button.node.on("click", cancelCallback, thisPointer);
                button.node.on("click", function() {
                    messageBox.destroyAllChildren();
                    messageBox.destroy();
                });
                break;
            }
        });
    },

    /**
     * Show a dialog box which is larger than message box
     * Can contain much more information, and you can configure the two buttons for any use
     * @param {String} message the message to be displayed
     * @param {Array} buttonConfig an array of two objects that specify button behavior
     *         must be length of two because we only have two buttons
     * @param {String} buttonConfig.string string to be displayed on button
     * @param {Function} buttonConfig.callback button callback
     * @param {Object} buttonConfig.thisPointer specify this in the callbacks
     * @param {Boolean} buttonConfig.destroyDialog if true, clicking this button will destroy this dialog
     */
    showDialogBox(message, buttonConfig) {
        let dialogBox = cc.instantiate(this.dialogBoxPrefab);
        dialogBox.parent = this.node;

        let label = dialogBox.getComponentInChildren(cc.Label);
        label.string = message;

        let buttons = dialogBox.getComponentsInChildren(cc.Button);
        buttons.forEach(button => {
            switch (button.node.name) {
            case "OkButton":
                button.getComponentInChildren(cc.Label).string = buttonConfig[0].string;
                button.node.on("click", buttonConfig[0].callback, buttonConfig[0].thisPointer);
                if (buttonConfig[0].destroyDialog) {
                    button.node.on("click", function() {
                        dialogBox.destroyAllChildren();
                        dialogBox.destroy();
                    });
                }
                break;
            case "CancelButton":
                button.getComponentInChildren(cc.Label).string = buttonConfig[1].string;
                button.node.on("click", buttonConfig[1].callback, buttonConfig[1].thisPointer);
                if (buttonConfig[1].destroyDialog) {
                    button.node.on("click", function() {
                        dialogBox.destroyAllChildren();
                        dialogBox.destroy();
                    });
                }
                break;
            }
        });
    }
});
