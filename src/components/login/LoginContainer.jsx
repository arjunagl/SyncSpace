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
        this.userDisplayName = props.userDisplayName;
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
        //Perform the actual login, but for the moment we will just mock this
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
        console.log('Rendering the login container');
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
const mapStateToProps = function (state) {
    return {
        currentState: state.LoginStatus
    };
};

/**
 *
 * @param dispatch
 * @returns {{onLoginClick: (function()), onRegisterClick: (function())}}
 */
const mapDispatchToProps = function (dispatch) {
    return {
        onPerformLogin: () => {
            dispatch(performLogin('testUser', 'testpassword'));
        },
        onRegisterClick: () => {
        }
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainerComponent);
export default LoginContainer;
