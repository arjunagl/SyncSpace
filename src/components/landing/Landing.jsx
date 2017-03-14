import React from 'react';
import styles from './Landing.scss';
import StoreContainer from '../store/Store';

const LandingComponent = () => (
    <div className={styles.landingPageWrapper}>
        <StoreContainer />
        {/*<div>
            Your recent shopping list
        </div>*/}
    </div>
);

export default LandingComponent;
