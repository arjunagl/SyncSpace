import React from 'react';
import { connect } from 'react-redux';
import LoginComponent from './Login';
import { performLogin } from './LoginActions';

class LoginContainerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        //Set the title to login
        this.props.setTitle({
            windowTitle: 'Login - SyncSpace',
            pageTitle: 'Login'
        });
    }

    register() {
    }

    login(username, password) {
        this.props.onPerformLogin(username, password, this.props.history);
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
    onPerformLogin: (username, password, history) => {
        dispatch(performLogin(username, password, history));
    },
    onRegisterClick: () => {
    }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainerComponent);
export default LoginContainer;
