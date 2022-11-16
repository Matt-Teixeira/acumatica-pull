const addCustomer = async (newCustomersArray, dbCustomerIds, equipmentData) => {
    const customerIdArray = []
    for (const systemObj of dbCustomerIds) {
      customerIdArray.push(systemObj.id);
    }
  
    for (let i = 0; i < equipmentData.customers.length; i++) {
      let smeIsInDb = customerIdArray.includes(equipmentData.customers[i].id);
      if (!smeIsInDb) {
        newCustomersArray.push(equipmentData.customers[i]);
      }
    }
};

const addSite = async (newSitesArray, dbSiteIds, equipmentData) => {
    const siteIdArray = []
    for (const systemObj of dbSiteIds) {
      siteIdArray.push(systemObj.id);
    }
  
    for (let i = 0; i < equipmentData.sites.length; i++) {
      let smeIsInDb = siteIdArray.includes(equipmentData.sites[i].id);
      if (!smeIsInDb) {
        newSitesArray.push(equipmentData.sites[i]);
      }
    }
};

const addSystem = async (newSystemsArray, dbSystemsIds, equipmentData) => {
    const systemIdArray = []
    for (const systemObj of dbSystemsIds) {
      systemIdArray.push(systemObj.id);
    }
  
    for (let i = 0; i < equipmentData.systems.length; i++) {
      let smeIsInDb = systemIdArray.includes(equipmentData.systems[i].id);
      if (!smeIsInDb) {
        newSystemsArray.push(equipmentData.systems[i]);
      }
    }
};

module.exports = {
  addCustomer,
  addSite,
  addSystem,
};
