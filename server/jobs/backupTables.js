require("dotenv").config();
const { log } = require("../logger");
const execBackupTables = require("../read/exec-backupTables");
const date_time = require("../utils/dateFormat");

const backupTables = async () => {
  const filePath = `./read/sh/pg_dump.sh`;

  await log("info", "NA", "NA", "backupTables", "FN CALL", {
    path: filePath,
  });

  await execBackupTables(filePath, [
    process.env.PG_HOST,
    process.env.PG_USER,
    process.env.PG_DB,
    date_time(),
  ]);

  try {
  } catch (error) {
    await log("error", "NA", "NA", "backupTables", "FN CATCH", {
      error: error,
    });
  }
};

module.exports = backupTables;
