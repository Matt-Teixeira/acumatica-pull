("use strict");
require("dotenv").config();
const { log } = require("../logger");
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

const { checkForNullSystems } = require("../utils/checkForNullUpdates");

async function acceptDetailedDeltas(deltas) {
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

        await log("info", "NA", "NA", "acceptDetailedDeltas", `FN CALL`, {
          updated: customer,
        });
      }
    }

    // Site Deltas

    for await (let site of deltas.sites) {
      let keys = Object.keys(site.incoming);
      for await (let key of keys) {
        // Update site table with API deltas
        const updatedRow = await updateSiteDeltas(site, key);
        if (!updatedRow) {
          throw new Error(
            `Could not update ${site.site} with ${site.incoming[key]}`
          );
        }

        // Store query as string
        await siteDeltaQueryToString(site, key);

        await log("info", "NA", "NA", "acceptDetailedDeltas", `FN CALL`, {
          updated: site,
        });
      }
    }

    // System Deltas

    for await (let system of deltas.systems) {
      const hasNulls = await checkForNullSystems(system);
      if (!hasNulls) {
        let keys = Object.keys(system.incoming);
        for await (let key of keys) {
          const updatedRow = await updateSystemDeltas(system, key);
          if (!updatedRow) {
            throw new Error(
              `Could not update ${system.system_id} with ${system.incoming[key]}`
            );
          }

          await systemDeltaQueryToString(system, key);

          await log("info", "NA", "NA", "acceptDetailedDeltas", `FN CALL`, {
            updated: system,
          });
        }
      } else {
        await log("warn", "NA", "NA", "updateWithAdditions", `FN CALL`, {
          message: "Null values detected for constraint values",
          system: system,
        });
      }
    }
  } catch (error) {
    await log("error", "NA", "NA", "acceptDetailedDeltas", `FN CALL`, {
      error: error.message,
    });
  }
}

module.exports = acceptDetailedDeltas;
