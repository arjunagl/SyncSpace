import 'rxjs/add/operator/mapTo';

export const shoppingListEpic = (action$, store, { ShoppingListsService }) =>
    action$.ofType('FETCH_SHOPPING_LISTS').mergeMap((action) => ShoppingListsService.getShoppingLists(store.getState().syncSpaceReducer.displayName)
        .map(response => ({
            type: 'FETCHED_SHOPPING_LISTS',
            ShoppingLists: response.shoppingLists
        })
        ));
