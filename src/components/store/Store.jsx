import React, { PropTypes } from 'react';

/**
 * 
 * @param {*} param0 
 */
const StoreComponent = ({ Name }) => (
    <div >
        This is a single store {Name}
    </div>
);

/**
 * 
 */
StoreComponent.PropTypes = {
    Name: PropTypes.string.isRequired
};

export default StoreComponent;
