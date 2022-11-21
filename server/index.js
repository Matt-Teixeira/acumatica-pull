("use strict");
require("dotenv").config();
const { log } = require("./logger");
const Interface = require("./controllers/cli/index");

const cli = new Interface();

const onBoot = async () => {
  await log("info", "NA", "NA", "onBoot", `FN CALL`);
  await cli.viewOptions();
};

onBoot();