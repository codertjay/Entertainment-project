import React from 'react';
import { Button , Typography } from '@material-ui/core'
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import * as _actions from "../store/actions/BlogDelete"
import { Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'

const ArticleDelete = (props) => {
    const [dialogState , setDialogState] = React.useState ({open: false});

    const _token = useSelector (state => state.auth)
    const handleOpen = () => {
        setDialogState ({open: true})
    }

    const slug = props.slug
    const token = _token['token']
    const deleteArticle = (slug , token) => {
        if (slug) {
            _actions.blogDelete (slug , token)
            props.history.push ('/blog/')

        }
    }

    const handleClose = () => {
        setDialogState ({open: false})
    }

    const actions = [
        <Button label={"Close"} primary={true}
                onClick={handleClose}/>
    ]

    return (
        <Box>
            <Button
                color={'error'}
                onClick={handleOpen}>Delete
            </Button>
            <Dialog
                title={'update blog post'}
                modal={false}
                actions={actions}
                open={dialogState.open}
                onRequestClose={handleClose}>
                <Box>
                    <br/>

                    <Box>
                        <Typography variant={'body1'} color={'textSecondary'}>
                            Are you sure you want to delete this post
                        </Typography>
                        <Button onClick={handleClose}
                                color={'primary'}>
                            Close
                        </Button>
                        <Button onClick={deleteArticle}
                                color={'primary'}>
                            Delete
                        </Button>
                    </Box>

                </Box>

            </Dialog>
        </Box>
    );
}

export default withRouter (ArticleDelete);
