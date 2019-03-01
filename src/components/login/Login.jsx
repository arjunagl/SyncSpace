import React from 'react';
import styles from './Login.scss';
import standardStyles from '../../stylesheets/styles.scss';

const LoginComponent = ({ onLoginClick, onRegisterClick }) => (
    <div className={styles.loginDiv}>
        <p className={standardStyles.pageTitleText}>SyncSpace</p>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <div className={styles.loginRegisterDiv}>
            <button className={styles.loginButton} onClick={onLoginClick}>Login</button>
            <button className={styles.registerButton} onClick={onRegisterClick}>Register</button>
        </div>
    </div>
);

export default LoginComponent;
