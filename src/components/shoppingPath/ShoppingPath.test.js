import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ShoppingPathComponentContainer, { ShoppingPathComponent } from './ShoppingPath';
import { AppliedShoppingListsSampleData } from '../../data/sampleData';
import { completeShoppingPathAction } from './ShoppingPathActions';
import HistoryMock from '../../../jest/historyMock';


// setup file

configure({ adapter: new Adapter() });

describe('<ShoppingPathComponent />', () => {
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
            <ShoppingPathComponent
                store={store}
                AppliedShoppingLists={AppliedShoppingListsSampleData}
            />
        );
        expect(toJson(component)).toMatchSnapshot();
    });

    it('calls \'onCompleteShoppingClicked\' when the user clicks the button to complete shopping', () => {
        const onCompleteShoppingClickedSpy = sinon.spy();
        const onSaveShoppingClickedSpy = sinon.spy();

        const shppingPathWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponent
                        AppliedShoppingLists={AppliedShoppingListsSampleData}
                        onCompleteShoppingClicked={onCompleteShoppingClickedSpy}
                        onSaveShoppingClicked={onSaveShoppingClickedSpy}
                        history={HistoryMock}
                    />
                </Provider>
            );

        shppingPathWrapper.hostNodes();
        const completeShoppingbutton = shppingPathWrapper.find('#completeShoppingbutton').hostNodes();
        completeShoppingbutton.simulate('click');
        expect(onCompleteShoppingClickedSpy.called).toEqual(true);
    });

    it('calls \'onSaveShoppingClicked\' when the user clicks the button to save shopping', () => {
        const onCompleteShoppingClickedSpy = sinon.spy();
        const onSaveShoppingClickedSpy = sinon.spy();

        const shppongPathWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponent
                        AppliedShoppingLists={AppliedShoppingListsSampleData}
                        onCompleteShoppingClicked={onCompleteShoppingClickedSpy}
                        onSaveShoppingClicked={onSaveShoppingClickedSpy}
                        history={HistoryMock}
                    />
                </Provider>
            );

        const completeShoppingbutton = shppongPathWrapper.find('#saveShoppingbutton').hostNodes();
        completeShoppingbutton.simulate('click');
        expect(onSaveShoppingClickedSpy.called).toEqual(true);
    });

    it('dispatches the completeShoppingPath action when complete shopping is clicked', () => {
        const shoppingPathContainerWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponentContainer
                        history={HistoryMock}
                    />
                </Provider>
            );

        const completeShoppingbutton = shoppingPathContainerWrapper.find('#completeShoppingbutton').hostNodes();
        completeShoppingbutton.simulate('click');
        const actions = store.getActions();
        expect(actions[0]).toEqual(completeShoppingPathAction(AppliedShoppingListsSampleData));
    });

    it('marks an item as picked up when the user selects an item', () => {
        const onCompleteShoppingClickedSpy = sinon.spy();
        const onSaveShoppingClickedSpy = sinon.spy();

        const shoppingPathWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponent
                        AppliedShoppingLists={AppliedShoppingListsSampleData}
                        onCompleteShoppingClicked={onCompleteShoppingClickedSpy}
                        onSaveShoppingClicked={onSaveShoppingClickedSpy}
                    />
                </Provider>
            );

        //Select a shopping list item
        const shoppingItem = shoppingPathWrapper.find('input[type=\'checkbox\']#sp4');
        shoppingItem.simulate('change', { target: { checked: true, id: 'sp4', dataset: { id: '4' } } });

        const markedItem = AppliedShoppingListsSampleData.ShoppingItems.find(si => si.Item.Id === '4');
        expect(markedItem.PickedUp).toBe(true);
    });

    it('marks an item as not picked up when the user delselects an item', () => {
        const onCompleteShoppingClickedSpy = sinon.spy();
        const onSaveShoppingClickedSpy = sinon.spy();

        const shoppingPathWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponent
                        AppliedShoppingLists={AppliedShoppingListsSampleData}
                        onCompleteShoppingClicked={onCompleteShoppingClickedSpy}
                        onSaveShoppingClicked={onSaveShoppingClickedSpy}
                    />
                </Provider>
            );

        //Select a shopping list item
        const shoppingItem = shoppingPathWrapper.find('input[type=\'checkbox\']#sp4').hostNodes();
        shoppingItem.simulate('change', { target: { checked: false, id: 'sp4', dataset: { id: '4' } } });

        const markedItem = AppliedShoppingListsSampleData.ShoppingItems.find(si => si.Item.Id === '4');
        expect(markedItem.PickedUp).toBe(false);
    });
});
