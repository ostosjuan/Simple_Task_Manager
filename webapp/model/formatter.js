sap.ui.define([], function () {
    "use strict";
    return {
      statusColor: function (sStatus) {
        if (sStatus === "Completo") {
          return "Success"; 
        } else if (sStatus === "Pendiente") {
          return "Warning"; 
        } else {
          return "None"; 
        }
      }
    };
  });