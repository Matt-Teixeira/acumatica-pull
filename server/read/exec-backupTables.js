const { log } = require("../logger");
require("dotenv").config();
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const execBackupTables = async (path, args) => {
    await log('info', 'NA', 'NA', 'execBackupTables', 'FN CALL', {
      path,
      args
    })
  try {
    const { stdout } = await execFile(path, args);
    await log("info", "NA", "NA", "execBackupTables", "FN DETAILS", {
      stdout
    });
  } catch (error) {
    await log("error", "NA", "NA", "execBackupTables", "FN CATCH", {
      error: error,
    });
    console.log(error);
    return null;
  }
};

module.exports = execBackupTables;
