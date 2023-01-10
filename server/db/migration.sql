BEGIN;

ALTER TABLE public.hospital_networks
RENAME TO customers;

ALTER TABLE public.network_sites
RENAME TO sites;

ALTER TABLE public.machines
RENAME TO systems;

ALTER TABLE customers
ALTER COLUMN name TYPE TEXT;


ALTER TABLE sites
RENAME COLUMN network_id TO customer_id;

ALTER TABLE sites
ALTER COLUMN state TYPE VARCHAR(4);

ALTER TABLE sites
DROP CONSTRAINT fk_network_id;

ALTER TABLE sites
ADD CONSTRAINT fk_customers 
FOREIGN KEY (customer_id) 
REFERENCES customers(id); 

ALTER TABLE systems
ADD COLUMN ip_address INET;

ALTER TABLE systems
DROP CONSTRAINT fk_site_id;

ALTER TABLE systems
ADD CONSTRAINT fk_sites
FOREIGN KEY (site_id) 
REFERENCES sites(id);

COMMIT;
ROLLBACK;


BEGIN;

ALTER TABLE systems
ADD COLUMN customer_id TEXT;

COMMIT;
ROLLBACK;