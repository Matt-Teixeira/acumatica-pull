require("dotenv").config();
const { log } = require("../logger");
const execRestoreTables = require("../read/exec-restoreTables");
const { dropTables } = require("../utils/createTables");
const filePath = `./read/sh/pg_restore.sh`;

const { question, readline } = require("../utils/readlinePromisify");

const restoreTables = async () => {
  try {
    await log("info", "NA", "NA", "runJob", "FN CALL", {});

    const dateTime = await question(
      "Please enter date & time as shown on .tar "
    );
    readline.close();
    await dropTables();
    await execRestoreTables(filePath, [dateTime]);
  } catch (error) {
    await log("error", "NA", "NA", "runJob", "FN CATCH", {
      error: error,
    });
  }
};


module.exports = restoreTables;
