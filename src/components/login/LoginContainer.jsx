import { connect } from "react-redux";
import LoginComponent from "./Login";
import React from "react";

export class LoginContainerComponent extends React.Component {

    constructor( props ) {
        super( props );
        this.abcd = 'abcd';
        this.onLoginClick = props.onLoginClick;

        // props.onLoginClick();
    }

    /**
     *
     */
    register() {
        alert( 'registering user' );
    }

    /**
     *
     * @param username
     * @param password
     */
    login( username, password ) {
        alert( username + password );
        alert( this.abcd );
        this.onLoginClick();
        // this.props.onLoginClick();
        // this.props.onLoginClick();
    }

    render() {
        return (<LoginComponent onRegisterClick = {this.register} onLoginClick = {this.login} />);
    };
}

const mapStateToProps = function ( state ) {
    return {
        currentState: 'Logged Out'
    }
};

const mapDispatchToProps = function ( dispatch ) {
    return {
        onLoginClick: () => {
            alert( 'login clicked' );
        },
        onRegisterClick: () => {
            alert( 'register clicked' );
        }
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( LoginContainerComponent );