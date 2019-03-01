import 'rxjs/add/operator/mapTo';

export const storeEpic = (action$, store, { StoreService }) => action$.ofType('FETCH_STORES')
    .mergeMap(action =>
        StoreService.getStores()
            .map(response => ({
                type: 'FETCHED_STORES',
                Stores: response.stores
            }))
    );
