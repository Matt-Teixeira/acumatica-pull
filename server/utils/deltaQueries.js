("use strict");
require("dotenv").config();
const { log } = require("../logger");
const pgPool = require("../db/pg-pool");

async function updateSiteDeltas(site, key) {
  try {
    let queryString;
    let values = [];
    switch (key) {
      case "customer_id":
        queryString = "UPDATE sites SET customer_id = $1 WHERE id = $2";
        values = [site.incoming[key], site.site_id];
        break;
      case "name":
        queryString = "UPDATE sites SET name = $1 WHERE id = $2";
        values = [site.incoming[key], site.site_id];
        break;
      case "state":
        queryString = "UPDATE sites SET state = $1 WHERE id = $2";
        values = [site.incoming[key], site.site_id];
        break;
      case "city":
        queryString = "UPDATE sites SET city = $1 WHERE id = $2";
        values = [site.incoming[key], site.site_id];
        break;
      case "street_address":
        queryString = "UPDATE sites SET street_address = $1 WHERE id = $2";
        values = [site.incoming[key], site.site_id];
        break;
      case "zip":
        queryString = "UPDATE sites SET zip = $1 WHERE id = $2";
        values = [site.incoming[key], site.site_id];
        break;
      default:
        break;
    }

    await pgPool.query(queryString, values);

    return true;
  } catch (error) {
    await log("error", "NA", "NA", "updateSiteDeltas", `FN CALL`, {
      error: error.message,
    });
  }
}

async function updateCustomerDeltas(customer, key) {
  try {
    const queryString = "UPDATE customers SET name = $1 WHERE id = $2";
    const values = [customer.incoming[key], customer.customer_id];

    await pgPool.query(queryString, values);

    return true;
  } catch (error) {
    await log("error", "NA", "NA", "updateCustomerDeltas", `FN CALL`, {
      error: error.message,
    });
  }
}
/* 
customer_id
site_id
manufacturer
modality
model
serial_number
room 
*/
async function updateSystemDeltas(system, key) {
  try {
    let queryString;
    let values = [];
    switch (key) {
      case "site_id":
        queryString = "UPDATE systems SET site_id = $1 WHERE id = $2";
        values = [system.incoming[key], system.system_id];
        break;
      case "customer_id":
        queryString = "UPDATE systems SET customer_id = $1 WHERE id = $2";
        values = [system.incoming[key], system.system_id];
        break;
      case "manufacturer":
        queryString = "UPDATE systems SET manufacturer = $1 WHERE id = $2";
        values = [system.incoming[key], system.system_id];
        break;
      case "modality":
        queryString = "UPDATE systems SET modality = $1 WHERE id = $2";
        values = [system.incoming[key], system.system_id];
        break;
      case "model":
        queryString = "UPDATE systems SET model = $1 WHERE id = $2";
        values = [system.incoming[key], system.system_id];
        break;
      case "serial_number":
        queryString = "UPDATE systems SET serial_number = $1 WHERE id = $2";
        values = [system.incoming[key], system.system_id];
        break;
      case "room":
        queryString = "UPDATE systems SET room = $1 WHERE id = $2";
        values = [system.incoming[key], system.system_id];
        break;
      default:
        break;
    }

    await pgPool.query(queryString, values);

    return true;
  } catch (error) {
    await log("error", "NA", "NA", "updateSystemDeltas", `FN CALL`, {
      error: error.message,
    });
  }
}

async function updateAcuTable(delta, key) {
  try {
    let queryString;
    let values = [];
    switch (key) {
      case "customercontractcustomerid":
        queryString = "UPDATE acumatica_systems SET customercontractcustomerid = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "customercontractcustomername":
        queryString = "UPDATE acumatica_systems SET customercontractcustomername = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "servicecontractcustomerid":
        queryString = "UPDATE acumatica_systems SET servicecontractcustomerid = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "servicecontractcustomername":
        queryString = "UPDATE acumatica_systems SET servicecontractcustomername = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "state":
        queryString = "UPDATE acumatica_systems SET state = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "city":
        queryString = "UPDATE acumatica_systems SET city = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "addressline1":
        queryString = "UPDATE acumatica_systems SET addressline1 = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "postalcode":
        queryString = "UPDATE acumatica_systems SET postalcode = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "manufacturer":
        queryString = "UPDATE acumatica_systems SET manufacturer = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "modality":
        queryString = "UPDATE acumatica_systems SET modality = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "model":
        queryString = "UPDATE acumatica_systems SET model = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "serialnbr":
        queryString = "UPDATE acumatica_systems SET serialnbr = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      case "room":
        queryString = "UPDATE acumatica_systems SET room = $1 WHERE equipmentnbr = $2";
        values = [delta.deltas[key], delta.system];
        break;
      default:
        break;
    }

    await pgPool.query(queryString, values);

    return true;
  } catch (error) {
    await log("error", "NA", "NA", "updateAcuTable", `FN CALL`, {
      error: error.message,
    });
  }
}

module.exports = {
  updateSiteDeltas,
  updateCustomerDeltas,
  updateSystemDeltas,
  updateAcuTable,
};
