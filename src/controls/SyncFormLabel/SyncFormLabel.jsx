import React from 'react';
import styles from './SyncFormLabel.scss';

export class SyncFormLabel extends React.Component {
    render() {
        return (
            <label className={styles.SyncFormControl__Label}>First name</label>
        );
    }
}
