import React from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import styles from './CompletedSavedShopping.scss';
import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';

const CompletedSavedShoppingPathComponent = ({ CompletedShoppingLists, SavedShoppingLists, onShoppingListPathSelected, history }) => {
    const selectedShoppingList = (completedSavedShoppingList) => {
        history.push('/shopping');
        onShoppingListPathSelected(completedSavedShoppingList);
    };

    //Completed shopping lists
    const completedShoppingPaths = CompletedShoppingLists.map(
        completedShoppingPath =>
            <div
                className={styles.completedSavedShopping__link} key={completedShoppingPath.Name}
                onClick={() => selectedShoppingList(completedShoppingPath)}
            >
                {completedShoppingPath.Name} - {completedShoppingPath.UpdateDate}
            </div>
    );

    //Saved shopping lists
    const savedShoppingPaths = SavedShoppingLists.map(
        savedShoppingPath =>
            <div
                className={styles.completedSavedShopping__link} key={savedShoppingPath.Name}
                onClick={() => selectedShoppingList(savedShoppingPath)}
            >
                {savedShoppingPath.Name} - {savedShoppingPath.UpdateDate}
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
        dispatch(CompletedSavedShoppingPathSelected(shoppingListPath));
    }
});

const CompletedSavedShoppingPathComponentContainer = connect(mapStateToProps, mapDispatchToProps)(CompletedSavedShoppingPathComponent);
export default CompletedSavedShoppingPathComponentContainer;
