/*global QUnit*/

sap.ui.define([
	"task/tasks/controller/Tasks.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Tasks Controller");

	QUnit.test("I should test the Tasks controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
