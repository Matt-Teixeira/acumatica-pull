const pgPool = require("../db/pg-pool");

const createTables = async () => {
  await pgPool.query("DROP TABLE IF EXISTS customers CASCADE");
  await pgPool.query("DROP TABLE IF EXISTS sites CASCADE");
  await pgPool.query("DROP TABLE IF EXISTS systems CASCADE");
  await pgPool.query(
    "CREATE TABLE customers(id TEXT PRIMARY KEY, name TEXT NOT NULL)"
  );
  await pgPool.query(
    "CREATE TABLE sites(id TEXT PRIMARY KEY, customer_id TEXT, name TEXT, state VARCHAR(10), city TEXT, street_address TEXT, zip VARCHAR(12), contract_status TEXT, CONSTRAINT fk_customers FOREIGN KEY(customer_id) REFERENCES customers(id))"
  );
  await pgPool.query(
    "CREATE TABLE systems(id TEXT PRIMARY KEY, site_id TEXT, manufacturer TEXT, modality TEXT, model TEXT, serial_number TEXT, room TEXT, CONSTRAINT fk_sites FOREIGN KEY(site_id) REFERENCES sites(id))"
  );
  return;
};

const dropTables = async () => {
  await pgPool.query("DROP TABLE IF EXISTS customers CASCADE");
  await pgPool.query("DROP TABLE IF EXISTS sites CASCADE");
  await pgPool.query("DROP TABLE IF EXISTS systems CASCADE");
  return;
};

module.exports = {
  createTables,
  dropTables,
};
