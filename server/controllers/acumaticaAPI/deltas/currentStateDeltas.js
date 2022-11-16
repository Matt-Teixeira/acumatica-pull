("use strict");
require("dotenv").config();
const { log } = require("../../../logger");

async function currentStateDeltas(
  equipmentData,
  systemDbData,
  customerDbData,
  siteDbData,
  delta
) {
  try {
    // Find customer deltas

    // Loop through each customer object from db and find the API customer with same id
    // API CUSTOMER: foundCustomer
    // DB CUSTOMER: customer
    for (let customer of customerDbData) {
      let foundCustomer = await equipmentData.customers.find((cust) => {
        return cust.id === customer.id;
      });

      // If customer found, we compare the values of each property, in the two objects, for equality
      if (foundCustomer) {
        let deltaObj = {
          customer: customer.id,
          current: {},
          incoming: {},
        };
        for (let prop in foundCustomer) {
          let equalValues = foundCustomer[prop] === customer[prop];
          if (!equalValues) {
            deltaObj.current[prop] = customer[prop];
            deltaObj.incoming[prop] = foundCustomer[prop];
          }
        }
        // If object.keys > 1 push delta
        if (Object.keys(deltaObj.incoming).length > 0) {
          delta.deltas.customers.push({ ...deltaObj });
        }
        deltaObj = {};
      }
    }

    // Find site deltas

    for (let site of siteDbData) {
      let foundSite = await equipmentData.sites.find((si) => {
        return si.id === site.id;
      });

      if (foundSite) {
        let deltaObj = {
          site: site.id,
          current: {},
          incoming: {},
        };
        for (let prop in foundSite) {
          let equalValues = foundSite[prop] === site[prop];
          if (!equalValues) {
            deltaObj.current[prop] = site[prop];
            deltaObj.incoming[prop] = foundSite[prop];
          }
        }
        if (Object.keys(deltaObj.incoming).length > 0) {
          delta.deltas.sites.push({ ...deltaObj });
        }
        deltaObj = {};
      }
    }

    for (let system of systemDbData) {
      let foundSystem = await equipmentData.systems.find((sys) => {
        return sys.id === system.id;
      });

      if (foundSystem) {
        let deltaObj = {
          system: system.id,
          current: {},
          incoming: {},
        };
        for (let prop in foundSystem) {
          let equalValues = foundSystem[prop] === system[prop];
          if (!equalValues) {
            deltaObj.current[prop] = system[prop];
            deltaObj.incoming[prop] = foundSystem[prop];
          }
        }
        if (Object.keys(deltaObj.incoming).length > 0) {
          delta.deltas.systems.push({ ...deltaObj });
        }
        deltaObj = {};
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = currentStateDeltas;
