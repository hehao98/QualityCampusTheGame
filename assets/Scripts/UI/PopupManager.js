
cc.Class({
    extends: cc.Component,

    properties: {
        popupPrefab: cc.Prefab,
        messageBoxPrefab: cc.Prefab,
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
     * @param {Function} okCallback the function to call when ok button is pressed
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
});
