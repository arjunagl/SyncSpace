import React from 'react';
import styles from '../../../stylesheets/styles.scss';

// eslint-disable-next-line arrow-body-style
const CompleteShoppingComponent = (props) => {
    console.log(props.width);
    return (
        // eslint-disable-next-line max-len
        <button className={styles.std_Button} style={{ width: props.width }}>Complete Shopping</button>
    );
};

export default CompleteShoppingComponent;
