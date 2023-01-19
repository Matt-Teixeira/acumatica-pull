DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS sites CASCADE;
DROP TABLE IF EXISTS systems CASCADE;

CREATE TABLE customers(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE sites(
    id TEXT PRIMARY KEY,
    customer_id TEXT,
    name TEXT,
    state VARCHAR(2),
    city TEXT,
    street_address TEXT,
    zip VARCHAR(10),
    contract_status TEXT,
    CONSTRAINT fk_customers
        FOREIGN KEY(customer_id)
            REFERENCES customers(id)
);

CREATE TABLE systems(
    id TEXT PRIMARY KEY,
    site_id TEXT,
    manufacturer TEXT,
    modality TEXT,
    model TEXT,
    serial_number TEXT,
    room TEXT,
    CONSTRAINT fk_sites
        FOREIGN KEY(site_id)
            REFERENCES sites(id)
);

CREATE TABLE acumatica_systems(
    equipmentNbr TEXT PRIMARY KEY,
    customercontractcustomerID TEXT,
    customercontractcustomerName TEXT,
    servicecontractcustomerID TEXT,
    servicecontractcustomername TEXT,
    state VARCHAR(2),
    city TEXT,
    addressline1 TEXT,
    postalcode TEXT,
    manufacturer TEXT,
    modality TEXT,
    model TEXT,
    serialnbr TEXT,
    room TEXT
);



/* Queries */
SELECT * FROM customers;
SELECT * FROM sites;
SELECT systems.id AS sme, systems.modality, systems.model, systems.manufacturer FROM systems ORDER BY id ASC;

SELECT customers.id, customers.customer_name AS customer, sites.site_name AS Site, sites.id FROM customers JOIN sites ON customers.id = sites.customer_id ORDER BY customers.customer_name ASC;
SELECT sites.site_name AS site_name, systems.id AS sme, systems.modality, systems.model, systems.manufacturer FROM sites JOIN systems ON sites.id = systems.site_id ORDER BY site_name ASC;
SELECT sites.id, sites.site_name FROM sites ORDER BY sites.site_name ASC;

SELECT * FROM customers INNER JOIN sites ON customers.id = sites.customer_id INNER JOIN systems ON sites.id = systems.site_id WHERE customers.id = 'SME00882';
SELECT customers.id, customers.customer_name AS customer, sites.id AS site_id, sites.site_name, systems.id AS system_sme FROM customers INNER JOIN sites ON customers.id = sites.customer_id INNER JOIN systems ON sites.id = systems.site_id WHERE customers.id = 'C0051';
SELECT * FROM systems INNER JOIN sites ON systems.site_id = sites.id Where systems.id = 'SME00346';

SELECT customers.id, customers.customer_name AS customer, sites.id AS site_id, sites.site_name, systems.id AS system_sme FROM customers INNER JOIN sites ON customers.id = sites.customer_id INNER JOIN systems ON sites.id = systems.site_id WHERE customers.id = 'C027932';

CREATE FUNCTION get_sme_count(customer_id_var TEXT)
returns int
language plpgsql
as 
$$
declare
    sme_count integer;
begin
    SELECT COUNT(*)
    INTO sme_count
    FROM customers
    INNER JOIN sites ON customers.id = sites.customer_id
    INNER JOIN systems ON sites.id = systems.site_id
    WHERE customers.id = customer_id_var;

    return sme_count;
end;
$$;