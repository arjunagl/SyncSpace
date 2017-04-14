import React from 'react';
import { connect } from 'react-redux';
import standardStyles from '../../../stylesheets/styles.scss';
/**
 * 
 * @param {*} param0 
 */
const ApplyShoppingListComponent = ({ onApplyShoppingListClick }) => (
    <button className={standardStyles.secondary_Button} onClick={onApplyShoppingListClick}>
        Apply Shopping List
    </button>
);

const mapDispatchToProps = (dispatch) => ({
    onApplyShoppingListClick: () => {
        console.log('Applying shopping list');
    }
});

const ApplyShoppingListContainer = connect(null, mapDispatchToProps)(ApplyShoppingListComponent);
export default ApplyShoppingListContainer;
