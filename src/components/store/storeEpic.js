import 'rxjs/add/operator/mapTo';
import { SampleStores } from '../../data/sampleData';

export const storeEpic = action$ =>
    action$.ofType('FETCH_STORES')
        .mapTo({
            type: 'FETCHED_STORES',
            Stores: SampleStores
        });
