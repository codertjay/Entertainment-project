import React , { useState , useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBarDrawer from './AppBarDrawer'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles ((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    }
}));


const MyAppBar = (props) => {
    const classes = useStyles ()
    const token = useSelector (state => state.auth.token)


    return (
        <AppBar position={'fixed'} className={classes.appBar}>
            <Toolbar>
                <Typography variant={'h6'} color={'primary'}>
                    Entertained
                </Typography>

                <AppBarDrawer/>


                <Box align={'right'} display={'flex'} align={'right'}>
                    <>
                        {
                            token ?
                                <Typography variant={'h6'}
                                            onClick={() => props.history.push ('/logout/')}
                                            color={'primary'}>
                                    Logout {"  "}
                                </Typography>
                                :
                                <>
                                    <Typography variant={'h6'}
                                                onClick={() => props.history.push ('/login/')}
                                                color={'primary'} style={{marginRight: '10px'}}>
                                        Login {"  "}
                                    </Typography>
                                    <Typography variant={'h6'}
                                                onClick={() => props.history.push ('/signup/')}
                                                color={'primary'}>
                                        Signup {"   "}
                                    </Typography>
                                </>
                        }
                    </>


                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default withRouter (MyAppBar);