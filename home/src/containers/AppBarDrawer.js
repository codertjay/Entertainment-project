import React , { useState } from 'react';
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom'


const AppBarDrawer = (props) => {
    const [open , setOpen] = useState (false);
    const [content , setContent] = useState ('Home');

    const onClick = (path) => {

        console.log ('calling on click')
        if (path !== undefined || null) {
            console.log ('this is the path' , path)
        }

        console.log ('there is not path')
    };
// justify="space-between"
    return (
        <Grid container >
            <Grid item>
                <Typography>{content}</Typography>
            </Grid>
            <Grid item>
                <Drawer open={open} onClose={() => setOpen (false)}>
                    <List>
                        <ListItem
                            button
                            onClick={() => props.history.push ('/blog/')}
                        >
                            <ListItemText>Blog</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => props.history.push ('/movie/')}
                        >
                            <ListItemText>Movie</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => props.history.push ('/thriller/')}
                        >
                            <ListItemText>Thriller</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => props.history.push ('/music/')}
                        >
                            <ListItemText>Music</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
            </Grid>

            <Grid item>
                <Button onClick={() => setOpen (!open)}>
                    {open ? 'Hide' : 'Show'} Drawer
                </Button>
            </Grid>
        </Grid>
    );
}


export default withRouter (AppBarDrawer)