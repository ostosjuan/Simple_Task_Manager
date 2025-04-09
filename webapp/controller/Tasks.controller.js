sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/m/MessageToast",
  "task/tasks/model/formatter"
], function (Controller, ODataModel, MessageToast, formatter) {
  "use strict";

  return Controller.extend("task.tasks.controller.Tasks", {
  formatter: formatter,

    onInit: function () {
      const oModel = this.getOwnerComponent().getModel(); 
      const oNewTaskModel = new sap.ui.model.json.JSONModel({
        Title: "",
        Description: "",
        Status: "Pendiente"
      });
      this.getView().setModel(oNewTaskModel, "newTask");     

     
    },
   
    onTaskPress: function (oEvent) {
      const oItem = oEvent.getSource();
      const oCtx = oEvent.getParameter("listItem").getBindingContext();
      const sId = oCtx.getProperty("ID");

      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("TaskDetail", {
        taskId: sId
      });
    },

    onOpenNewTaskDialog: function () {
      const oView = this.getView();
    
      if (!this._oDialog) {
        sap.ui.core.Fragment.load({
          id: oView.getId(),
          name: "task.tasks.view.fragment.NewTaskDialog",
          controller: this
        }).then(function (oDialog) {
          this._oDialog = oDialog;
          oView.addDependent(oDialog);
          oDialog.open();
        }.bind(this));
      } else {
        this._oDialog.open();
      }
    },
    
    onCloseDialog: function () {
      if (this._oDialog) {
        this._oDialog.close();
        this.onCleanNewTask();
      }
    },
    
    onCreateTask: function () {
      const oModel  = this.getOwnerComponent().getModel();
      const oNewTaskData = this.getView().getModel("newTask").getData(); 
      oModel.read("/Tasks", {
        success: function (oData) {
          const aTasks = oData.results;
          let newId = "1"; // valor por defecto
    
          if (aTasks.length > 0) {
            // Obtener el ID más alto y sumarle 1
            const maxId = Math.max(...aTasks.map(task => parseInt(task.ID)));
            newId = (maxId + 1).toString();
          }
    
          oNewTaskData.ID = newId;
          
          if (!oNewTaskData.Title) {
            sap.m.MessageToast.show("El título es obligatorio");
            return;
          }  
    
          this.onSaveTask(oNewTaskData); 
          this.onCloseDialog();
          this.onCleanNewTask();
    
        }.bind(this),
    
        error: function (err) {
          console.error("Error al obtener tareas:", err);
        }
      });

    },

    onCleanNewTask: function(){
      const oNewTaskModel = this.getView().getModel("newTask");
      oNewTaskModel.setData({
        ID: "",
        Title: "",
        Description: "",
        DueDate: null,
        Status: "Pending"
      });
    },


    onSaveTask: function (oNewTaskData){
      const oModel  = this.getOwnerComponent().getModel();

      oModel.create("/Tasks", oNewTaskData, {
        success: function () {
          sap.m.MessageToast.show("Tarea creada");
          oModel.refresh();
        },
        error: function () {
          sap.m.MessageToast.show("Error al crear tarea");
        }
      });
    },

    onDeleteTask: function (oEvent) {
      const oCtx = oEvent.getSource().getBindingContext();
      const sPath = oCtx.getPath();
      this.getView().getModel().remove(sPath, {
        success: () => sap.m.MessageToast.show("Tarea eliminada"),
        error: () => sap.m.MessageToast.show("Error al eliminar")
      });
    }

  });
});