import React from 'react';
import { connect } from 'react-redux';
import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import styles from './ShoppingPath.scss';
import ButtonContainer from '../common/button/Button';
import commonStyles from '../../stylesheets/styles.scss';
import { completeShoppingPathAction } from './ShoppingPathActions';

// eslint-disable-next-line max-len
const ShoppingPathComponent = ({ AppliedShoppingLists, onCompleteShoppingClicked, onSaveShoppingClicked }) => {
    const buttonStyle = {
        margin: '10px 10px 0px 0px'
    };

    const onClickedShoppingItem = (event) => {
        const isSelected = event.target.checked;
        // const shoppingItemId = even
        // if (isSelected) {
        //     onShoppingListClicked(ShoppingListId);
        // } else {
        //     onShoppingListUnclicked(ShoppingListId);
        // }
    };

    if (AppliedShoppingLists === undefined) {
        return <div />;
    }

    //First sort and then group based on the location    
    const sortedShoppingPathOnLocation = sortby(AppliedShoppingLists, (shoppingPathItem) => shoppingPathItem.Location.Name);

    //Group based on the location
    const sortedAndGroupedShoppingPathOnLocation = groupby(sortedShoppingPathOnLocation,
        (shoppingPathItem) => (shoppingPathItem.Location.Name));

    // eslint-disable-next-line arrow-body-style
    const shoppingPathToRender = Object.keys(sortedAndGroupedShoppingPathOnLocation).map(locationKey => {
        return (
            <div key={locationKey}>
                <div className={styles.ShoppingPathLocation}>
                    {locationKey}
                    {
                        <div>
                            {
                                // eslint-disable-next-line arrow-body-style
                                sortedAndGroupedShoppingPathOnLocation[locationKey].map(shoppingItem => {
                                    return (
                                        <div
                                            className={styles.ShoppingItem}
                                            key={shoppingItem.Item.Id}
                                        >
                                            <input
                                                type='checkbox' id={`${shoppingItem.Item.Id}`}
                                                onChange={onClickedShoppingItem}
                                            />
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
                </div>
            </div>
        );
    });
    return (
        <div>
            {shoppingPathToRender}
            <div className={styles.CompleteShopping}>
                <ButtonContainer
                    id='completeShoppingbutton'
                    className={commonStyles.std_Button}
                    onClick={onCompleteShoppingClicked}
                    style={buttonStyle}
                    content='Complete shopping'
                />
                <ButtonContainer
                    id='saveShoppingbutton'
                    className={commonStyles.std_Button}
                    onClick={onSaveShoppingClicked}
                    style={buttonStyle}
                    content='Save for later'
                />
            </div>
        </div>
    );
};

export { ShoppingPathComponent };

const mapStateToProps = (state) => ({
    AppliedShoppingLists: state.syncSpaceReducer.AppliedShoppingLists
});


const mapDispatchToProps = (dispatch) => ({
    onCompleteShoppingClicked: () => {
        dispatch(completeShoppingPathAction());
    },
    onSaveShoppingClicked: () => {
        alert('clicked save');
    }
});

const ShoppingPathComponentContainer =
    connect(mapStateToProps, mapDispatchToProps)(ShoppingPathComponent);
export default ShoppingPathComponentContainer;
