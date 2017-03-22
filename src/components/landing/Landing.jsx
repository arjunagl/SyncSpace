import React from 'react';
import styles from './Landing.scss';
import StoresComponentContainer from '../store/StoresComponentContainer';
import ShoppingListsComponentContainer from '../shoppingList/ShoppingListComponentContainer';

const LandingComponent = () => (
    <div className={styles.landingPageWrapper}>
        <div className={styles.landingPageSeparation}>
            <StoresComponentContainer />
        </div>
        <div className={styles.landingPageSeparation}>
            <ShoppingListsComponentContainer />
        </div>
    </div >
);

export default LandingComponent;
