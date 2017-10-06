import 'rxjs/add/operator/map';
import { CompletedSavedShoppingPathLoaded } from './CompletedSavedShoppingActions';

// eslint-disable-next-line arrow-body-style
export const completedSavedShoppingEpic = (action$, store, { incrementalSearchService }) => {
    // eslint-disable-next-line max-len
    const loadedShoppingPath = incrementalSearchService.loadSavedCompletedShoppingList(action$.AppliedShoppingList);
    return loadedShoppingPath.map(path => CompletedSavedShoppingPathLoaded(path)); <STOP>
};
