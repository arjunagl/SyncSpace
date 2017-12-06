const ConfigService = () => ({
    syncGalaxyUrl: process.env.syncGalaxyApi,
    storesEndPoint: process.env.storesEndPoint,
    shoppingListsEndPoint: process.env.shoppingListsEndPoint,
    useMocks: process.env.useMocks
});

export default ConfigService;
