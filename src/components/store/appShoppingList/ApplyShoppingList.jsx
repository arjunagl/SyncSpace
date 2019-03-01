import React from 'react';
import standardStyles from '../../../stylesheets/styles.scss';
/**
 * 
 * @param {*} param0 
 */
const ApplyShoppingListComponent = ({ onApplyShoppingListClicked, StoreKey }) => (
    <button
        className={standardStyles.secondary_Button}
        onClick={() => onApplyShoppingListClicked(StoreKey)}
    >
        Apply Shopping List
    </button>
);

export default ApplyShoppingListComponent;
