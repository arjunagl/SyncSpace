import React from 'react';
import { mount } from 'enzyme';
import { IncrementalSearch } from './IncrementalSearch';

function setup() {
    const props = {
        addTodo: jest.fn()
    };

    const enzymeWrapper = mount(<IncrementalSearch {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('Components', () => {
    describe('Incremental Search', () => {
        it('should render itself and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('IncrementalSearch').hasClass('srchBoxContaner')).toBe(true);
        });
    });
});
