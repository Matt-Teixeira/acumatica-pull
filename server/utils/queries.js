const pgPool = require("../db/pg-pool");

const bulkDbQuery = async () => {
  const data = await pgPool.query(
    "SELECT systems.id, systems.site_id, sites.name AS site_name, systems.customer_id, customers.name AS customer_name, systems.manufacturer, systems.modality, systems.model, systems.serial_number, systems.room, sites.state, sites.city, sites.street_address, sites.zip FROM systems INNER JOIN sites ON systems.site_id = sites.id INNER JOIN customers ON sites.customer_id = customers.id"
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

module.exports = {
  bulkDbQuery,
  customersQuery,
  sitesQuery,
  systemQuery,
};
