async function checkForNullSystems(system) {
  const values = [
    system.id,
    system.customer_id,
    system.site_id,
    system.manufacturer,
    system.modality,
  ];
  const checkForNullUndefined = (element) =>
    element === undefined || element === null;
  return values.some(checkForNullUndefined);
}

async function checkForNullCustomers(customer) {
  const values = [customer.id, customer.name];
  const checkForNullUndefined = (element) =>
    element === undefined || element === null;
  return values.some(checkForNullUndefined);
}

async function checkForNullSites(site) {
  const values = [site.id, site.customer_id, site.name];
  const checkForNullUndefined = (element) =>
    element === undefined || element === null;
  return values.some(checkForNullUndefined);
}

module.exports = {
  checkForNullSystems,
  checkForNullCustomers,
  checkForNullSites,
};
