const ConfigService = () => ({
    syncGalaxyUrl: process.env.syncGalaxyApi,
    storesEndPoint: process.env.storesEndPoint,
    shoppingListsEndPoint: process.env.shoppingListsEndPoint,
    shoppingPathsEndPoint: process.env.shoppingPathsEndPoint,
    useMocks: process.env.useMocks
});

export default ConfigService;
