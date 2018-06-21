import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'rxjs/add/operator/debounceTime';
import { Subject } from 'rxjs/Subject';
import styles from './RegisterPage.scss';

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.onKeyUp$ = new Subject();
        this.state = { firstName: {}, lastName: {}, email: {} };

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    componentDidMount() {
        //Acting as the Observer
        this.subscription = this.onKeyUp$
            .debounceTime(300)
            .subscribe(({ key, value }) => {
                console.log(key, value);
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


    render() {
        return (
            <Paper className={styles.register}>
                <Grid id="gridContainer" container direction="column" alignItems="center" justify="center" className={styles.register__wrapper}>
                    <Grid item>
                        <TextField
                            required
                            error={this.state.firstName.error}
                            id="firstName"
                            label="First name"
                            placeholder="First Name"
                            margin="normal"
                            value={((this.state.firstName || {}).value || '')}
                            onKeyUp={(event) => this.onKeyUp('firstName', event)}
                            onChange={(event) => this.setState(Object.assign({}, this.state, { firstName: { value: event.target.value } }))}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            error={this.state.lastName.error}
                            id="lastName"
                            label="Last name"
                            placeholder="Last Name"
                            margin="normal"
                            onKeyUp={(event) => this.onKeyUp('lastName', event)}
                            onChange={(event) => this.setState(Object.assign({}, this.state, { lastName: { value: event.target.value } }))}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            error={this.state.email.error}
                            id="email"
                            label="Email"
                            placeholder="Email"
                            margin="normal"
                            onKeyUp={(event) => this.onKeyUp('email', event)}
                            onChange={(event) => this.setState(Object.assign({}, this.state, { email: { value: event.target.value } }))}
                        />
                    </Grid>
                    <Grid item className={styles.register__submit}>
                        <Button variant="contained" color="primary" >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default RegisterPage;
