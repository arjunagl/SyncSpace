/**
 * 
 */
export const fetchShoppingLists = () => ({
    type: 'FETCH_SHOPPING_LISTS'
});

/**
 * 
 * @param {*} shoppingLists 
 */
export const fetchedShoppingLists = shoppingLists => ({
    type: 'FETCHED_SHOPPING_LISTS',
    Stores: shoppingLists
});
