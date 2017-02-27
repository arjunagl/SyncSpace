import React from 'react';
import { connect } from 'react-redux';
import LoginStatus from './LoginStatus';

const mapStateToProps = (state) => ({
    displayName: state.displayName
});

const LoginStatusContainer = (state) =>
    (
        <LoginStatus displayName={state.displayName} />
    );


export default connect(mapStateToProps)(LoginStatusContainer);
