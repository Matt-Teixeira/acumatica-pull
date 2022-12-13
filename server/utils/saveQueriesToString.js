("use strict");
require("dotenv").config();
const fs = require("fs").promises;
const date_time = require("../utils/dateFormat");

async function customerDeltaQueryToString(customer, key) {
  let date = date_time();
  const migrationString =
    `UPDATE customers SET ${key} = '${customer.incoming[key]}' WHERE id = '${customer.customer_id}'` +
    "\n";
  await fs.writeFile(
    `./migrationQueries/updates/updated/updateDeltaQueries_${date}.txt`,
    migrationString,
    { encoding: "utf-8", flag: "a" }
  );
}

async function siteDeltaQueryToString(site, key) {
  let date = date_time();
  const migrationString =
    `UPDATE sites SET ${key} = '${site.incoming[key]}' WHERE id = '${site.site_id}'` +
    "\n";
  await fs.writeFile(
    `./migrationQueries/updates/updated/updateDeltaQueries_${date}.txt`,
    migrationString,
    { encoding: "utf-8", flag: "a" }
  );
}

async function systemDeltaQueryToString(system, key) {
  let date = date_time();
  const migrationString =
    `UPDATE systems SET ${key} = '${system.incoming[key]}' WHERE id = '${system.system_id}'` +
    "\n";
  await fs.writeFile(
    `./migrationQueries/updates/updated/updateDeltaQueries_${date}.txt`,
    migrationString,
    { encoding: "utf-8", flag: "a" }
  );
}

module.exports = {
  siteDeltaQueryToString,
  customerDeltaQueryToString,
  systemDeltaQueryToString,
};
