("use strict");
require("dotenv").config();
const { log } = require("../../logger");
const { bulkDbAcuQuery } = require("../../utils/queries");

const findRemoveAddAcu = async (apiEquipmentData) => {
  try {
    await log("info", "NA", "NA", "findRemoveAddAcu", `FN CALL`);
    const add_remove = {
      add: [],
      remove: [],
    };

    const acumaticaDbData = await bulkDbAcuQuery();

    // Check what is in api that isn't in the database (add system)
    for await (let system of apiEquipmentData) {
      const found = acumaticaDbData.find(
        (element) => element.equipmentnbr === system.equipmentnbr
      );

      if (found === undefined) {
        add_remove.add.push(system);
      }
    }

    // Check what is in database that isn't in the api (remove system)
    for await (let system of acumaticaDbData) {
      const found = apiEquipmentData.find(
        (element) => element.equipmentnbr === system.equipmentnbr
      );

      if (found === undefined) {
        add_remove.remove.push(system);
      }
    }

    return add_remove;
  } catch (error) {
    await log("error", "NA", "NA", "findRemoveAddAcu", `FN CALL`, {
      error: error,
    });
  }
};

module.exports = findRemoveAddAcu;
