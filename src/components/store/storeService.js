const StoreService = (ConfigService) => {
    return {
        getStores: () => {
            const syncGalaxyStoresUrl = process.env.syncGalaxyApi + process.env.storesEndPoint;
            console.log(syncGalaxyStoresUrl);
        }

    };
};

export default StoreService;
