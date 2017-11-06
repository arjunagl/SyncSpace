const ConfigService = () => {
    return {
        syncGalaxyUrl: process.env.syncGalaxyApi,
        storesEndPoint: process.env.storesEndPoint
    };
};

export default ConfigService;
