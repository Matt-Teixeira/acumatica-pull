async function checkForNullSystems(system) {
  if (
    system.incoming.customer_id === null ||
    system.incoming.site_id === null ||
    system.incoming.manufacturer === null ||
    system.incoming.modality === null
  ) {
    return true;
  }
  return false;
}

module.exports = {
  checkForNullSystems,
};
