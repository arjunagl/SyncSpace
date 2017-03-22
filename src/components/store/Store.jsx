import React, { PropTypes } from 'react';
import storeStyles from './Store.scss';
import defaultStoreImage from '../../stylesheets/images/Shop.svg';
/**
 * 
 * @param {*} param0 
 */
const StoreComponent = ({ Name, Location, Hours, Image }) => {
    const storeImage = Image || defaultStoreImage;

    return (
        <div className={storeStyles.Store} >
            <img className={storeStyles.storeImage} src={storeImage} alt={Name} />
            <p>{Name} - ({Location})</p>
            <p>{Hours}</p>
        </div>
    );
};

/**
 * 
 */
StoreComponent.PropTypes = {
    Name: PropTypes.string.isRequired
};

export default StoreComponent;
