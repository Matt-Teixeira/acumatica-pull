("use strict");
require("dotenv").config();
const { log } = require("../logger");
const fs = require("fs").promises;

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
    comboData: {
      customers: [],
      sites: [],
      systems: [],
    },
  };

  for await (const system of equipmentData) {
    // await aggregateBulkData(system, formattedSystemData);
    // modify formattedSystemData object with each iteration
    await filterApiData(system, formattedSystemData);
  }
  const systemsInApi = JSON.stringify(formattedSystemData.systemIDs);
  // console.log(formattedSystemData.systemIDs.length);
  await fs.writeFile("systems.txt", systemsInApi);
  return await formattedSystemData;
};

async function filterApiData(systemData, obj) {
  const customer = {
    id: systemData.CustomerContractCustomerID.value || null,
    name: systemData.CustomerContractCustomerName.value || null,
  };
  if (!obj.customerIDs.includes(systemData.CustomerContractCustomerID.value)) {
    obj.customerIDs.push(systemData.CustomerContractCustomerID.value);
    obj.customers.push(customer);
    obj.comboData.customers.push(customer);
  } else {
    obj.comboData.customers.push(customer);
  }

  const site = {
    id: systemData.ServiceContractCustomerID.value || null,
    customer_id: systemData.CustomerContractCustomerID.value || null,
    name: systemData.ServiceContractCustomerName.value || null,
    state: systemData.State.value || null,
    city: systemData.City.value || null,
    street_address: systemData.AddressLine1.value || null,
    zip: systemData.PostalCode.value || null,
  };
  if (!obj.siteIDs.includes(systemData.ServiceContractCustomerID.value)) {
    obj.siteIDs.push(systemData.ServiceContractCustomerID.value);
    obj.sites.push(site);
    obj.comboData.sites.push(site);
  } else {
    obj.comboData.sites.push(site);
  }
  if (!obj.systemIDs.includes(systemData.EquipmentNbr.value)) {
    // Change manufacturer on the way in. EX: Toshiba America = Toshiba
    const re =
      /(?<manufacturer>(Philips)|(GE)|(Siemens)|(Americomp)|(Toshiba))/;
    let match;
    let manufacturer;
    if (systemData.Manufacturer.value !== undefined) {
      match = systemData.Manufacturer.value.match(re);
      if (match === null) {
        manufacturer = systemData.Manufacturer.value;
      } else {
        manufacturer = match.groups.manufacturer;
      }
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
    obj.comboData.systems.push(system);
  } else {
    obj.dupSME.push(systemData.EquipmentNbr.value);
    obj.comboData.systems.push(system);
  }
}

async function aggregateBulkData(systemData, obj) {
  const re = /(?<manufacturer>(Philips)|(GE)|(Siemens)|(Americomp)|(Toshiba))/;
  let match;
  let manufacturer;
  if (systemData.Manufacturer.value !== undefined) {
    match = systemData.Manufacturer.value.match(re);
    manufacturer = match.groups.manufacturer;
  }

  const bulkData = {
    id: systemData.EquipmentNbr.value || null,
    site_id: systemData.ServiceContractCustomerID.value || null,
    site_name: systemData.ServiceContractCustomerName.value || null,
    customer_id: systemData.CustomerContractCustomerID.value || null,
    customer_name: systemData.CustomerContractCustomerName.value || null,
    manufacturer: manufacturer || null,
    modality: systemData.Modality.value || null,
    model: systemData.Model.value || null,
    serial_number: systemData.SerialNbr.value || null,
    room: systemData.Room.value || null,
    state: systemData.State.value || null,
    city: systemData.City.value || null,
    street_address: systemData.AddressLine1.value || null,
    zip: systemData.PostalCode.value || null,
  };

  obj.comboData.push(bulkData);

  /* let data = await JSON.stringify(bulkData);

  await fs.writeFile(`./db.txt`, data + "\n", {
    encoding: "utf-8",
    flag: "a",
  }); */
}

module.exports = formatApiData;

/*
db query
{
  id: 'SME00874',
  site_id: 'C091405',
  site_name: 'Piedmont Healthcare - Peachtree',
  customer_id: 'C0137',
  customer_name: 'Piedmont HealthCare',
  manufacturer: 'Siemens',
  modality: 'CT',
  model: 'SENSATION 64',
  serial_number: '54722',
  room: null,
  state: 'GA',
  city: 'Atlanta',
  street_address: '1968 Peachtree Road NW',
  zip: '30309'
}

api aggregateBulkData

{
    id: 'SME00847',
    site_id: 'C002100',
    site_name: 'Piedmont Columbus Regional - Midtown',
    customer_id: 'C0137',
    customer_name: 'Piedmont HealthCare',
    manufacturer: 'GE',
    modality: 'CT',
    model: 'LIGHTSPEED VCT',
    serial_number: '706571',
    room: 'PCMEDCT001',
    state: 'GA',
    city: 'Columbus',
    street_address: '710 Center St',
    zip: '31901'
  },

*/
