import { Observable } from 'rxjs/Rx';
import { SampleStores, CompletedShoppingListsSampleData, SavedShoppingListsSampleData } from '../../../data/sampleData';

export default class IncrementalSearchServiceMock {

    static performIncrementalSearch(action) {
        const incrementalSearchResults =
            // eslint-disable-next-line max-len
            SampleStores.filter(sampleStore =>
                // eslint-disable-next-line max-len
                (sampleStore.Name.toLowerCase().includes(action.SearchText.toLowerCase().trim())) ||
                // eslint-disable-next-line max-len
                (sampleStore.Location.toLowerCase().includes(action.SearchText.toLowerCase().trim()))
            ).map(sampleStore => ({
                type: 'FILTERED_STORE',
                searchText: action.SearchText.toLowerCase().trim(),
                store: sampleStore
            }));

        //Create the interval to emit an item every second
        return Observable.interval(1000)
            .take(incrementalSearchResults.length).map(t => incrementalSearchResults[t]);
    }

    static loadSavedCompletedShoppingList(savedCompletedShopping) {
        return Observable.merge(Observable.from(CompletedShoppingListsSampleData), Observable.from(SavedShoppingListsSampleData))
            .first(shoppingList => shoppingList.Name === savedCompletedShopping.Name);
    }
}
