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

    it('calls \'onPerformIncrementalSearch\' when the user types in something', () => {
        const mockStore = configureStore();

        const onPerformIncrementalSearchSpy = sinon.spy();
        const mapStateToProps = null;
        const mapDispatchToProps = {
            onPerformIncrementalSearch: onPerformIncrementalSearchSpy
        };

        const mappedProps = { mapStateToProps, mapDispatchToProps };

        const incrementalSearchWrapper =
            shallow(
                <IncrementalSearchComponent
                    onPerformIncrementalSearch={onPerformIncrementalSearchSpy}
                    props={mappedProps}
                    store={mockStore}
                />
            );


        //find the input element
        const searchInput = incrementalSearchWrapper.find('#searchInput');
        searchInput.node.value = 'David';
        searchInput.simulate('change', searchInput);
        expect(onPerformIncrementalSearchSpy.called).toEqual(true);
        // onChangeSpy.restore();
    });
});
