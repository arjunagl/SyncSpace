import React, { Component, PropTypes } from 'react';
import styles from './Login.scss';

const LoginComponent = ( { onLoginClick, onRegisterClick } ) => (
    <div className={styles.loginDiv}>
        <a href="#" onClick={onLoginClick}>{loginText}</a>
        <a href="#" onClick={onRegisterClick}>{registerText}</a>
    </div>
);

LoginComponent.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired
};

export default LoginComponent;