export const CompletedSavedShoppingPathSelected = (shoppingListPath) => ({
    type: 'COMPLETED_SAVED_SHOPPING_LIST_SELECTED',
    AppliedShoppingList: shoppingListPath
});

export const CompletedSavedShoppingPathLoaded = (loadedShoppingListPath) => ({
    type: 'COMPLETED_SAVED_SHOPPING_LIST_LOADED',
    AppliedShoppingList: loadedShoppingListPath
});
