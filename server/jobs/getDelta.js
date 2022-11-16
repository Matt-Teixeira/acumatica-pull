("use strict");
require("dotenv").config();
const { log } = require("../logger");
const { systemQuery, customersQuery, sitesQuery } = require("../utils/queries");
const {
  proposeRemoveFromDb,
  proposeAddToDb,
} = require("../controllers/acumaticaAPI/deltas");

const getDelta = async (equipmentData) => {
  const delta = {
    remove: {},
    add: {},
    deltas: {
      customers: []
    }
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

  for (let customer of customerDbData) {
    let foundCustomer = await equipmentData.customers.find((cust) => {
      return cust.id === customer.id;
    });

    if (foundCustomer) {
      console.log("API CUSTOMER: ", foundCustomer);
      console.log("DB CUSTOMER: ", customer);
      for (let prop in foundCustomer) {
        let equalValues = foundCustomer[prop] === customer[prop]
        if(!equalValues) {
          delta.deltas.customers.push(
            {
              current: customer,
              incoming: foundCustomer
            }
          )
        }
      }
    } else {
      //console.log("NOT FOUND IN API: ", customer)
    }
  }

  console.log(delta.deltas.customers)
  //console.log(equipmentData.customers);
  //console.log(customerDbData)
  return;
};

module.exports = getDelta;
