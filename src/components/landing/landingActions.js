/**
 * 
 * @param {*} shoppingListsToApply 
 * @param {*} storeId 
 */
export const applyShoppingLists = (shoppingListsToApply, storeId) => ({
    type: 'APPLY_SHOPPING_LISTS',
    ShoppingListsToApply: shoppingListsToApply,
    StoreId: storeId
});
