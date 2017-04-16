import React from 'react';
import { connect } from 'react-redux';
import standardStyles from '../../../stylesheets/styles.scss';
/**
 * 
 * @param {*} param0 
 */
const ApplyShoppingListComponent = ({ onApplyShoppingListClick, StoreKey }) => (
    <button
        className={standardStyles.secondary_Button}
        onClick={() => onApplyShoppingListClick(StoreKey)}
    >
        Apply Shopping List
    </button>
);

const mapDispatchToProps = (dispatch) => ({
    onApplyShoppingListClick: (StoreKey) => {
        console.log(`Applying shopping list ${StoreKey}`);
    }
});

const mapStateToProps = (state) => ({
    currentState: state.LoginStatus
});

const ApplyShoppingListContainer = connect(null, mapDispatchToProps)(ApplyShoppingListComponent);
export default ApplyShoppingListContainer;
