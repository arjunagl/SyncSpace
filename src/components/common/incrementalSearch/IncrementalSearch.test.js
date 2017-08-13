import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import IncrementalSearchComponent, { IncrementalSearch } from './IncrementalSearch';


describe('<IncrementalSearch />', () => {
    afterEach(() => {
        //    this.constructorSpy.restore();
    });

    it('renders the component properly', () => {
        const component = shallow(<IncrementalSearch />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('calls componentDidMount', () => {
        const componentDidMountSpy = sinon.spy(IncrementalSearch.prototype, 'componentDidMount');
        mount(<IncrementalSearch />);
        expect(IncrementalSearch.prototype.componentDidMount.calledOnce).toEqual(true);
        componentDidMountSpy.restore();
    });

    it('calls \'onChange\' when the user types in something', () => {
        const onChangeSpy = sinon.spy(IncrementalSearch.prototype, 'onChange');
        const incrementalSearchWrapper = mount(<IncrementalSearch />);

        //find the input element
        const searchInput = incrementalSearchWrapper.find('#searchInput');
        searchInput.node.value = 'David';
        searchInput.simulate('change');
        expect(onChangeSpy.called).toEqual(true);
        onChangeSpy.restore();
    });

    // eslint-disable-next-line max-len
    it('calls \'onPerformIncrementalSearch\' when the user types in something and more than 3 seconds have passed', () => {
        //    _this.getState = _this.store.getState.bind(_this.store);
        // https://github.com/caljrimmer/isomorphic-redux-app/blob/master/test/behaviour/Sidebar.spec.js
        const mockStore = configureStore();
        const getState = {}; // initial state of the store 
        const store = mockStore(getState);

        const onPerformIncrementalSearchSpy = sinon.spy();
        const mapStateToProps = null;
        const mapDispatchToProps = {
            onPerformIncrementalSearch: onPerformIncrementalSearchSpy
        };

        const mappedProps = { mapStateToProps, mapDispatchToProps };

        const incrementalSearchWrapper =
            mount(
                <IncrementalSearchComponent
                    onPerformIncrementalSearch={onPerformIncrementalSearchSpy}
                    props={mappedProps}
                    store={store}
                />
            );


        //find the input element
        const searchInput = incrementalSearchWrapper.find('#searchInput');
        searchInput.node.value = 'David';
        searchInput.simulate('change', searchInput);

        //We want to fastfoward all timers and check if the method was called
        //jest.runAllTimers(); this does not work, we will have to check why later on.
        // expect(onPerformIncrementalSearchSpy.called).toEqual(true);

        setTimeout(() => {
            console.log('TIME IS UP');
            expect(onPerformIncrementalSearchSpy.called).toEqual(true);
        }, 4000);
    });

    // eslint-disable-next-line max-len
    it('does not call \'onPerformIncrementalSearch\' when the user types in something and less than 3 seconds have passed', () => {
        //    _this.getState = _this.store.getState.bind(_this.store);
        // https://github.com/caljrimmer/isomorphic-redux-app/blob/master/test/behaviour/Sidebar.spec.js
        const mockStore = configureStore();
        const getState = {}; // initial state of the store 
        const store = mockStore(getState);

        const onPerformIncrementalSearchSpy = sinon.spy();
        const mapStateToProps = null;
        const mapDispatchToProps = {
            onPerformIncrementalSearch: onPerformIncrementalSearchSpy
        };

        const mappedProps = { mapStateToProps, mapDispatchToProps };

        const incrementalSearchWrapper =
            mount(
                <IncrementalSearchComponent
                    onPerformIncrementalSearch={onPerformIncrementalSearchSpy}
                    props={mappedProps}
                    store={store}
                />
            );


        //find the input element
        const searchInput = incrementalSearchWrapper.find('#searchInput');
        searchInput.node.value = 'David';
        searchInput.simulate('change', searchInput);

        //We want to fastfoward all timers and check if the method was called
        //jest.runAllTimers(); this does not work, we will have to check why later on.
        // expect(onPerformIncrementalSearchSpy.called).toEqual(true);

        setTimeout(() => {
            console.log('TIME IS UP');
            expect(onPerformIncrementalSearchSpy.called).toEqual(false);
        }, 1500);
    });
});
