/*global QUnit*/

sap.ui.define([
	"task/tasks/controller/Tasks.controller"
  ], function (Controller) {
	"use strict";
  
	QUnit.module("Tests del controlador de tareas");
  
	QUnit.test("Debe instanciar correctamente el controlador", function (assert) {
	  const oController = new Controller();
	  assert.ok(oController, "Se creó correctamente el controlador");
	});
  
	QUnit.test("Debe validar título vacío antes de crear tarea", function (assert) {
		const oController = new Controller();
	  
		// Simula sap.m.MessageToast
		const oMessageToastSpy = sinon.spy(sap.m.MessageToast, "show");
	  
		// Mock completo de getView() → getModel("newTask").getData()
		oController.getView = function () {
		  return {
			getModel: function (sName) {
			  if (sName === "newTask") {
				return {
				  getData: function () {
					return { Title: "" }; // <- Forzar título vacío
				  }
				};
			  }
			  return null;
			}
		  };
		};
	  
		// Mock getOwnerComponent().getModel().read() y .create()
		oController.getOwnerComponent = function () {
		  return {
			getModel: function () {
			  return {
				read: function () { },
				create: function () { }
			  };
			}
		  };
		};
	  
		// Ejecutar el método real
		oController.onCreateTask();
	  
		// Verificar que se llamó a MessageToast
		assert.ok(oMessageToastSpy.calledOnce, "Se mostró el mensaje de validación");
	  
		// Limpiar spy
		oMessageToastSpy.restore();
	  });
  
  });
  