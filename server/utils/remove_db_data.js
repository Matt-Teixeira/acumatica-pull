const removeCustomer = async (custArray, dbCustomers, equipmentData) => {
  for (let customer of dbCustomers) {
    let foundCustomer = await equipmentData.customers.find((cust) => {
      return cust.id === customer.id;
    });

    if (foundCustomer === undefined) {
      custArray.push(customer.id);
    }
  }
};

const removeSite = async (siteArray, dbSites, equipmentData) => {
  for (let site of dbSites) {
    let foundSite = await equipmentData.sites.find((si) => {
      return si.id === site.id;
    });

    if (foundSite === undefined) {
      siteArray.push(site.id);
    }
  }
};

const removeSystem = async (systemArray, dbSystems, equipmentData) => {
  for (let system of dbSystems) {
    let foundSystem = await equipmentData.systems.find((sys) => {
      return sys.id === system.id;
    });

    if (foundSystem === undefined) {
      systemArray.push(system.id);
    }
  }
};

module.exports = {
  removeCustomer,
  removeSite,
  removeSystem,
};
