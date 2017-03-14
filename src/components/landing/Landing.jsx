import React from 'react';
import styles from './Landing.scss';
import StoresComponentContainer from '../store/StoresComponentContainer';

const LandingComponent = () => (
    <div className={styles.landingPageWrapper}>
        <StoresComponentContainer />
        {/*<div>
            Your recent shopping list
        </div>*/}
    </div>
);

export default LandingComponent;
