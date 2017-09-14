import React from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import styles from './CompletedSavedShopping.scss';

const CompletedSavedShoppingPathComponent = ({ CompletedShoppingLists, SavedShoppingLists }) => {
    let savedShoppingPaths;

    const completedShoppingPaths = CompletedShoppingLists.map(completedShoppingPath => completedShoppingPath.ShoppingListId);
    return (
        <div className={styles.completedSavedShoppingWrapper}>
            <div className={styles.completedSavedShoppingSeparation}>
                <div className={commonStyles.componentWrapper}>
                    <p className={commonStyles.componentTitle}>
                        Completed Shoppings
                    </p>
                    {completedShoppingPaths}
                </div>
            </div>
            <div className={styles.completedSavedShoppingSeparation}>
                <div className={commonStyles.componentWrapper}>
                    <p className={commonStyles.componentTitle}>
                        Saved Shoppings
                    </p>
                    {completedShoppingPaths}
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

const CompletedSavedShoppingPathComponentContainer = connect(mapStateToProps)(CompletedSavedShoppingPathComponent);
export default CompletedSavedShoppingPathComponentContainer;
