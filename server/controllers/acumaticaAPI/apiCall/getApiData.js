("use strict");
require("dotenv").config();
const { log } = require("../../../logger");
const { default: axios } = require("axios");
const parseCookie = require("../../../utils/parseCookie");

const getApiData = async (acumaticEndpoint, loginData) => {
  await log("info", "NA", "NA", "getApiData", `FN CALL`, {
    acumaticEndpoint: acumaticEndpoint,
  });
  try {
    const newCookie = parseCookie(loginData);

    const headers = {
      "Content-Type": "application/json",
      Cookie: newCookie,
    };

    const res = await axios.put(acumaticEndpoint, {}, { headers });
    await log("info", "NA", "NA", "getApiData", `FN DETAILS`, {
      status: res.status,
      data: res.headers,
    });
    /* let data = res.data.EquipmentRTTDetails.json();
    api_cache.write(data); */
    return res.data.EquipmentRTTDetails
  } catch (error) {
    await log("error", "NA", "NA", "getApiData", `FN CATCH`, {
      error: error,
    });
  }
};

module.exports = getApiData;
