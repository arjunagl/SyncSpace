import React from 'react';
import commonStyles from '../../stylesheets/styles.scss';
import storeStyles from './Store.scss';

const StoreComponent = () => (
    <div className={commonStyles.componentWrapper}>
        <p className={storeStyles.storeTitle}>
            Available stores
        </p>
    </div>

);

export default StoreComponent;
