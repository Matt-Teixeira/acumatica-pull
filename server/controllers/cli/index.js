require("dotenv").config();
const { log } = require("../../logger");
const {
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
} = require("../../jobs");

const { question, readline } = require("../../utils/readlinePromisify");

class Interface {
  options = {
    1: "View Deltas",
    2: "Insert New Data",
    3: "Merge Deltas",
    4: "Backup Tables",
    5: "Restore Tables",
    6: "Write queries for additions",
    7: "Write queries for updates",
    8: "Insert Into Acumatica Table",
    9: "Add New Systems",
    10: "Find acumatica table deltas",
    11: "Update acumatica table with deltas",
  };

  async viewOptions() {
    await log("info", "NA", "NA", "viewOptions", `FN CALL`, {
      options: this.options,
    });
    const equipmentData = await apiCall();
    const formattedData = await formatApiData(equipmentData);
    const formattedAcuData = await formatApiDataAcuTable(equipmentData);
    const deltas = await findRemoveAdd(formattedData);

    console.log("* * * * * Modifying: " + process.env.PG_DB + " * * * * *");
    console.table(this.options);
    const option = await question("What would you like to do? ");
    switch (option) {
      case "1":
        await detailedDelta(formattedData, deltas);
        break;
      case "2":
        await updateWithAdditions(deltas.add);
        break;
      case "3":
        const delta = await detailedDelta(formattedData, deltas);
        await acceptDetailedDeltas(delta);
        break;
      case "4":
        readline.close();
        await backupTables();
        break;
      case "5":
        await restoreTables();
        break;
      case "6":
        await updateWithAdditionsQueryStr(deltas.add);
        break;
      case "7":
        const delta_ = await detailedDelta(formattedData, deltas);
        await acceptDetailedDeltaQueryStr(delta_);
        break;
      case "8":
        await insertAcumaticaSystems(formattedAcuData);
        break;
      case "9":
        const add_remove = await findRemoveAddAcu(formattedAcuData);
        await addToAcumaticaTable(add_remove.add);
        break;
      case "10":
        await findDeltas(formattedAcuData);
        return;
        break;
      case "11":
        const acuDeltas = await findDeltas(formattedAcuData);
        await updateAcuTableDeltas(acuDeltas);
        break;
      default:
        console.log(option + " is not an option");
        break;
    }
    readline.close();
  }
}

module.exports = Interface;
