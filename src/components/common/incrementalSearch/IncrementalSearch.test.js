import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import IncrementalSearchComponent, { IncrementalSearch } from './IncrementalSearch';

// setup file
configure({ adapter: new Adapter() });

describe('<IncrementalSearch />', () => {
    let store;

    beforeEach(() => {
        const mockStore = configureStore();
        const getState = {}; // initial state of the store         
        store = mockStore(getState);
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
        const searchInput = incrementalSearchWrapper.find('#searchInput').hostNodes();
        searchInput.getElements().value = 'David';
        searchInput.simulate('change');
        expect(onChangeSpy.called).toEqual(true);
        onChangeSpy.restore();
    });

    // eslint-disable-next-line max-len
    it('calls \'onPerformIncrementalSearch\' when the user types in something and more than 3 seconds have passed', () => {
        jest.useFakeTimers();
        const mockStore = configureStore();
        const getState = {}; // initial state of the store 
        store = mockStore(getState);

        const onPerformIncrementalSearchSpy = sinon.spy();

        const incrementalSearchWrapper =
            mount(
                <IncrementalSearch
                    onPerformIncrementalSearch={onPerformIncrementalSearchSpy}
                    store={store}
                />
            );


        //find the input element
        const searchInput = incrementalSearchWrapper.find('#searchInput');
        searchInput.getElements().value = 'David';
        searchInput.simulate('change', searchInput);

        //We want to fastfoward all timers and check if the method was called
        jest.runAllTimers();
        expect(onPerformIncrementalSearchSpy.called).toEqual(true);
    });

    // eslint-disable-next-line max-len
    it('does not call \'onPerformIncrementalSearch\' when the user types in something and less than 3 seconds have passed', () => {
        const mockStore = configureStore();
        const getState = {}; // initial state of the store 
        store = mockStore(getState);

        const onPerformIncrementalSearchSpy = sinon.spy();
        const mapStateToProps = null;
        const mapDispatchToProps = {
            onPerformIncrementalSearch: onPerformIncrementalSearchSpy
        };

        const mappedProps = { mapStateToProps, mapDispatchToProps };

        const incrementalSearchWrapper =
            mount(
                <IncrementalSearch
                    onPerformIncrementalSearch={onPerformIncrementalSearchSpy}
                    props={mappedProps}
                    store={store}
                />
            );


        //find the input element
        const searchInput = incrementalSearchWrapper.find('#searchInput');
        searchInput.getElements().value = 'David';
        searchInput.simulate('change', searchInput);

        expect(onPerformIncrementalSearchSpy.called).toEqual(false);
    });

    it('Dispatches the action to the store when the user types in something', () => {
        jest.useFakeTimers();
        const mockStore = configureStore();
        const getState = {}; // initial state of the store 
        store = mockStore(getState);

        const onPerformIncrementalSearchSpy = sinon.spy();

        const incrementalSearchWrapper =
            mount(
                <IncrementalSearchComponent
                    onPerformIncrementalSearch={onPerformIncrementalSearchSpy}
                    store={store}
                />
            );


        //find the input element
        const searchInput = incrementalSearchWrapper.find('#searchInput');
        // searchInput.get(0).value = 'David';
        searchInput.simulate('change', { target: { value: 'David' } });
        jest.runAllTimers();
        const actions = store.getActions();
        expect(actions[0]).toEqual(JSON.parse('{"type":"SEARCH_STORES","SearchText":"David"}'));
    });
});
