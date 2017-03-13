export const fetchStores = () => ({
    type: 'FETCH_STORES'
});

export const fetchedStores = stores => ({
    type: 'FETCHED_STORES',
    Stores: stores
});
