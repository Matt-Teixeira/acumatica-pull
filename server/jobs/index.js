const apiCall = require("./getAllApiData");
const formatApiData = require("./formatApiData");
const getDelta = require("./getDelta");
const updateWithAdditions = require("./updateWithAdditions");
const acceptDeltas = require("./acceptDeltas");
const backupTables = require("./backupTables");
const restoreTables = require("./restoreTables");
const detailedDelta = require("./detailedDelta");

module.exports = {
  apiCall,
  formatApiData,
  getDelta,
  updateWithAdditions,
  acceptDeltas,
  backupTables,
  restoreTables,
  detailedDelta,
};
