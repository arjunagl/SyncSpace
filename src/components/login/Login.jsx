import React, { Component, PropTypes } from 'react';
import styles from './Login.scss';
import standardStyles from '../../stylesheets/styles.scss';

const LoginComponent = ( { onLoginClick, onRegisterClick } ) => (
    <div className = {styles.loginDiv}>
        <div className = {styles.loginRegisterButton}>
            <p className = {standardStyles.std_bold_Text}>Login</p>
            <button className = {standardStyles.std_blue_Button} onClick = {onRegisterClick}>Register</button>
        </div>
        <button className = {standardStyles.std_blue_Button} onClick = {onLoginClick}>Next</button>
    </div>
);

LoginComponent.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired
};

export default LoginComponent;