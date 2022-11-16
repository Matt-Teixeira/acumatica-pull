("use strict");
require("dotenv").config();
const { log } = require("../../../logger");
const {
  addSystem,
  addCustomer,
  addSite,
} = require("../../../utils/add_db_data");

const proposeAddToDb = async (
  equipmentData,
  systemData,
  customerData,
  siteDate
) => {
  const customers = [];
  const sites = [];
  const systems = [];

  // IN API BUT NOT IN DB

  // turn system id form db into array of ids.

  await addSystem(systems, systemData, equipmentData);
  await addCustomer(customers, customerData, equipmentData);
  await addSite(sites, siteDate, equipmentData);

  // IN API BUT NOT IN DB

  return await {
    customers: customers,
    sites: sites,
    systems: systems,
  };
};

module.exports = proposeAddToDb;
