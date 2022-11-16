const pgPool = require("../db/pg-pool");

const bulkDbQuery = async () => {
  const data = await pgPool.query(
    "SELECT customers.id, customers.name AS customer_name, sites.id, sites.name AS site_name, * FROM customers INNER JOIN sites ON customers.id = sites.customer_id INNER JOIN systems ON sites.id = systems.site_id"
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
  const data = await pgPool.query(`SELECT id, customer_id, site_id, manufacturer, modality, model, serial_number, room FROM systems`);
  return data.rows;
};

module.exports = {
  bulkDbQuery,
  customersQuery,
  sitesQuery,
  systemQuery
};
