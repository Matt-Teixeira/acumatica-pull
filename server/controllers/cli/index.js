require("dotenv").config();
const { log } = require("../../logger");
const {
  apiCall,
  formatApiData,
  getDelta,
  updateWithAdditions,
  acceptDeltas,
  backupTables,
  restoreTables,
  detailedDelta,
} = require("../../jobs");

const { question, readline } = require("../../utils/readlinePromisify");

class Interface {
  options = {
    1: "Insert New Data",
    2: "Merge Deltas",
    3: "Backup Tables",
    4: "Restore Tables",
    5: "Detailed Delta",
  };

  async viewOptions() {
    await log("info", "NA", "NA", "viewOptions", `FN CALL`, {
      options: this.options,
    });
    const equipmentData = await apiCall();
    const formattedData = await formatApiData(equipmentData);
    const delta = await getDelta(formattedData);
    console.table(this.options);
    const option = await question("What would you like to do? ");
    switch (option) {
      case "1":
        await updateWithAdditions(delta.add);
        break;
      case "2":
        await acceptDeltas(delta.deltas);
        break;
      case "3":
        readline.close();
        await backupTables();
        break;
      case "4":
        await restoreTables();
        break;
      case "5":
        await detailedDelta(formattedData);
        break;
      default:
        console.log(option + " is not an option");
        break;
    }
    readline.close();
  }
}

module.exports = Interface;
