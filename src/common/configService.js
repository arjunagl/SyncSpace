const ConfigService = () => ({
    syncGalaxyUrl: process.env.syncGalaxyApi,
    storesEndPoint: process.env.storesEndPoint,
    useMocks: process.env.useMocks
});

export default ConfigService;
