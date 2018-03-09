import React from 'react';
import commonStyles from '../../stylesheets/styles.scss';
import styles from './CompletedSavedShopping.scss';
// import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';

const CompletedSavedShoppingPathComponent = ({ CompletedShoppingLists, SavedShoppingLists, onShoppingListPathSelected, history }) => {
    const selectedShoppingList = (completedSavedShoppingList) => {
        history.push('/shopping');
        onShoppingListPathSelected(completedSavedShoppingList);
    };

    //Completed shopping lists
    const completedShoppingPaths = CompletedShoppingLists.map(
        completedShoppingPath =>
            <div
                id={completedShoppingPath.Id}
                className={styles.completedSavedShopping__link} key={completedShoppingPath.Id}
                onClick={() => selectedShoppingList(completedShoppingPath)}
            >
                <span>
                    {completedShoppingPath.name} - {completedShoppingPath.dateCreated}
                </span>
            </div>
    );

    //Saved shopping lists
    const savedShoppingPaths = SavedShoppingLists.map(
        savedShoppingPath =>
            <div
                id={savedShoppingPath.Id}
                className={styles.completedSavedShopping__link} key={savedShoppingPath.Id}
                onClick={() => selectedShoppingList(savedShoppingPath)}
            >
                <span>
                    {savedShoppingPath.name} - {savedShoppingPath.dateCreated}
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

//Make this a smart component
export { CompletedSavedShoppingPathComponent };
