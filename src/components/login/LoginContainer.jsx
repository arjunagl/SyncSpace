import React from 'react';
import { connect } from 'react-redux';
import LoginComponent from './Login';
import { performLogin } from './LoginActions';

export class LoginContainerComponent extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    /**
     *
     */
    register() {
    }

    /**
     *
     * @param username
     * @param password
     */
    login(username, password) {
        this.props.onPerformLogin(username, password);
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf LoginContainerComponent
     */
    render() {
        return (
            <LoginComponent
                onRegisterClick={this.register}
                onLoginClick={this.login}
            />
        );
    }
}

/**
 *
 * @param state
 * @returns {{currentState: string}}
 */
const mapStateToProps = (state) => ({
    currentState: state.LoginStatus
});

/**
 *
 * @param dispatch
 * @returns {{onLoginClick: (function()), onRegisterClick: (function())}}
 */
const mapDispatchToProps = (dispatch) => ({
    onPerformLogin: () => {
        dispatch(performLogin('testUser', 'testpassword'));
    },
    onRegisterClick: () => {
    }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainerComponent);
export default LoginContainer;
