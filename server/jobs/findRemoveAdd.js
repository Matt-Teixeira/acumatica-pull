("use strict");
require("dotenv").config();
const { log } = require("../logger");
const { systemQuery, customersQuery, sitesQuery } = require("../utils/queries");
const {
  proposeRemoveFromDb,
  proposeAddToDb,
} = require("../controllers/acumaticaAPI/deltas");

// Function finds customers, sites, and systems that are not in API, but in DB aw well as whit is in DB, but not in API. 
// Does not make any modifications to db.
const findRemoveAdd = async (equipmentData) => {
  try {
    await log("info", "NA", "NA", "findRemoveAdd", `FN CALL`);
    const delta = {
      remove: {},
      add: {},
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
  
    return delta;
  } catch (error) {
    await log("error", "NA", "NA", "findRemoveAdd", `FN CALL`, {
      error: error
    });
  }
};

module.exports = findRemoveAdd;
