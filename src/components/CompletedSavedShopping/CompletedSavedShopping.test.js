import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CompletedSavedShoppingPathComponent } from './CompletedSavedShopping';
import { AppliedShoppingListsSampleData, CompletedShoppingListsSampleData, SavedShoppingListsSampleData } from '../../data/sampleData';
import HistoryMock from '../../../jest/historyMock';

describe('<CompletedSavedShoppingPathComponent />', () => {
    let store;

    beforeEach(() => {
        const mockStore = configureStore();
        const getState = {
            syncSpaceReducer: {
                AppliedShoppingLists: AppliedShoppingListsSampleData
            }
        }; // initial state of the store         
        store = mockStore(getState);
    });

    it('renders the component properly', () => {
        const component = shallow(
            <CompletedSavedShoppingPathComponent
                store={store}
                CompletedShoppingLists={CompletedShoppingListsSampleData}
                SavedShoppingLists={SavedShoppingListsSampleData}
            />
        );
        expect(toJson(component)).toMatchSnapshot();
    });

    it('calls \'onShoppingListPathSelected\' when the user selects a shopping path', () => {
        const onShoppingListPathSelected = sinon.spy();

        const shoppingPathWrapper =
            mount(
                <Provider store={store}>
                    <CompletedSavedShoppingPathComponent
                        CompletedShoppingLists={CompletedShoppingListsSampleData}
                        SavedShoppingLists={SavedShoppingListsSampleData}
                        onShoppingListPathSelected={onShoppingListPathSelected}
                        history={HistoryMock}
                    />
                </Provider>
            );
        const completeShoppingbutton = shoppingPathWrapper.find('[key="CompletedList1"]');
        completeShoppingbutton.simulate('click');
        expect(onShoppingListPathSelected.called).toEqual(true);
    });

    // it('Dispatches the action to the store when the user types in something', () => {
    //     jest.useFakeTimers();
    //     const mockStore = configureStore();
    //     const getState = {}; // initial state of the store 
    //     store = mockStore(getState);

    //     const onPerformIncrementalSearchSpy = sinon.spy();

    //     const incrementalSearchWrapper =
    //         mount(
    //             <IncrementalSearchComponent
    //                 onPerformIncrementalSearch={onPerformIncrementalSearchSpy}
    //                 store={store}
    //             />
    //         );


    //     //find the input element
    //     const searchInput = incrementalSearchWrapper.find('#searchInput');
    //     // searchInput.get(0).value = 'David';
    //     searchInput.simulate('change', { target: { value: 'David' } });
    //     jest.runAllTimers();
    //     const actions = store.getActions();
    //     expect(actions[0]).toEqual(JSON.parse('{"type":"SEARCH_STORES","SearchText":"David"}'));
    // });
});
