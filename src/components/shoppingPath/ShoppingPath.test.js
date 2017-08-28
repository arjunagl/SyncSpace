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

        const shppongPathWrapper =
            mount(
                <Provider store={store}>
                    <ShoppingPathComponent
                        AppliedShoppingLists={AppliedShoppingListsSampleData}
                        onCompleteShoppingClicked={onCompleteShoppingClickedSpy}
                        onSaveShoppingClicked={onSaveShoppingClickedSpy}
                    />
                </Provider>
            );

        const completeShoppingbutton = shppongPathWrapper.find('#saveShoppingbutton');
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
        const shoppingItem = shoppingPathWrapper.find('input[type=\'checkbox\']#4');
        shoppingItem.simulate('change', { target: { checked: true, id: '4' } });

        const markedItem = AppliedShoppingListsSampleData.find(si => si.Item.Id === '4');
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
        const shoppingItem = shoppingPathWrapper.find('input[type=\'checkbox\']#4');
        shoppingItem.simulate('change', { target: { checked: false, id: '4' } });

        const markedItem = AppliedShoppingListsSampleData.find(si => si.Item.Id === '4');
        expect(markedItem.PickedUp).toBe(false);
    });
});
