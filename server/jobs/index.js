const apiCall = require("./getAllApiData");
const formatApiData = require("./formatApiData");
const findRemoveAdd = require("./findRemoveAdd");
const updateWithAdditions = require("./updateWithAdditions");
const backupTables = require("./backupTables");
const restoreTables = require("./restoreTables");
const detailedDelta = require("./detailedDelta");
const acceptDetailedDeltas = require("./acceptDetailedDelta");

module.exports = {
  apiCall,
  formatApiData,
  findRemoveAdd,
  updateWithAdditions,
  backupTables,
  restoreTables,
  detailedDelta,
  acceptDetailedDeltas,
};
