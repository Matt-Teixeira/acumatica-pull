("use strict");
require("dotenv").config();
const { log } = require("../logger");
const pgPool = require("../db/pg-pool");

async function acceptDeltas(deltas) {
  try {
    for await (let customer of deltas.customers) {
      let keys = Object.keys(customer.incoming);
      for (let key of keys) {
        const queryStr = `UPDATE customers SET ${key} = '${customer.incoming[key]}' WHERE id = '${customer.customer}'`;
        await pgPool.query(queryStr);
        await log("info", "NA", "NA", "acceptDeltas", `FN CALL`, {
          updated: customer,
        });
      }
    }

    for await (let site of deltas.sites) {
      let keys = Object.keys(site.incoming);
      for (let key of keys) {
        const queryStr = `UPDATE sites SET ${key} = '${site.incoming[key]}' WHERE id = '${site.site}'`;
        await pgPool.query(queryStr);
        await log("info", "NA", "NA", "acceptDeltas", `FN CALL`, {
          updated: site,
        });
      }
    }

    for await (let system of deltas.systems) {
      let keys = Object.keys(system.incoming);
      for (let key of keys) {
        const queryStr = `UPDATE systems SET ${key} = '${system.incoming[key]}' WHERE id = '${system.system}'`;
        await pgPool.query(queryStr);
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

/* 
[
    {
      customer: 'C017728',
      current: { name: 'undefined' },
      incoming: { name: 'Aspire Hospital' }
    }
  ]
   */
