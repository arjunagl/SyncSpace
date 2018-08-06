import React from 'react';
import styles from './SyncFormInput.scss';

export class SyncFormInput extends React.Component {
    render() {
        return (
            <div className={styles.SyncFormControl__InputWrapper}>
                <input type="text" value="" className={styles.SyncFormControl__Input} />
            </div>
        );
    }
}
