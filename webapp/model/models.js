sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @returns 
     */
function (JSONModel, Device) {
    "use strict";

    return {
        createTask: function () {
            return new JSONModel({
                Title: "",
                Description: "",
                Status: "Pendiente"
            });
        }      
    }
    

});