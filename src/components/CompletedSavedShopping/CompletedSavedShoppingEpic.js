import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { browserHistory } from 'react-router';
import { CompletedSavedShoppingPathLoaded } from './CompletedSavedShoppingActions';

// eslint-disable-next-line arrow-body-style
export const completedSavedShoppingEpic = (action$, store, { incrementalSearchService }) => {
    // eslint-disable-next-line max-len
    return action$.ofType('COMPLETED_SAVED_SHOPPING_LIST_SELECTED').mergeMap((action) => {
        const loadedShoppingPath = incrementalSearchService.loadSavedCompletedShoppingList(action.AppliedShoppingList);
        //route to the shopping path direction
        // browserHistory.push('/shopping');
        return loadedShoppingPath.map(path => CompletedSavedShoppingPathLoaded(path));
    });
};
