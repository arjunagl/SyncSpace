import React from 'react';
import styles from './Landing.scss';
import StoreComponent from '../store/Store';

const LandingComponent = () => (
    <div className={styles.landingPageWrapper}>
        <div className={styles.stores} >
            <StoreComponent />
        </div>
        <div className={styles.recentList}>
            this is the recent list that should come here...
        </div>
    </div>
);

export default LandingComponent;
