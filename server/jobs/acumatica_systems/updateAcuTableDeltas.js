("use strict");
require("dotenv").config();
const { log } = require("../../logger");
const { updateAcuTable } = require("../../utils/deltaQueries");

const updateAcuTableDeltas = async (deltas) => {
  try {
    await log("info", "NA", "NA", "updateAcuTableDeltas", `FN CALL`);
    //console.log(deltas);
    for await (const delta of deltas) {
      let keys = Object.keys(delta.deltas);
      for await (const key of keys) {
        await updateAcuTable(delta, key);
      }
    }
  } catch (error) {
    await log("error", "NA", "NA", "updateAcuTableDeltas", `FN CALL`, {
      error: error,
    });
  }
};

module.exports = updateAcuTableDeltas;
