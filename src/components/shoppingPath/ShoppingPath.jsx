import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import styles from './ShoppingPath.scss';
import ButtonContainer from '../common/button/Button';
import commonStyles from '../../stylesheets/styles.scss';
import { completeShoppingPathAction, saveShoppingPathAction } from './ShoppingPathActions';

// eslint-disable-next-line max-len
const ShoppingPathComponent = ({ AppliedShoppingLists, onCompleteShoppingClicked, onSaveShoppingClicked, history, setTitle }) => {
    const buttonStyle = {
        margin: '10px 10px 0px 0px'
    };

    const onClickedShoppingItem = (event) => {
        const isSelected = event.target.checked;
        const shoppingListitemId = event.target.dataset.id;

        //Select the item from the shopping list and mark the chcecked state
        const shoppingItem = AppliedShoppingLists.ShoppingItems.find(si => si.Item.Id === shoppingListitemId);
        shoppingItem.PickedUp = isSelected;
    };

    //Set the title
    setTitle({
        windowTitle: 'Shopping Path - SyncSpace',
        pageTitle: 'Shopping Path'
    });

    if (AppliedShoppingLists === undefined) {
        return <div />;
    }

    //First sort and then group based on the location    
    const sortedShoppingPathOnLocation = sortby(AppliedShoppingLists.ShoppingItems, (shoppingPathItem) => shoppingPathItem.Location.Name);

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
                                                type='checkbox' id={`sp${shoppingItem.Item.Id}`}
                                                data-id={shoppingItem.Item.Id}
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
                    onClick={() => {
                        onCompleteShoppingClicked(AppliedShoppingLists);
                        history.push('/landing');
                    }}
                    style={buttonStyle}
                    content='Complete shopping'
                />
                <ButtonContainer
                    id='saveShoppingbutton'
                    className={commonStyles.std_Button}
                    onClick={() => {
                        onSaveShoppingClicked(AppliedShoppingLists);
                        history.push('/landing');
                    }}
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
    onCompleteShoppingClicked: (appliedShoppingList) => {
        dispatch(completeShoppingPathAction(appliedShoppingList));
    },
    onSaveShoppingClicked: (appliedShoppingList) => {
        dispatch(saveShoppingPathAction(appliedShoppingList));
    }
});

const ShoppingPathComponentContainer =
    connect(mapStateToProps, mapDispatchToProps)(ShoppingPathComponent);

const ShoppingPathByIdQuery = gql`
  query ShoppingPathById($Id: String!) {
    ShoppingPathById(Id: $Id) {
        Id
        name
        userId
        storeId
        completed
        dateCreated
      }
  }
`;
export default graphql(ShoppingPathByIdQuery, {
    options: () => ({ variables: { Id: '1' } }),
    props: ({ data: { loading, ShoppingPaths } }) => ({
        loading,
        ShoppingPaths,
    }),
})(ShoppingPathComponentContainer);
