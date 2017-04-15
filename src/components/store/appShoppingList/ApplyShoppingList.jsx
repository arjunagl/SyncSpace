import React from 'react';
import { connect } from 'react-redux';
import standardStyles from '../../../stylesheets/styles.scss';
/**
 * 
 * @param {*} param0 
 */
const ApplyShoppingListComponent = ({ onApplyShoppingListClick, storeKey }) => (
    <button
        className={standardStyles.secondary_Button}
        onClick={() => onApplyShoppingListClick(storeKey)}
    >
        Apply Shopping List
    </button>
);

const mapDispatchToProps = (dispatch) => ({
    onApplyShoppingListClick: (storeKey) => {
        console.log(`Applying shopping list ${storeKey}`);
    }
});

const mapStateToProps = (state) => ({
    currentState: state.LoginStatus
});

const ApplyShoppingListContainer = connect(null, mapDispatchToProps)(ApplyShoppingListComponent);
export default ApplyShoppingListContainer;
