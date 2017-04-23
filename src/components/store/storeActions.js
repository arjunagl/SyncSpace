/**
 * 
 */
export const fetchStores = () => ({
    type: 'FETCH_STORES'
});


/**
 * 
 * @param {*} stores 
 */
export const fetchedStores = stores => ({
    type: 'FETCHED_STORES',
    Stores: stores
});
