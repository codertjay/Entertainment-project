import React from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright () {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date ().getFullYear ()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles ((theme) => ({
    paper: {
        marginTop: theme.spacing (8) ,
        display: 'flex' ,
        flexDirection: 'column' ,
        alignItems: 'center' ,
    } ,
    avatar: {
        margin: theme.spacing (1) ,
        backgroundColor: theme.palette.secondary.main ,
    } ,
    form: {
        width: '100%' , // Fix IE 11 issue.
        marginTop: theme.spacing (3) ,
    } ,
    submit: {
        margin: theme.spacing (3 , 0 , 2) ,
    } ,
}));


const RegistrationForm = (props) => {
    const [firstname , setFirstname] = React.useState ("");
    const [lastname , setLastname] = React.useState ("");
    const [username , setUsername] = React.useState ("");
    const [email , setEmail] = React.useState ("");
    const [password1 , setPassword1] = React.useState ("");
    const [password2 , setPassword2] = React.useState ("");
    const [user_type , setUserType] = React.useState ("Free");

    const classes = useStyles ();

    const onFinish = e => {
        e.preventDefault ()
        props.onAuth (
            firstname ,
            lastname ,
            username ,
            email ,
            password1 ,
            password2 ,
            user_type
        );

    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} method='Post' noValidate onSubmit={onFinish}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="first name"
                                name="firstName"
                                value={firstname}
                                onChange={e => setFirstname (e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="last name"
                                name="lastName"
                                value={lastname}
                                onChange={e => setLastname (e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={username}
                                onChange={e => setUsername (e.target.value)}
                                id="username"
                                label="Username"
                                name="Username"
                                autoComplete="Username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                onChange={e => setEmail (e.target.value)}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <TextField*/}
                        {/*        variant="outlined"*/}
                        {/*        required*/}
                        {/*        fullWidth*/}
                        {/*        value={user-type}*/}
                        {/*        id="user-type"*/}
                        {/*        label="Email Address"*/}
                        {/*        name="email"*/}
                        {/*        autoComplete="email"*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                onChange={e => setPassword1 (e.target.value)}
                                value={password1}
                                name="password1"
                                label="Password"
                                type="password"
                                id="password1"
                                autoComplete="current-password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                onChange={e => setPassword2 (e.target.value)}
                                value={password2}
                                name="password2"
                                label="confirm password"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );


}


const mapStateToProps = (state) => {
    return {
        loading: state.loading ,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstname , lastname , username , email , password1 , password2 , user_type) =>
            dispatch (actions.authSignup (firstname , lastname , username ,
                email ,
                password1 ,
                password2 ,
                user_type))
    }
}

export default connect (mapStateToProps , mapDispatchToProps) (RegistrationForm);


// } <MDBInputGroup
//                 containerClassName="mb-3"
//                 append="Options"
//                 inputs={
//                     <select className="browser-default custom-select">
//                         <option value="Free">choose...</option>
//                         <option value="Free">Free</option>
//                         <option value="Paid">Paid</option>
//                         <option value="Premium">Premium</option>
//                     </select>
//                 }
//             />