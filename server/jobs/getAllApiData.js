("use strict");
require("dotenv").config();
const { log } = require("../logger");
const {
  callLogin,
  getApiData,
} = require("../controllers/acumaticaAPI/apiCall");
//const testData = require("../controllers/acumaticaAPI/testData");

// Will run production or development api calls based on process.env.ENV === 'dev' || 'prod'

const runJob = async (acumaticLogin, acumaticEquipEndpoint) => {
  await log("info", "NA", "NA", "runJob", `FN CALL`, {
    acumaticLogin: acumaticLogin,
    acumaticEquipEndpoint: acumaticEquipEndpoint,
  });
  // CALL API
  const cookies = await callLogin(acumaticLogin);
  const equipmentData = await getApiData(acumaticEquipEndpoint, cookies);

  return await equipmentData;
};

const apiCall = async () => {
  // TYPE (info, warn, error), JOBID (NA FOR NOW), SME (NA FOR NOW), FN NAME, FN EVENT, {k/v}s
  await log("info", "NA", "NA", "apiCall", `FN CALL`, {
    LOGGER: process.env.LOGGER,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  });

  let acumaticLogin;
  let acumaticEquipEndpoint;
  // SETUP ENV BASED RESOURCES
  switch (process.env.ENV) {
    case "prod":
      acumaticLogin = process.env.PROD_LOGIN_URI;
      acumaticEquipEndpoint = process.env.PROD_EQUIPMENT_URI;
      break;
    case "dev":
      acumaticLogin = process.env.DEV_LOGIN_URI;
      acumaticEquipEndpoint = process.env.DEV_EQUP_URI;
      break;
    default:
      break;
  }
  const data = runJob(acumaticLogin, acumaticEquipEndpoint);
  return data;
};

module.exports = apiCall;
