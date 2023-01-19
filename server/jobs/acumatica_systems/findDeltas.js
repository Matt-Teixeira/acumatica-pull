("use strict");
require("dotenv").config();
const { log } = require("../../logger");
const { bulkDbAcuQuery } = require("../../utils/queries");

const findDeltas = async (apiEquipmentData) => {
  try {
    await log("info", "NA", "NA", "findDeltas", `FN CALL`);

    const delta = [];

    const acumaticaDbData = await bulkDbAcuQuery();

    // Check what is in api that isn't in the database (add system)
    for await (let system of apiEquipmentData) {
      const found = acumaticaDbData.find(
        (element) => element.equipmentnbr === system.equipmentnbr
      );

      if (found === undefined) {
        await log("warn", "NA", "NA", "findDeltas", `FN CALL`, {
          sme: system.equipmentnbr,
          message: "Found in api, but not database",
        });
        continue;
      }

      const deltaObj = {system: "", deltas:{}};
      for (const key in system) {
        // Change api undefined values to null
        if (system[key] === undefined) system[key] = null;
        if (system[key] !== found[key]) {
          deltaObj.deltas[key] = system[key];
        }
      }
      if (Object.keys(deltaObj.deltas).length > 0) {
        // Add system id then push to delta array
        deltaObj.system = system.equipmentnbr;
        delta.push(deltaObj);
      }
    }

    await log("info", "NA", "NA", "findDeltas", `FN CALL`, { deltas: delta });

    return delta;
  } catch (error) {
    await log("error", "NA", "NA", "findDeltas", `FN CALL`, {
      error: error,
    });
  }
};

module.exports = findDeltas;
