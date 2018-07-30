import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { connect } from 'react-redux';
import 'rxjs/add/operator/debounceTime';
import { Subject } from 'rxjs/Subject';
import { registerUser } from './registerActions';
import styles from './RegisterPage.scss';
import MaterialTextBox from '../common/materialTextBox/MaterialTextBox';

export class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onKeyUp$ = new Subject();
        this.state = { firstName: {}, lastName: {}, email: {} };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
    }

    componentDidMount() {
        //Acting as the Observer
        this.subscription = this.onKeyUp$
            .debounceTime(200)
            .subscribe(({ key, value }) => {
                switch (key) {
                    case 'firstName': {
                        this.handleFirstNameChange(value);
                        break;
                    }
                    case 'lastName': {
                        this.handleLastNameChange(value);
                        break;
                    }
                    case 'email': {
                        this.handleEmailChange(value);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
    }

    onRegisterClicked() {
        this.props.registerUser(this.state.firstName.value, this.state.lastName.value, this.state.email.value);
    }

    onKeyUp(key, e) {
        const value = e.target.value;
        this.onKeyUp$.next({ key, value }); //Acts as the Observable
    }

    handleFirstNameChange(firstName) {
        const newState = Object.assign({}, this.state, { firstName: { value: firstName } });
        newState.firstName.error = (newState.firstName.value === null || newState.firstName.value.trim() === '');
        this.setState(newState);
    }

    handleLastNameChange(lastName) {
        const newState = Object.assign({}, this.state, { lastName: { value: lastName } });
        newState.lastName.error = (newState.lastName.value === null || newState.lastName.value.trim() === '');
        this.setState(newState);
    }

    handleEmailChange(email) {
        const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
        const isInvalidEmail = (email.match(emailRegEx) === null);
        const newState = Object.assign({}, this.state, { email: { value: email } });
        newState.email.error = isInvalidEmail;
        this.setState(newState);
    }

    isFormValid() {
        const isFormValid = (
            !(this.state.firstName.error !== undefined ? this.state.firstName.error : true) &&
            !(this.state.lastName.error !== undefined ? this.state.lastName.error : true) &&
            !(this.state.email.error !== undefined ? this.state.email.error : true)
        );

        // const isFirstNameValid = this.state.firstName.error !== undefined ? this.state.firstName.error : true;
        // const isLastNameValid = this.state.lastName.error !== undefined ? this.state.lastName.error : true;
        // const isEmailValid = this.state.email.error !== undefined ? this.state.email.error : true;
        // console.log('isValid ', isFirstNameValid, isLastNameValid, isEmailValid, isFormValid);
        return isFormValid;
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        return (
            <MaterialTextBox />           
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    registerUser: (firstName, lastName, email) => {
        dispatch(registerUser(firstName, lastName, email));
    }
});

const mapStateToProps = (state) => ({
    state: state.syncSpaceReducer.Processing
});


const RegisterComponentContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
export default RegisterComponentContainer;
