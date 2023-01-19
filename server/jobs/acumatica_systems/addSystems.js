("use strict");
require("dotenv").config();
const { log } = require("../../logger");
const { acumaticaTableInsert } = require("../../utils/queries");

const addToAcumaticaTable = async (add_remove) => {
  try {
    await log("info", "NA", "NA", "addToAcumaticaTable", `FN CALL`);

    for await (const system of add_remove) {
      const values = [];
      for (const key in system) {
        values.push(system[key]);
      }

      await acumaticaTableInsert(values);
    }
  } catch (error) {
    await log("error", "NA", "NA", "addToAcumaticaTable", `FN CALL`, {
      error: error,
    });
  }
};

module.exports = addToAcumaticaTable;
