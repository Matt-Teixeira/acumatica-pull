("use strict");
require("dotenv").config();
const { log } = require("../../logger");
const fs = require("fs").promises;

async function formatApiDataAcuTable(equipmentData) {
  try {
    await log("info", "NA", "NA", "formatApiDataAcuTable", `FN CALL`);
    const formattedSystemData = [];

    for await (let system of equipmentData) {
      let data = {
        equipmentnbr: system.EquipmentNbr.value,
        customercontractcustomerid: system.CustomerContractCustomerID.value,
        customercontractcustomername: system.CustomerContractCustomerName.value,
        servicecontractcustomerid: system.ServiceContractCustomerID.value,
        servicecontractcustomername: system.ServiceContractCustomerName.value,
        state: system.State.value,
        city: system.City.value,
        addressline1: system.AddressLine1.value,
        postalcode: system.PostalCode.value,
        manufacturer: system.Manufacturer.value,
        modality: system.Modality.value,
        model: system.Model.value,
        serialnbr: system.SerialNbr.value,
        room: system.Room.value,
      };
      formattedSystemData.push(data);
    }
    return formattedSystemData;
  } catch (error) {
    await log("error", "NA", "NA", "formatApiDataAcuTable", `FN CALL`, {
      error: error.message,
    });
  }
}

module.exports = formatApiDataAcuTable;
`
equipmentnbr: 'SME00852',
    customercontractcustomerid: 'C0137',
    customercontractcustomername: 'Piedmont HealthCare',
    servicecontractcustomerid: 'C002100',
    servicecontractcustomername: 'Piedmont Columbus Regional - Midtown',
    state: 'GA',
    city: 'Columbus',
    addressline1: '710 Center St',
    postalcode: '31901',
    manufacturer: 'Siemens Healthineers',
    modality: 'CV/IR',
    model: 'ARTISZEECEILING',
    serialnbr: '147799',
    room:
    `
