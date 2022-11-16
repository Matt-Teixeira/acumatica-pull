("use strict");
require("dotenv").config();
const { log } = require("../../../logger");
const {
  removeSite,
  removeCustomer,
  removeSystem,
} = require("../../../utils/remove_db_data");

const proposeRemoveFromDb = async (
  equipmentData,
  systemData,
  customerData,
  siteDate
) => {
  const customers = [];
  const sites = [];
  const systems = [];

  // IN DB BUT NOT IN API

  await removeCustomer(customers, customerData, equipmentData);
  await removeSite(sites, siteDate, equipmentData);
  await removeSystem(systems, systemData, equipmentData);

  return await {
      customers: customers,
      sites: sites,
      systems: systems,
    }

  // IN DB BUT NOT IN API
};

module.exports = proposeRemoveFromDb;
