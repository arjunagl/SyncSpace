import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { completedSavedShoppingEpic } from './CompletedSavedShoppingEpic';
import IncrementalSearchServiceMock from '../common/incrementalSearch/incrementalSearchServiceMock';
import { AppliedShoppingListsSampleData } from '../../data/sampleData';

describe('incrementalSearchEpic', () => {
    let store;
    sinon.spy(IncrementalSearchServiceMock, 'loadSavedCompletedShoppingList');

    const rootEpic = combineEpics(
        completedSavedShoppingEpic
    );

    const epicMiddleWare = createEpicMiddleware(rootEpic,
        {
            dependencies: {
                incrementalSearchService: IncrementalSearchServiceMock
            }
        });

    const mockStore = configureStore([epicMiddleWare]);

    beforeEach(() => {
        const getState = {}; // initial state of the store         
        store = mockStore(getState);
    });

    // eslint-disable-next-line max-len
    it('calls the incrementalSearchService->loadSavedCompletedShoppingList with the parameters when called', () => {
        const loadShoppingList = {
            type: 'COMPLETED_SAVED_SHOPPING_LIST_SELECTED',
            AppliedShoppingList: AppliedShoppingListsSampleData
        };

        store.dispatch(loadShoppingList);

        expect(IncrementalSearchServiceMock.loadSavedCompletedShoppingList.calledWith(loadShoppingList.AppliedShoppingList))
            .toEqual(true);
    });

    it('dispatches the CompletedSavedShoppingPathLoaded action when the CompletedSavedShoppingPathSelected action is dispatched', () => {
        const loadShoppingList = {
            type: 'COMPLETED_SAVED_SHOPPING_LIST_SELECTED',
            AppliedShoppingList: AppliedShoppingListsSampleData
        };

        store.dispatch(loadShoppingList);

        const actions = store.getActions();
        expect(actions[1]).toEqual(expect.objectContaining({
            type: 'COMPLETED_SAVED_SHOPPING_LIST_LOADED'
        }));
    });
});
