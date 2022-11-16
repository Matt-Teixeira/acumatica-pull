const apiCall = require("./getAllApiData");
const formatApiData = require("./formatApiData");
const getDelta = require("./getDelta");
const updateWithAdditions = require("./updateWithAdditions");
const acceptDeltas = require("./acceptDeltas");

module.exports = {
  apiCall,
  formatApiData,
  getDelta,
  updateWithAdditions,
  acceptDeltas
};
