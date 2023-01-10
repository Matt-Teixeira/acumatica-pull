("use strict");
require("dotenv").config();
const fs = require("fs").promises;
const { log } = require("../logger");
const date_time = require("../utils/dateFormat");

async function updateWithAdditionsQueryStr(deltas) {
  let date = date_time();
  try {
    await log("info", "NA", "NA", "updateWithAdditionsQueryStr", `FN CALL`);
    for await (customer of deltas.customers) {
      const migrationString =
        `INSERT INTO customers(id, name) VALUES('${customer.id}', '${customer.name}');` +
        "\n";
      await fs.writeFile(
        `./migrationQueries/additions/proposed/additionQueries${date}.txt`,
        migrationString,
        { encoding: "utf-8", flag: "a" }
      );
    }

    for await (site of deltas.sites) {
      const migrationString =
        `INSERT INTO sites(id, customer_id, name, state, city, street_address, zip) VALUES('${site.id}', '${site.customer_id}', '${site.name}', '${site.state}', '${site.city}', '${site.street_address}', '${site.zip}');` +
        "\n";
      await fs.writeFile(
        `./migrationQueries/additions/proposed/additionQueries${date}.txt`,
        migrationString,
        { encoding: "utf-8", flag: "a" }
      );
    }

    for await (system of deltas.systems) {
      const migrationString =
        `INSERT INTO systems(id, customer_id, site_id, manufacturer, modality, model, serial_number, room) VALUES('${system.id}', '${system.customer_id}', '${system.site_id}', '${system.manufacturer}', '${system.modality}', '${system.model}', '${system.serial_number}', '${system.room}');` +
        "\n";
      await fs.writeFile(
        `./migrationQueries/additions/proposed/additionQueries${date}.txt`,
        migrationString,
        { encoding: "utf-8", flag: "a" }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateWithAdditionsQueryStr;
