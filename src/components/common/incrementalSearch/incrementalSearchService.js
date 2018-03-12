import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import axios from 'axios';

const IncrementalSearchService = (http, Config) => ({
    performIncrementalSearch: (action) => {
        const syncGalaxyStoresUrl = `${Config.syncGalaxyUrl}${Config.storesEndPoint}/${action.SearchText.trim()}`;
        return Observable.fromPromise(axios.get(syncGalaxyStoresUrl)).mergeMap(result => {
            const filteredStoresAsActions = result.data.stores.map(store => ({
                type: 'FILTERED_STORE',
                searchText: action.SearchText.toLowerCase().trim(),
                store
            }));
            // Create the interval to emit an item every second
            return Observable.interval(1000)
                .take(filteredStoresAsActions.length).map(t => filteredStoresAsActions[t]);
        });
    },

    loadSavedCompletedShoppingList: (savedCompletedShopping) => {
        return Observable.from(['a', 'b', 'c', 'd']);
        // console.log(JSON.stringify(savedCompletedShopping));
    }
});

export default IncrementalSearchService;
