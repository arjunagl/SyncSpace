import React from 'react';
import classNames from 'classnames';
import styles from './TopMenuIndex.scss';

/**
 * Using object deconstructors here.
 */
const LoginStatus = ({ displayName }) => {
    const loginStatusClass = classNames(styles.LoginStatus, styles.topMenuIndex);
    return (
        <a className={loginStatusClass}>{displayName}</a>
    );
};

export default LoginStatus;
