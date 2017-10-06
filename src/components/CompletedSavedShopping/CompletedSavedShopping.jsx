import React from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import styles from './CompletedSavedShopping.scss';
import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';

const CompletedSavedShoppingPathComponent = ({ CompletedShoppingLists, SavedShoppingLists, onShoppingListPathSelected }) => {
    const selectedShoppingList = (completedSavedShoppingList) => {
        console.log(completedSavedShoppingList);
        onShoppingListPathSelected(completedSavedShoppingList);
    };

    //Completed shopping lists
    const completedShoppingPaths = CompletedShoppingLists.map(
        completedShoppingPath =>
            <div className={styles.completedSavedShopping__link} key={completedShoppingPath.Name}>
                <span onClick={() => selectedShoppingList(completedShoppingPath)}>
                    {completedShoppingPath.Name} - {completedShoppingPath.UpdateDate}
                </span>
            </div>
    );

    //Saved shopping lists
    const savedShoppingPaths = SavedShoppingLists.map(
        savedShoppingPath =>
            <div className={styles.completedSavedShopping__link} key={savedShoppingPath.Name}>
                <span onClick={() => selectedShoppingList(savedShoppingPath)}>
                    {savedShoppingPath.Name} - {savedShoppingPath.UpdateDate}
                </span>
            </div >
    );
    return (
        <div className={styles.completedSavedShopping__Wrapper}>
            <div className={styles.completedSavedShopping__Separation}>
                <div className={commonStyles.componentWrapper}>
                    <p className={commonStyles.componentTitle}>
                        Completed Shoppings
                    </p>
                    {completedShoppingPaths}
                </div>
            </div>
            <div className={styles.completedSavedShopping__Separation}>
                <div className={commonStyles.componentWrapper}>
                    <p className={commonStyles.componentTitle}>
                        Saved Shoppings
                    </p>
                    {savedShoppingPaths}
                </div>
            </div>
        </div>
    );
};

export { CompletedSavedShoppingPathComponent };

const mapStateToProps = (state) => ({
    CompletedShoppingLists: state.syncSpaceReducer.CompletedShoppingLists,
    SavedShoppingLists: state.syncSpaceReducer.SavedShoppingLists
});

const mapDispatchToProps = (dispatch) => ({
    onShoppingListPathSelected: (shoppingListPath) => {
        console.log(shoppingListPath);
        dispatch(CompletedSavedShoppingPathSelected(shoppingListPath));
    }
});

const CompletedSavedShoppingPathComponentContainer = connect(mapStateToProps, mapDispatchToProps)(CompletedSavedShoppingPathComponent);
export default CompletedSavedShoppingPathComponentContainer;
