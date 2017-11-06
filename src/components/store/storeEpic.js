import 'rxjs/add/operator/mapTo';
import { SampleStores } from '../../data/sampleData';

export const storeEpic = (action$, store, { StoreService }) => {
    return action$.ofType('FETCH_STORES')
        .mergeMap(action =>
            StoreService.getStores()
                .map(response => ({
                    type: 'FETCHED_STORES',
                    Stores: response.stores
                }))
        );
};
