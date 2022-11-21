("use strict");
require("dotenv").config();
const { log } = require("../logger");
const fs = require("fs").promises;
const date_time = require("../utils/dateFormat");

async function customerDeltaQueryToString(customer, key) {
  let date = date_time();
  const migrationString =
    `UPDATE customers SET ${key} = '${customer.incoming[key]}' WHERE id = '${customer.customer}'` +
    "\n";
  await fs.writeFile(
    `./migrationQueries/updateDeltaQueries_${date}.txt`,
    migrationString,
    { encoding: "utf-8", flag: "a" }
  );
}

async function siteDeltaQueryToString(site, key) {
  let date = date_time();
  const migrationString =
    `UPDATE sites SET ${key} = '${site.incoming[key]}' WHERE id = '${site.site}'` +
    "\n";
  await fs.writeFile(
    `./migrationQueries/updateDeltaQueries_${date}.txt`,
    migrationString,
    { encoding: "utf-8", flag: "a" }
  );
}

async function systemDeltaQueryToString(system, key) {
  let date = date_time();
  const migrationString =
    `UPDATE systems SET ${key} = '${system.incoming[key]}' WHERE id = '${system.system}'` +
    "\n";
  await fs.writeFile(
    `./migrationQueries/updateDeltaQueries_${date}.txt`,
    migrationString,
    { encoding: "utf-8", flag: "a" }
  );
}

module.exports = {
  siteDeltaQueryToString,
  customerDeltaQueryToString,
  systemDeltaQueryToString,
};