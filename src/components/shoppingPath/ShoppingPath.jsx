import React from 'react';
import { connect } from 'react-redux';
import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import styles from './ShoppingPath.scss';

const ShoppingPathComponent = ({ AppliedShoppingLists }) => {
    if (AppliedShoppingLists === undefined) {
        return <div />;
    }

    //First sort and then group based on the location
    const sortedShoppingPathOnLocation = sortby(AppliedShoppingLists, (shoppingPathItem) => {
        console.log(shoppingPathItem);
        return shoppingPathItem.Location.Name;
    });

    //Group based on the location
    const sortedAndGroupedShoppingPathOnLocation = groupby(sortedShoppingPathOnLocation,
        (shoppingPathItem) => (shoppingPathItem.Location.Name));


    const shoppingPathToRender = Object.keys(sortedAndGroupedShoppingPathOnLocation).map(locationKey => {
        return (
            <div key={locationKey}>
                Location: {locationKey}
                {
                    sortedAndGroupedShoppingPathOnLocation[locationKey].map(shoppingItem => {
                        return (<div key={shoppingItem.Item.Id}>{shoppingItem.Item.Name}</div>);
                    })
                }
            </div>);
    });

    /*const shoppingPathToRender = AppliedShoppingLists.map(shoppingListItem =>
        <div
            key={shoppingListItem.Item.Id}
            className={styles.ShoppingItem}
        >
            <input type="checkbox" id={shoppingListItem.Item.Id} />
            <label
                htmlFor={shoppingListItem.Item.Id}
            >
                {shoppingListItem.Item.Name} <br />
                Location: {shoppingListItem.Location.Name}, {shoppingListItem.Location.Description}
            </label>
        </div>
    );*/
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
