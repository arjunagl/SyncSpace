import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ShoppingPathComponentContainer, { ShoppingPathComponent } from './ShoppingPath';

describe('<ShoppingPathComponent />', () => {
    let store;

    beforeEach(() => {
        const mockStore = configureStore();
        const getState = {}; // initial state of the store         
        store = mockStore(getState);
    });

    it('renders the component properly', () => {
        const component = shallow(<ShoppingPathComponent />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('calls \'onCompleteShoppingClicked\' when the user clicks the button to complete shopping', () => {
        const onCompleteShoppingClickedSpy = sinon.spy();
        const mapDispatchToProps = {
            onCompleteShoppingClicked: onCompleteShoppingClickedSpy
        };
        const mapStateToProps = null;
        const mappedProps = { mapStateToProps, mapDispatchToProps };

        const shppingPathWrapper =
            mount(
                <ShoppingPathComponentContainer
                    props={mappedProps}
                    store={store}
                />
            );

        //find the the complete button
        const completeShoppingbutton = shppingPathWrapper.find('#completeShoppingbutton');
        completeShoppingbutton.simulate('click');
        expect(onCompleteShoppingClickedSpy.called).toEqual(true);
    });
});
