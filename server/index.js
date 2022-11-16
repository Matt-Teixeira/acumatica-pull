("use strict");
require("dotenv").config();
const { log } = require("./logger");
const {
  apiCall,
  formatApiData,
  getDelta,
  updateWithAdditions,
  acceptDeltas,
} = require("./jobs");

const onBoot = async () => {
  // TYPE (info, warn, error), JOBID (NA FOR NOW), SME (NA FOR NOW), FN NAME, FN EVENT, {k/v}s
  await log("info", "NA", "NA", "onBoot", `FN CALL`, {});

  const equipmentData = await apiCall();
  const formattedData = await formatApiData(equipmentData);

  const delta = await getDelta(formattedData);

  console.log(delta);

  //await updateWithAdditions(delta.add);

  //await acceptDeltas(delta.deltas);
};

onBoot();
/* 
let deltas = {
  "sites": [
    {
      "site": "C096920",
      "current": {
        "state": "undefined"
      },
      "incoming": {}
    },
    {
      "site": "C0057",
      "current": {
        "state": "undefined",
        "city": "undefined",
        "zip": "undefined"
      },
      "incoming": {}
    },
    {
      "site": "C083123",
      "current": {
        "state": "undefined",
        "zip": "undefined"
      },
      "incoming": {}
    },
    {
      "site": "C082482",
      "current": {
        "state": "undefined",
        "zip": "undefined"
      },
      "incoming": {}
    }
  ],
} */