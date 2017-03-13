import React from 'react';
import commonStyles from '../../stylesheets/styles.scss';

const StoreComponent = () => (
    <div className={commonStyles.componentWrapper}>
        <p className={commonStyles.componentTitle}>
            Available stores
        </p>
    </div>
);

export default StoreComponent;
