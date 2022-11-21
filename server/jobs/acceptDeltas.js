("use strict");
require("dotenv").config();
const { log } = require("../logger");
const pgPool = require("../db/pg-pool");
const {
  updateCustomerDeltas,
  updateSiteDeltas,
  updateSystemDeltas,
} = require("../utils/deltaQueries");
const {
  siteDeltaQueryToString,
  customerDeltaQueryToString,
  systemDeltaQueryToString,
} = require("../utils/saveQueriesToString");

async function acceptDeltas(deltas) {
  try {
    // Customer Deltas

    for await (let customer of deltas.customers) {
      let keys = Object.keys(customer.incoming);
      for (let key of keys) {
        const updatedRow = await updateCustomerDeltas(customer, key);
        if (!updatedRow) {
          throw new Error(
            `Could not update ${customer.customer} with ${customer.incoming[key]}`
          );
        }

        await customerDeltaQueryToString(customer, key);

        await log("info", "NA", "NA", "acceptDeltas", `FN CALL`, {
          updated: customer,
        });
      }
    }

    // Site Deltas

    for await (let site of deltas.sites) {
      let keys = Object.keys(site.incoming);
      for (let key of keys) {
        // Update site table with API deltas
        const updatedRow = await updateSiteDeltas(site, key);
        if (!updatedRow) {
          throw new Error(
            `Could not update ${site.site} with ${site.incoming[key]}`
          );
        }

        // Store query as string
        await siteDeltaQueryToString(site, key);

        await log("info", "NA", "NA", "acceptDeltas", `FN CALL`, {
          updated: site,
        });
      }
    }

    // System Deltas

    for await (let system of deltas.systems) {
      let keys = Object.keys(system.incoming);
      for (let key of keys) {
        const updatedRow = await updateSystemDeltas(system, key);
        if (!updatedRow) {
          throw new Error(
            `Could not update ${site.site} with ${site.incoming[key]}`
          );
        }

        await systemDeltaQueryToString(system, key);

        await log("info", "NA", "NA", "acceptDeltas", `FN CALL`, {
          updated: system,
        });
      }
    }
  } catch (error) {
    await log("error", "NA", "NA", "acceptDeltas", `FN CALL`, {
      error: error.message,
    });
  }
}

module.exports = acceptDeltas;
