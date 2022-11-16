const { log } = require("../logger");
require("dotenv").config();
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const execRestoreTables = async (path, args) => {
    await log('info', 'NA', 'NA', 'execRestoreTables', 'FN CALL', {
      path,
      args
    })
  try {
    const { stdout } = await execFile(path, args);
    await log("info", "NA", "NA", "execRestoreTables", "FN DETAILS", {
      stdout
    });
  } catch (error) {
    await log("error", "NA", "NA", "execRestoreTables", "FN CATCH", {
      error: error,
    });
    console.log(error);
    return null;
  }
};

module.exports = execRestoreTables;