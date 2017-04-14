import React from 'react';
import storeStyles from './Store.scss';
import defaultStoreImage from '../../stylesheets/images/Shop.svg';
import ApplyShoppingListContainer from './appShoppingList/ApplyShoppingList';
/**
 * 
 * @param {*} param0 
 */
const StoreComponent = ({ Name, Location, Hours, Image }) => {
    const storeImage = Image || defaultStoreImage;

    return (
        <div className={storeStyles.Store} >
            <img className={storeStyles.storeImage} src={storeImage} alt={Name} />
            <div className={storeStyles.storeDetails}>
                <p className={storeStyles.itemSeparation}>{Name} - ({Location})</p>
                <p >{Hours}</p>
            </div>
            <div className={storeStyles.applyShoppingList}>
                <ApplyShoppingListContainer />
            </div>
        </div>
    );
};

export default StoreComponent;
