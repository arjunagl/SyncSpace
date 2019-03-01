import React from 'react';
import styles from './ShoppingList.scss';

const ShoppingListComponent = ({ ShoppingListId, Name,
    onShoppingListClicked, onShoppingListUnclicked }) => (
        <div className={styles.ShoppingList}>
            <input
                type='checkbox' id={ShoppingListId} value={Name}
                onChange={(event) => {
                    const isSelected = event.target.checked;
                    if (isSelected) {
                        onShoppingListClicked(ShoppingListId);
                    } else {
                        onShoppingListUnclicked(ShoppingListId);
                    }
                }}
            />{Name}
        </div>
    );

export default ShoppingListComponent;
