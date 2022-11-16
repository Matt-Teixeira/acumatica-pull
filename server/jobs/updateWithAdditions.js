("use strict");
require("dotenv").config();
const { log } = require("../logger");
const pgPool = require("../db/pg-pool");
const {
  checkForNullSystems,
  checkForNullCustomers,
  checkForNullSites,
} = require("../utils/checkForNullInserts");

async function updateWithAdditions(deltas) {
  try {
    await log("info", "NA", "NA", "updateWithAdditions", `FN CALL`);
    for await (customer of deltas.customers) {
      const queryStr = "INSERT INTO customers(id, name) VALUES($1, $2)";
      const values = [customer.id, customer.name];

      const hasNulls = await checkForNullCustomers(customer);
      if (!hasNulls) {
        await pgPool.query(queryStr, values);
        await log("info", "NA", "NA", "updateWithAdditions", `FN CALL`, {
            inserted: customer
        });
      } else {
        await log("warn", "NA", "NA", "updateWithAdditions", `FN CALL`, {
          message: "Null values detected for constraint values",
          customer: customer,
        });
      }
    }

    for await (site of deltas.sites) {
      const queryStr =
        "INSERT INTO sites(id, customer_id, name, state, city, street_address, zip) VALUES($1, $2, $3, $4, $5, $6, $7)";
      const values = [
        site.id,
        site.customer_id,
        site.name,
        site.state,
        site.city,
        site.street_address,
        site.zip,
      ];
      const hasNulls = await checkForNullSites(site);
      if (!hasNulls) {
        await pgPool.query(queryStr, values);
        await log("info", "NA", "NA", "updateWithAdditions", `FN CALL`, {
            inserted: site
        });
      } else {
        await log("warn", "NA", "NA", "updateWithAdditions", `FN CALL`, {
          message: "Null values detected for constraint values",
          site: site,
        });
      }
    }

    for await (system of deltas.systems) {
      const queryStr =
        "INSERT INTO systems(id, customer_id, site_id, manufacturer, modality, model, serial_number, room) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
      const values = [
        system.id,
        system.customer_id,
        system.site_id,
        system.manufacturer,
        system.modality,
        system.model,
        system.serial_number,
        system.room,
      ];
      const hasNulls = await checkForNullSystems(system);
      if (!hasNulls) {
        await pgPool.query(queryStr, values);
        await log("info", "NA", "NA", "updateWithAdditions", `FN CALL`, {
            inserted: system
        });
      } else {
        await log("warn", "NA", "NA", "updateWithAdditions", `FN CALL`, {
          message: "Null values detected for constraint values",
          system: system,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateWithAdditions;
