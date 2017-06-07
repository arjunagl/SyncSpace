import { Observable } from 'rxjs/Rx';
import { SampleStores } from '../../../data/sampleData';

// eslint-disable-next-line arrow-body-style
export const incrementalSearchEpic = action$ => {
    return action$.ofType('SEARCH_STORES').mergeMap(action => {
        const incrementalSearchResults =
            // eslint-disable-next-line max-len
            SampleStores.filter(sampleStore =>
                (sampleStore.Name.toLowerCase().includes(action.SearchText.toLowerCase().trim())) ||
                // eslint-disable-next-line max-len
                (sampleStore.Location.toLowerCase().includes(action.SearchText.toLowerCase().trim())) 
            ).map(sampleStore => ({
                type: 'FILTERED_STORE',
                store: sampleStore
            }));

        return Observable.of(...incrementalSearchResults);
    });
};
