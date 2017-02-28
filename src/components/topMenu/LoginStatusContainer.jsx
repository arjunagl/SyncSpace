import React from 'react';
import { connect } from 'react-redux';
import LoginStatus from './LoginStatus';

const mapStateToProps = (state) => ({
    displayName: state.syncSpaceReducer.displayName
});

const LoginStatusContainer = ({ displayName }) => {
    let welcomeMessage = 'Sign In';
    if (displayName) {
        welcomeMessage = `Welcome ${displayName}`;
    }
    return (
        <LoginStatus displayName={welcomeMessage} />
    );
};

export default connect(mapStateToProps)(LoginStatusContainer);
