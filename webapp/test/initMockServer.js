sap.ui.define([
    "../localService/mockserver",
    "sap/m/MessageBox"
  ], function (mockserver, MessageBox) {
    "use strict";
  
    // Inicializamos todos los mock servers
    const aMockServers = [];
  
    // Inicia el mockserver principal
    aMockServers.push(mockserver.init());
  
    // Manejo de éxito / error
    Promise.all(aMockServers)
      .then(function () {
        console.log("Todos los MockServers fueron iniciados.");
      })
      .catch(function (oError) {
        MessageBox.error("Error al iniciar el MockServer: " + oError.message);
      })
      .finally(function () {
        // Activar soporte para ComponentSupport después de mock
        sap.ui.require(["sap/ui/core/ComponentSupport"]);
      });
  });