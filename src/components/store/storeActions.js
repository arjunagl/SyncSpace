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

/**
 * 
 * @param {*} shoppingListsToApply 
 * @param {*} storeId 
 */
export const applyShoppingLists = (shoppingListsToApply, storeId) => ({
    type: 'APPLYING_SHOPPING_LISTS',
    ShoppingListsToApply: shoppingListsToApply,
    StoreId: storeId
});
