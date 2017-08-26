import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ShoppingPathComponentContainer, { ShoppingPathComponent } from './ShoppingPath';
import { AppliedShoppingListsSampleData } from '../../data/sampleData';
import { completeShoppingPathAction } from './ShoppingPathActions';

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
                    />
                </Provider>
            );

        const completeShoppingbutton = shppingPathWrapper.find('#completeShoppingbutton');
        completeShoppingbutton.simulate('click');
        expect(onCompleteShoppingClickedSpy.called).toEqual(true);
    });

    it('calls \'onSaveShoppingClicked\' when the user clicks the button to save shopping', () => {
        const onCompleteShoppingClickedSpy = sinon.spy();
        const onSaveShoppingClickedSpy = sinon.spy();

        const shppingPathWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponent
                        AppliedShoppingLists={AppliedShoppingListsSampleData}
                        onCompleteShoppingClicked={onCompleteShoppingClickedSpy}
                        onSaveShoppingClicked={onSaveShoppingClickedSpy}
                    />
                </Provider>
            );

        const completeShoppingbutton = shppingPathWrapper.find('#saveShoppingbutton');
        completeShoppingbutton.simulate('click');
        expect(onSaveShoppingClickedSpy.called).toEqual(true);
    });

    it('dispatches the completeShoppingPath action when complete shopping is clicked', () => {
        const shoppingPathContainerWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponentContainer />
                </Provider>
            );

        const completeShoppingbutton = shoppingPathContainerWrapper.find('#completeShoppingbutton');
        completeShoppingbutton.simulate('click');
        const actions = store.getActions();
        expect(actions[0]).toEqual(completeShoppingPathAction());
    });

    it('selects registers the shopping list item when the user checks the item', () => {
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
        const shoppingItem = shoppingPathWrapper.find('input[type=\'checkbox\']#1');
        shoppingItem.simulate('click');
        console.log('abcd');
    });
});
