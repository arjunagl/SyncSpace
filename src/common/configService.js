const ConfigService = () => ({
    syncGalaxyUrl: process.env.syncGalaxyApi,
    storesEndPoint: process.env.storesEndPoint,
    shoppingListsEndPoint: process.env.shoppingListsEndPoint,
    shoppingPathsEndPoint: process.env.shoppingPathsEndPoint,
    usersEndPoint: process.env.usersEndPoint,
    useMocks: process.env.useMocks
});

export default ConfigService;
