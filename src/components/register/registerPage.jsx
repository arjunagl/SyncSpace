import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import styles from './RegisterPage.scss';


const RegisterPage = (props) => {
    return (
        <Paper className={styles.registerAlign}>
            <Grid id="gridContainer" container direction="column" alignItems="center" justify="center" style={{height:"100%"}}>
                <Grid item>
                    <TextField
                        id="firstName"
                        label="First name"
                        placeholder="First Name"
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="lastName"
                        label="Last name"
                        placeholder="Last Name"
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="email"
                        label="Email"
                        placeholder="Email"
                        margin="normal"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default RegisterPage;
