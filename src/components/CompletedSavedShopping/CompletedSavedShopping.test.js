import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CompletedSavedShoppingPathComponent } from './CompletedSavedShopping';
import CompletedSavedShoppingContainer, { shoppingPathcontainerQuery } from './CompletedSavedShoppingContainer';
import { AppliedShoppingListsSampleData, CompletedShoppingListsSampleData, SavedShoppingListsSampleData } from '../../data/sampleData';
import HistoryMock from '../../../jest/historyMock';
import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';

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
        const completeShoppingbutton = shoppingPathWrapper.find('#CompletedList1');
        completeShoppingbutton.simulate('click');
        expect(onShoppingListPathSelected.called).toEqual(true);
    });

    it.only('Dispatches the action to the store when the use selects a saved shopping list', () => {
        // jest.useFakeTimers();

        console.log('testing');
        const mockStore = configureStore();
        const getState = {
            syncSpaceReducer: {
                CompletedShoppingLists: CompletedShoppingListsSampleData,
                SavedShoppingLists: SavedShoppingListsSampleData
            }
        }; // initial state of the store 
        store = mockStore(getState);

        const mocks = [
            {
                request: {
                    query: shoppingPathcontainerQuery,
                    variables: {}
                },
                result: {
                    data: {
                        current_user: {
                            id: 1,
                            first_name: 'Foo',
                            last_name: 'Bar',
                            email: 'foo@example.com'
                        },
                        ShoppingPaths: 'Hello world'
                    }
                }
            }
        ];

        const variables = { cache: false };

        const shoppingPathWrapper =
            mount(
                <MockedProvider
                    removeTypename
                    mocks={[
                        {
                            request: { query: shoppingPathcontainerQuery, variables },
                            result: { data: mocks }
                        },
                    ]}
                >
                    <CompletedSavedShoppingContainer
                        store={store}
                        history={HistoryMock}
                        setTitle={(windowTitle, pageTitle) => {
                            console.log(windowTitle);
                            console.log(pageTitle);
                        }}
                    />
                </MockedProvider >
            );

        const completeShoppingbutton = shoppingPathWrapper.find('#CompletedList1');
        completeShoppingbutton.simulate('click');

        const actions = store.getActions();
        const completedSampleDataList = CompletedShoppingListsSampleData.find(completedList => completedList.Name === 'CompletedList1');
        expect(actions[0]).toEqual(CompletedSavedShoppingPathSelected(completedSampleDataList));
    });
});
