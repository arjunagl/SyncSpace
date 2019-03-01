import React from 'react';
import styles from './SyncFormControl.scss';

export class SyncFormControl extends React.Component {
    render() {
        return (
            <div className={styles.SyncFormControl}>
                {this.props.children}
            </div>
        );
    }
}
