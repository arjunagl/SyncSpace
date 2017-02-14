import {connect} from 'react-redux';
import LoginComponent from './Login';

const mapStateToProps = (state) => {
    return {
        loginText: 'Login',
        registerText: 'Register'
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: () => {
            alert('login clicked');
        },
        onRegisterClick: () => {
            alert('register clicked');
        }
    }
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default LoginContainer;