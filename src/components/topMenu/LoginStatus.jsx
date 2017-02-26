import React from 'react';
import styles from './TopMenuIndex.scss';
import classNames from 'classnames';


const LoginStatus = () => {
    const loginStatusClass = classNames(styles.LoginStatus, styles.topMenuIndex);
    return (
        <a className={loginStatusClass}>Hello jim</a>
    );
};

export default LoginStatus;
