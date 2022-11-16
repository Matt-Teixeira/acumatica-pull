("use strict");
require("dotenv").config();
const { log } = require("../logger");
const { systemQuery, customersQuery, sitesQuery } = require("../utils/queries");
const {
  proposeRemoveFromDb,
  proposeAddToDb,
  currentStateDeltas,
} = require("../controllers/acumaticaAPI/deltas");

const getDelta = async (equipmentData) => {
  try {
    await log("info", "NA", "NA", "getDelta", `FN CALL`);
    const delta = {
      remove: {},
      add: {},
      deltas: {
        customers: [],
        sites: [],
        systems: [],
      },
    };
  
    // Get existing customer, site, and system ids in the database
    const systemDbData = await systemQuery();
    const customerDbData = await customersQuery();
    const siteDbData = await sitesQuery();
  
    // IN DB BUT NOT IN API
    const removeData = await proposeRemoveFromDb(
      equipmentData,
      systemDbData,
      customerDbData,
      siteDbData
    );
    delta.remove = removeData;
  
    // IN API BUT NOT IN DB
    const addData = await proposeAddToDb(
      equipmentData,
      systemDbData,
      customerDbData,
      siteDbData
    );
    delta.add = addData;
  
    // for in Loop through API Customer Data and compare it to corrolated db data
  
    await currentStateDeltas(
      equipmentData,
      systemDbData,
      customerDbData,
      siteDbData,
      delta
    );

    await log("info", "NA", "NA", "getDelta", `FN CALL`, {
      customer_deltas: delta.deltas.customers.length,
      site_deltas: delta.deltas.sites.length,
      system_deltas: delta.deltas.systems.length,
      delta: delta
    });
  
    return delta;
  } catch (error) {
    await log("error", "NA", "NA", "getDelta", `FN CALL`, {
      error: error
    });
  }
};

module.exports = getDelta;
