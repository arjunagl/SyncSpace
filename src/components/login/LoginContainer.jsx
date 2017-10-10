import React from 'react';
import { connect } from 'react-redux';
import LoginComponent from './Login';
import { performLogin } from './LoginActions';

class LoginContainerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    register() {
    }

    login(username, password) {
        this.props.onPerformLogin(username, password);
    }

    render() {
        return (
            <LoginComponent
                onRegisterClick={this.register}
                onLoginClick={this.login}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    currentState: state.syncSpaceReducer.LoginStatus
});

const mapDispatchToProps = (dispatch) => ({
    onPerformLogin: () => {
        dispatch(performLogin('testUser', 'testpassword'));
    },
    onRegisterClick: () => {
    }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainerComponent);
export default LoginContainer;
    