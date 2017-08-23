import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { incrementalSearchEpic } from './incrementalSearchEpic';
import IncrementalSearchServiceMock from './incrementalSearchServiceMock';


describe('incrementalSearchEpic', () => {
    let store;
    const performIncrementalSearchSpy = sinon.spy(IncrementalSearchServiceMock, 'performIncrementalSearch');

    const rootEpic = combineEpics(
        incrementalSearchEpic
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
    it('calls the incrementalSearchService->performIncrementalSearch with the parameters when called', () => {
        //dispatch the incremental search action
        const searchStore = {
            type: 'SEARCH_STORES',
            SearchText: 'Aldi'
        };

        store.dispatch(searchStore);

        expect(IncrementalSearchServiceMock.performIncrementalSearch.calledWith(searchStore))
            .toEqual(true);
    });

    it('dispatches the store search results when a SEARCH_STORES action is dispatched', () => {
        jest.useFakeTimers();

        //dispatch the incremental search action
        const searchStore = {
            type: 'SEARCH_STORES',
            SearchText: 'Aldi'
        };

        store.dispatch(searchStore);
        jest.runAllTimers();

        const actions = store.getActions();
        const actionsJson = JSON.stringify(actions);
        // eslint-disable-next-line max-len
        const expectedActionsJson = '[{"type":"SEARCH_STORES","SearchText":"Aldi"},{"type":"FILTERED_STORE","searchText":"aldi","store":{"Id":"3","Name":"ALDI","Location":"Mount Waverley","Hours":"9am - 9pm","Image":null}},{"type":"FILTERED_STORE","searchText":"aldi","store":{"Id":"6","Name":"ALDI","Location":"Glen Waverley","Hours":"9am - 9pm","Image":null}},{"type":"FILTERED_STORE","searchText":"aldi","store":{"Id":"9","Name":"ALDI","Location":"Chadstone","Hours":"9am - 9pm","Image":null}},{"type":"FILTERED_STORE","searchText":"aldi","store":{"Id":"12","Name":"ALDI","Location":"Flinders","Hours":"9am - 9pm","Image":null}},{"type":"FILTERED_STORE","searchText":"aldi","store":{"Id":"15","Name":"ALDI","Location":"East Malvern","Hours":"9am - 9pm","Image":null}},{"type":"FILTERED_STORE","searchText":"aldi","store":{"Id":"18","Name":"ALDI","Location":"The Glen","Hours":"9am - 9pm","Image":null}}]';
        expect(actionsJson).toEqual(expectedActionsJson);
    });
});
