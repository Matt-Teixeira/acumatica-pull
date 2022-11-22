("use strict");
require("dotenv").config();
const { log } = require("../logger");
const { systemQuery, customersQuery, sitesQuery } = require("../utils/queries");
const { bulkDbQuery } = require("../utils/queries");

async function detailedDelta(equipmentData) {
  const distinctManufacturers = [
    "Siemens",
    "GE",
    "Philips",
    "Toshiba",
    "Americomp",
  ];

  await log("info", "NA", "NA", "getDelta", `FN CALL`);
  const delta = {
    deltas: [],
  };
  const dbData = await sitesQuery();
  //console.log(dbData);
  // console.log(equipmentData.comboData.sites);

  //compare site data;
  // site = API data
  for await (const site of equipmentData.comboData.sites) {
    let matchedSite = await dbData.find((si) => {
      return si.id === site.id;
    });

    if (matchedSite) {
      let deltaObj = {
        site_id: matchedSite.id,
        current: {},
        incoming: {},
      };
      for (const prop in matchedSite) {
        if (distinctManufacturers.includes(site[prop])) {
          break;
        }
        let equalValues = matchedSite[prop] === site[prop];
        if (!equalValues) {
          deltaObj.incoming[prop] = site[prop];
          deltaObj.current[prop] = matchedSite[prop];
        }
      }
      if (Object.keys(deltaObj.current).length > 0) {
        delta.deltas.push(deltaObj);
      }
    }
  }
  console.log(delta.deltas);
}

module.exports = detailedDelta;
