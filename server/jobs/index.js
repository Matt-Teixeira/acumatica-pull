const apiCall = require("./getAllApiData");
const formatApiData = require("./formatApiData");
const findRemoveAdd = require("./findRemoveAdd");
const updateWithAdditions = require("./updateWithAdditions");
const backupTables = require("./backupTables");
const restoreTables = require("./restoreTables");
const detailedDelta = require("./detailedDelta");
const acceptDetailedDeltas = require("./acceptDetailedDelta");
const updateWithAdditionsQueryStr = require("./updateWithAdditionsQueryStr");
const acceptDetailedDeltaQueryStr = require("./acceptDetailedDeltaQueryStr");
const formatApiDataAcuTable = require("./acumatica_systems/formatApiDataAcuTable");
const insertAcumaticaSystems = require("./acumatica_systems/insertNewSystems");
const findRemoveAddAcu = require("./acumatica_systems/findRemoveAddAcu");
const addToAcumaticaTable = require("./acumatica_systems/addSystems");
const findDeltas = require("./acumatica_systems/findDeltas");
const updateAcuTableDeltas = require("./acumatica_systems/updateAcuTableDeltas");

module.exports = {
  apiCall,
  formatApiData,
  findRemoveAdd,
  updateWithAdditions,
  backupTables,
  restoreTables,
  detailedDelta,
  acceptDetailedDeltas,
  updateWithAdditionsQueryStr,
  acceptDetailedDeltaQueryStr,
  formatApiDataAcuTable,
  insertAcumaticaSystems,
  findRemoveAddAcu,
  addToAcumaticaTable,
  findDeltas,
  updateAcuTableDeltas,
};
