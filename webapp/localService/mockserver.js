//@ts-check
sap.ui.define([
  "sap/ui/core/util/MockServer",
  "sap/ui/model/json/JSONModel",
  "sap/base/util/UriParameters",
  "sap/base/Log"
],

/**
 * @param {typeof sap.ui.core.util.MockServer} MockServer 
 * @param {typeof sap.ui.model.json.JSONModel} JSONModel
 * @param {typeof sap.base.util.UriParameters} UriParameters 
 * @param {typeof sap.base.Log} Log 
 */
function (MockServer, JSONModel, UriParameters, Log) {
  "use strict";

  let oMockServer,
    _sAppPath = "task/tasks/",
    _sJsonFilesPath = "/localService/mockdata";

  let oMockServerInterface = {
    /**
     * @protected
     * @param {object} oOptionsParameter 
     * @returns {Promise}
     */
    init: function (oOptionsParameter) {
      let oOptions = oOptionsParameter || {};

      return new Promise(function (fnResolve, fnReject) {
        var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
            oManifestModel = new JSONModel(sManifestUrl);

        oManifestModel.attachRequestCompleted(function () {
          let oUriParameters = new UriParameters(window.location.href);
          let sJsonFilesUrl = _sJsonFilesPath;
          let oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
          let sMetadataUrl = oMainDataSource.settings.localUri

          let sMockserverUrl = oMainDataSource.uri;

          if (!oMockServer) {
            oMockServer = new MockServer({
              rootUri: sMockserverUrl
            });
          } else {
            oMockServer.stop();
          }

          MockServer.config({
            autoRespond: true,
            autoRespondAfter: oOptions.delay || oUriParameters.get("serverDelay") || 500
          });

          oMockServer.simulate(sMetadataUrl, {
            sMockdataBaseUrl: sJsonFilesUrl,
            bGenerateMissingMockData: true
          });

          let aRequests = oMockServer.getRequests();

          let fnResponse = function (iErrcode, sMessage, aRequest) {
            aRequest.response = function (oXhr) {
              oXhr.respond(iErrcode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
            };
          };

          // simulate Metadata Errors
          if (oOptions.metadataError || oUriParameters.get("metadataError")) {
            aRequests.forEach(function (aEntry) {
              if (aEntry.path.toString().indexOf("$metadata") > -1) {
                fnResponse(500, "metadata Error", aEntry);
              }
            });
          }

          // set Requests and start the server
          oMockServer.setRequests(aRequests);
          oMockServer.start();
          console.log("mockdata iniciado");
          Log.info("MockServer iniciado");
          fnResolve();
        });

        oManifestModel.attachRequestFailed(function () {
          let sError = "Error al cargar el manifest.json";
          Log.error(sError);
          fnReject(new Error(sError));
          console.log("errro manifest")
        });
      });
    }
  };

  return oMockServerInterface;
});
