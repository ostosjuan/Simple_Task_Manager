sap.ui.define([
    "sap/ui/core/UIComponent",
    "task/tasks/model/models"
  ], function (UIComponent, models) {
    "use strict";
  
    return UIComponent.extend("task.tasks.Component", {
      metadata: {
        manifest: "json",
        interfaces: [
          "sap.ui.core.IAsyncContentCreation"
        ]
      },
  
      init: function () {
        // Llama al init base
        UIComponent.prototype.init.apply(this, arguments); 
      
  
        // Inicializar routing
        this.getRouter().initialize();
      }
    });
  });