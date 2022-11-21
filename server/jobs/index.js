const apiCall = require("./getAllApiData");
const formatApiData = require("./formatApiData");
const getDelta = require("./getDelta");
const updateWithAdditions = require("./updateWithAdditions");
const acceptDeltas = require("./acceptDeltas");
const backupTables = require("./backupTables");
const restoreTables = require("./restoreTables");

module.exports = {
  apiCall,
  formatApiData,
  getDelta,
  updateWithAdditions,
  acceptDeltas,
  backupTables,
  restoreTables,
};
