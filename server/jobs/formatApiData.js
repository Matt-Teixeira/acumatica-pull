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
      id: systemData.CustomerContractCustomerID.value || null,
      name: systemData.CustomerContractCustomerName.value || null,
    };
    obj.customerIDs.push(systemData.CustomerContractCustomerID.value);
    obj.customers.push(customer);
  }
  if (!obj.siteIDs.includes(systemData.ServiceContractCustomerID.value)) {
    const site = {
      id: systemData.ServiceContractCustomerID.value || null,
      customer_id: systemData.CustomerContractCustomerID.value || null,
      name: systemData.ServiceContractCustomerName.value || null,
      state: systemData.State.value || null,
      city: systemData.City.value || null,
      street_address: systemData.AddressLine1.value || null,
      zip: systemData.PostalCode.value || null,
    };
    obj.siteIDs.push(systemData.ServiceContractCustomerID.value);
    obj.sites.push(site);
  }
  if (!obj.systemIDs.includes(systemData.EquipmentNbr.value)) {
    // Change manufacturer in the way in. EX: Toshiba America = Toshiba
    const re =
      /(?<manufacturer>(Philips)|(GE)|(Siemens)|(Americomp)|(Toshiba))/;
    let match;
    let manufacturer;
    if(systemData.Manufacturer.value !== undefined) {
      match = systemData.Manufacturer.value.match(re);
      manufacturer = match.groups.manufacturer
    }
    
    const system = {
      id: systemData.EquipmentNbr.value || null,
      customer_id: systemData.CustomerContractCustomerID.value || null,
      site_id: systemData.ServiceContractCustomerID.value || null,
      manufacturer: manufacturer || null,
      modality: systemData.Modality.value || null,
      model: systemData.Model.value || null,
      serial_number: systemData.SerialNbr.value || null,
      room: systemData.Room.value || null,
    };
    obj.systemIDs.push(systemData.EquipmentNbr.value);
    obj.systems.push(system);
  } else {
    obj.dupSME.push(systemData.EquipmentNbr.value);
  }
}

module.exports = formatApiData;
