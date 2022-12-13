("use strict");
require("dotenv").config();
const { log } = require("../logger");
const { systemQuery, customersQuery, sitesQuery } = require("../utils/queries");
// const acceptDeltas = require("./acceptDetailedDelta");

async function detailedDelta(equipmentData, deltas) {
  await log("info", "NA", "NA", "detailedDelta", `FN CALL`);

  const delta = {
    customers: [],
    sites: [],
    systems: [],
  };

  const distinctManufacturers = [
    "Siemens",
    "GE",
    "Philips",
    "Toshiba",
    "Americomp",
  ];

  const dbCustomers = await customersQuery();
  const dbSites = await sitesQuery();
  const dbSystems = await systemQuery();

  // Compare customer data;
  // customer of equipmentData = formatted API data
  // foundDbCustomer = customer data from DB
  for await (const customer of equipmentData.comboData.customers) {
    let foundDbCustomer = await dbCustomers.find((cust) => {
      return cust.id === customer.id;
    });

    if (foundDbCustomer) {
      let deltaObj = {
        customer_id: foundDbCustomer.id,
        current: {},
        incoming: {},
      };
      for (const prop in foundDbCustomer) {
        let equalValues = foundDbCustomer[prop] === customer[prop];
        if (!equalValues) {
          deltaObj.incoming[prop] === customer[prop];
          deltaObj.current[prop] === foundDbCustomer[prop];
        }
      }
      if (Object.keys(deltaObj.incoming).length > 0) {
        delta.customers.push(deltaObj);
      }
    }
  }

  // Compare site data;
  // site of equipmentData = formatted API data
  // foundDbSite = site data from DB
  for await (const site of equipmentData.comboData.sites) {
    let foundDbSite = await dbSites.find((si) => {
      return si.id === site.id;
    });

    if (foundDbSite) {
      let deltaObj = {
        site_id: foundDbSite.id,
        current: {},
        incoming: {},
      };
      for (const prop in foundDbSite) {
        if (distinctManufacturers.includes(site[prop])) {
          break;
        }
        let equalValues = foundDbSite[prop] === site[prop];
        if (!equalValues) {
          deltaObj.incoming[prop] = site[prop];
          deltaObj.current[prop] = foundDbSite[prop];
        }
      }
      // If object has keys, that is becuse there are deltas
      if (Object.keys(deltaObj.incoming).length > 0) {
        delta.sites.push(deltaObj);
      }
    }
  }

  // Compare system data;
  // system of equipmentData = formatted API data
  // foundDbSystem = system data from DB
  for await (const system of equipmentData.comboData.systems) {
    let foundDbSystem = await dbSystems.find((sys) => {
      return sys.id === system.id;
    });

    if (foundDbSystem) {
      let deltaObj = {
        system_id: foundDbSystem.id,
        current: {},
        incoming: {},
      };
      for (const prop in foundDbSystem) {
        let equalValues = foundDbSystem[prop] === system[prop];
        if (!equalValues) {
          deltaObj.incoming[prop] = system[prop];
          deltaObj.current[prop] = foundDbSystem[prop];
        }
      }
      // If object has keys, that is becuse there are deltas
      if (Object.keys(deltaObj.incoming).length > 0) {
        delta.systems.push(deltaObj);
      }
    }
  }

  // modify incoming delta object from findRemoveAdd() and append new delta object
  deltas.deltas = delta;

  // console.log(delta);

  await log("info", "NA", "NA", "detailedDelta", `FN CALL`, {
    deltas: deltas,
  });

  // Returning only the delta object created here. Used to merge deltas.
  return delta;
}

module.exports = detailedDelta;
