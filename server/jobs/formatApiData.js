("use strict");
require("dotenv").config();
const { log } = require("../logger");

const formatApiData = async (equipmentData) => {
  await log("info", "NA", "NA", "formatApiData", `FN CALL`);

  // Set up buckets to contain non-duplicate customer, site, and system data
  const formattedSystemData = {
    customerIDs: [],
    customers: [],
    siteIDs: [],
    sites: [],
    systemIDs: [],
    systems: [],
    dupSME: [],
  };

  for await (const system of equipmentData) {
    // modify formattedSystemData object with each iteration
    await filterApiData(system, formattedSystemData);
  }
  return await formattedSystemData;
};

async function filterApiData(systemData, obj) {
  if (!obj.customerIDs.includes(systemData.CustomerContractCustomerID.value)) {
    const customer = {
      id: systemData.CustomerContractCustomerID.value,
      name: systemData.CustomerContractCustomerName.value,
    };
    obj.customerIDs.push(systemData.CustomerContractCustomerID.value);
    obj.customers.push(customer);
  }
  if (!obj.siteIDs.includes(systemData.ServiceContractCustomerID.value)) {
    const site = {
      id: systemData.ServiceContractCustomerID.value,
      name: systemData.ServiceContractCustomerName.value,
      state: systemData.State.value,
      city: systemData.City.value,
      street_address: systemData.AddressLine1.value,
      zip: systemData.PostalCode.value,
    };
    obj.siteIDs.push(systemData.ServiceContractCustomerID.value);
    obj.sites.push(site);
  }
  if (!obj.systemIDs.includes(systemData.EquipmentNbr.value)) {
    const system = {
      id: systemData.EquipmentNbr.value,
      customer_id: systemData.CustomerContractCustomerID.value,
      site_id: systemData.ServiceContractCustomerID.value,
      manufacturer: systemData.Manufacturer.value,
      modality: systemData.Modality.value,
      model: systemData.Model.value,
      serial_number: systemData.SerialNbr.value,
      room: systemData.Room.value,
    };
    obj.systemIDs.push(systemData.EquipmentNbr.value);
    obj.systems.push(system);
  } else {
    obj.dupSME.push(systemData.EquipmentNbr.value);
  }
}

module.exports = formatApiData;
