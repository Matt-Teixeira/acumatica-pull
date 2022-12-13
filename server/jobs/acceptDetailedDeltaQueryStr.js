("use strict");
require("dotenv").config();
const { log } = require("../logger");
const fs = require("fs").promises;
const date_time = require("../utils/dateFormat");

async function acceptDetailedDeltaQueryStr(deltas) {
  try {
    // Customer Deltas

    for await (let customer of deltas.customers) {
      let keys = Object.keys(customer.incoming);
      for (let key of keys) {
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
    }

    // Site Deltas

    for await (let site of deltas.sites) {
      let keys = Object.keys(site.incoming);
      for await (let key of keys) {
        let date = date_time();
        const migrationString =
          `UPDATE sites SET ${key} = '${site.incoming[key]}' WHERE id = '${site.site_id}'` +
          "\n";
        await fs.writeFile(
          `./migrationQueries/updates/proposed/updateDeltaQueries_${date}.txt`,
          migrationString,
          { encoding: "utf-8", flag: "a" }
        );
      }
    }

    // System Deltas

    for await (let system of deltas.systems) {
      let keys = Object.keys(system.incoming);
      for (let key of keys) {
        let date = date_time();
        //await systemDeltaQueryToString(system, key);
        const migrationString =
          `UPDATE systems SET ${key} = '${system.incoming[key]}' WHERE id = '${system.system_id}'` +
          "\n";
        await fs.writeFile(
          `./migrationQueries/updates/proposed/updateDeltaQueries_${date}.txt`,
          migrationString,
          { encoding: "utf-8", flag: "a" }
        );
      }
    }
  } catch (error) {
    await log("error", "NA", "NA", "acceptDetailedDeltaQueryStr", `FN CALL`, {
      error: error.message,
    });
  }
}

module.exports = acceptDetailedDeltaQueryStr;
