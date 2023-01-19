const { log } = require("../../logger");
const { acumaticaTableInsert } = require("../../utils/queries");

async function insertAcumaticaSystems(equipmentArray) {
  try {
    await log("info", "NA", "NA", "insertAcumaticaSystems", `FN CALL`);

    for await (let system of equipmentArray) {
      const valuesArray = [];
      for (const prop in system) {
        valuesArray.push(system[prop]);
      }
      await acumaticaTableInsert(valuesArray);
    }
  } catch (error) {
    await log("error", "NA", "NA", "insertAcumaticaSystems", `FN CALL`, {
        error: error.message
    });
  }
}

module.exports = insertAcumaticaSystems;
