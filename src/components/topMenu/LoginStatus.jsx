import React from 'react';
import classNames from 'classnames';
import styles from './TopMenuIndex.scss';

const LoginStatus = (props) => {
    const loginStatusClass = classNames(styles.LoginStatus, styles.topMenuIndex);
    return (
        <a className={loginStatusClass}>{props.displayName}</a>
    );
};

export default LoginStatus;
