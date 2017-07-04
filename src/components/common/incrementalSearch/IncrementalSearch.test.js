import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { IncrementalSearch } from './IncrementalSearch';

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
});
