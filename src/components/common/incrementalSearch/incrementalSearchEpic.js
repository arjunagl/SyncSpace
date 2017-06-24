import { Observable } from 'rxjs/Rx';
import { SampleStores } from '../../../data/sampleData';


// eslint-disable-next-line arrow-body-style
export const incrementalSearchEpic = (action$, store, { incrementalSearchService }) => {
    // return action$.ofType('SEARCH_STORES').mergeMap(action => {
    //     const incrementalSearchResults =
    //         // eslint-disable-next-line max-len
    //         SampleStores.filter(sampleStore =>
    //             (sampleStore.Name.toLowerCase().includes(action.SearchText.toLowerCase().trim())) ||
    //             // eslint-disable-next-line max-len
    //             (sampleStore.Location.toLowerCase().includes(action.SearchText.toLowerCase().trim()))
    //         ).map(sampleStore => ({                
    //             type: 'FILTERED_STORE',
    //             searchText: action.SearchText.toLowerCase().trim(),
    //             store: sampleStore
    //         }));

    //     //Create the interval to emit an item every second
    //     return Observable.interval(1000)
    //         .take(incrementalSearchResults.length).map(t => incrementalSearchResults[t]);
    // });

    // eslint-disable-next-line max-len
    return action$.ofType('SEARCH_STORES').mergeMap((action) =>
        incrementalSearchService.performIncrementalSearch(action)
    );
};
