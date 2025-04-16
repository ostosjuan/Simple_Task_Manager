sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
  ], function (Controller, History) {
    "use strict";
  
    return Controller.extend("task.tasks.controller.TaskDetail", {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("TaskDetail").attachPatternMatched(this._onObjectMatched, this);
      },
  
      _onObjectMatched: function (oEvent) {
        const sTaskId = oEvent.getParameter("arguments").taskId;
        const sPath = "/Tasks('" + sTaskId + "')";
        this.getView().bindElement({ path: sPath });
      },
  
      onNavBack: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();
        
        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getOwnerComponent().getRouter().navTo("RouteTasks", {}, true);
        }
      }
    });
  });
  