sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast"
  ], function (Controller, ODataModel, MessageToast) {
    "use strict";
  
    return Controller.extend("task.tasks.controller.Tasks", {
      onInit: function () {
        const oModel = this.getOwnerComponent().getModel();

        if (!oModel) {
          console.error("El modelo no está disponible en el init");
          return;
        }
      
        oModel.read("/Tasks", {
          success: function (oData) {
            const first = oData.results?.[0];
            if (first) {
              const sPath = "/Tasks('" + first.ID + "')";
              this.getView().bindElement({ path: sPath });
            }
          }.bind(this),
          error: function (err) {
            console.error("Error al leer Tasks", err);
          }
        });
      }
    });
  });