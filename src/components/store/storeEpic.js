import 'rxjs/add/operator/mapTo';
import { SampleStores } from '../../data/sampleData';

export const storeEpic = (action$, store, { StoreService, ConfigService }) => {
    const stoSrv = StoreService(ConfigService);
    const stores = stoSrv.getStores();
    console.log(stores);
    action$.ofType('FETCH_STORES')
        .mapTo({
            type: 'FETCHED_STORES',
            Stores: SampleStores
        });
};
