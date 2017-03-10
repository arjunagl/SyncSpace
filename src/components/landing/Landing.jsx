import React from 'react';
import styles from './Landing.scss';
import StoreComponent from '../store/Store';

const LandingComponent = () => (
    <div className={styles.landingPageWrapper}>        
        <StoreComponent />
        {/*<div>
            Your recent shopping list
        </div>*/}
    </div>
);

export default LandingComponent;
