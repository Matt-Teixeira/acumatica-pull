("use strict");
require("dotenv").config();
const { log } = require("./logger");
const {
  apiCall,
  formatApiData,
  getDelta,
  updateWithAdditions,
} = require("./jobs");
//const testData = require("../controllers/acumaticaAPI/delta/testData.js");

const onBoot = async () => {
  // TYPE (info, warn, error), JOBID (NA FOR NOW), SME (NA FOR NOW), FN NAME, FN EVENT, {k/v}s
  await log("info", "NA", "NA", "onBoot", `FN CALL`, {});

  const equipmentData = await apiCall();
  const formattedData = await formatApiData(equipmentData);

  const deltas = await getDelta(formattedData);

  //console.log(deltas);

  await updateWithAdditions(deltas.add);
};

onBoot();
