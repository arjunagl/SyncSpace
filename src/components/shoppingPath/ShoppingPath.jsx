import React from 'react';
import { connect } from 'react-redux';
import styles from './ShoppingPath.scss';

const ShoppingPathComponent = ({ AppliedShoppingLists }) => {
    if (AppliedShoppingLists === undefined) {
        return <div />;
    }

    const shoppingPathToRender = AppliedShoppingLists.map(shoppingListItem =>
        <div
            key={shoppingListItem.Item.Id}
            className={styles.ShoppingItem}
        >
            <input type="checkbox" id={shoppingListItem.Item.Id} />
            <label
                htmlFor={shoppingListItem.Item.Id}
            >
                {shoppingListItem.Item.Name} <br />
                Isle: {shoppingListItem.Location.Isle}, {shoppingListItem.Location.Description}
            </label>
        </div>
    );
    return (
        <div>
            {shoppingPathToRender}
        </div>
    );
};

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => ({
    AppliedShoppingLists: state.syncSpaceReducer.AppliedShoppingLists
});

const ShoppingPathComponentContainer = connect(mapStateToProps)(ShoppingPathComponent);
export default ShoppingPathComponentContainer;
