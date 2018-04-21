export const completeShoppingPathAction = (appliedShoppingList) => ({
    type: 'COMPLETE_SHOPPING',
    appliedShoppingList
});

export const saveShoppingPathAction = (appliedShoppingList) => ({
    type: 'SAVE_SHOPPING',
    appliedShoppingList
});

export const completeSaveShoppingPathComplete = () => ({
    type: 'COMPLETE_SAVE_SHOPPING_COMPLETE'
});

