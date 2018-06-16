import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styles from './RegisterPage.scss';


const RegisterPage = () => {
    return (
        <Paper className={styles.registerAlign}>
            <Grid id="gridContainer" container direction="column" alignItems="center" justify="center" style={{ height: "100%", backgroundColor: "aquamarine" }}>
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
                <Grid item style={{ marginTop: "40px", marginBottom: "40px" }}>
                    <Button variant="contained" color="primary" >
                        Register
                    </Button>
                </Grid>

            </Grid>
        </Paper>
    );
}

export default RegisterPage;
