const { log } = require("../logger");
const pgPool = require("../db/pg-pool");

const bulkDbQuery = async () => {
  const data = await pgPool.query(
    "SELECT systems.id, systems.site_id, sites.name AS site_name, systems.customer_id, customers.name AS customer_name, systems.manufacturer, systems.modality, systems.model, systems.serial_number, systems.room, sites.state, sites.city, sites.street_address, sites.zip FROM systems INNER JOIN sites ON systems.site_id = sites.id INNER JOIN customers ON sites.customer_id = customers.id"
  );
  return data.rows;
};

const bulkDbAcuQuery = async () => {
  const data = await pgPool.query(
    "SELECT * FROM acumatica_systems"
  );
  return data.rows;
};

const customersQuery = async () => {
  const data = await pgPool.query(`SELECT * FROM customers`);
  return data.rows;
};

const sitesQuery = async () => {
  const data = await pgPool.query(`SELECT * FROM sites`);
  return data.rows;
};

const systemQuery = async () => {
  const data = await pgPool.query(
    `SELECT id, customer_id, site_id, manufacturer, modality, model, serial_number, room FROM systems`
  );
  return data.rows;
};

const acumaticaTableInsert = async (values) => {
  try {
    await log("info", "NA", "NA", "acumaticaTableInsert", `FN CALL`, {
      values,
    });
    const queryStr =
      "INSERT INTO acumatica_systems(EquipmentNbr, CustomerContractCustomerID, CustomerContractCustomerName, ServiceContractCustomerID, ServiceContractCustomerName, State, City, AddressLine1, PostalCode, Manufacturer, Modality, Model, SerialNbr, Room) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)";
    await pgPool.query(queryStr, values);
  } catch (error) {
    await log("error", "NA", "NA", "acumaticaTableInsert", `FN CALL`, {
      error: error.message,
    });
  }
};

module.exports = {
  bulkDbQuery,
  bulkDbAcuQuery,
  customersQuery,
  sitesQuery,
  systemQuery,
  acumaticaTableInsert,
};
