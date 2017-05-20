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


    // eslint-disable-next-line max-len, arrow-body-style
    const shoppingPathToRender = Object.keys(sortedAndGroupedShoppingPathOnLocation).map(locationKey => {
        return (
            <div key={locationKey} className={styles.ShoppingPathLocation}>
                {locationKey}
                {
                    <div>
                        {
                            // eslint-disable-next-line arrow-body-style, max-len
                            sortedAndGroupedShoppingPathOnLocation[locationKey].map(shoppingItem => {
                                console.log(shoppingItem);
                                return (
                                    <div
                                        className={styles.ShoppingItem}
                                        key={shoppingItem.Item.Id}
                                    >
                                        <input type='checkbox' id={`${shoppingItem.Item.Id}`} />
                                        <label htmlFor={`${shoppingItem.Item.Id}`}>
                                            {shoppingItem.Item.Name}
                                            <span className={styles.ItemLocationHint}>
                                                {shoppingItem.Location.Description}
                                            </span>
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>);
    });

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
