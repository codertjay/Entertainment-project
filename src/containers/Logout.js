import React , { Component } from 'react';
import { Grid , Typography , Box , Button , Container } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from 'react-redux'
import * as actions from "../store/actions/auth";
import { Redirect , withRouter } from "react-router-dom";


const useStyles = makeStyles ((theme) => ({
    blogContainer: {
        paddingTop: theme.spacing (6) ,
        marginTop: theme.spacing (3)
    } ,
    editorContainer: {
        height: '100%' ,
        boxSizing: 'border-box'
    } ,

    submit: {
        margin: theme.spacing (3 , 0 , 2) ,
    } ,

}));

const Logout = (props) => {
    const classes = useStyles ()
    const dispatch = useDispatch ()


    const LogoutUser = () => {
        dispatch (actions.logout ())
        props.history.push ('/blog/')
    }
    return (
        <Container maxWidth={'lg'} className={classes.blogContainer}>

            <Grid container spacing={4}>

                <Typography variant={'h2'} color={'primary'}>
                    Are you sure you want to logout
                </Typography>
                <Box item>
                    <Typography>
                        <Button color={'primary'} variant={'outlinedSizeLarge'}
                                onClick={LogoutUser}> Logout</Button>
                    </Typography>
                </Box>

            </Grid>
        </Container>
    );
}

export default withRouter (Logout);