import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container , Grid , Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import Button from "@material-ui/core/Button";
import { useDispatch , useSelector } from 'react-redux'
import * as actions from "../store/actions/CommentCreate";
import TextField from "@material-ui/core/TextField";
import CommentList from "./CommentList";
import SendIcon from '@material-ui/icons/Send';
import * as _actions from "../store/actions/BlogDetail";

const useStyles = makeStyles ((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper ,
        height: 'calc(100% - 35px)' ,
        position: 'absolute' ,
        left: '0' ,
        width: '300px' ,
        boxShadow: '0px 0px 2px black'
    } ,
    commentTitle: {
        fontWeight: 800 ,
        paddingBottom: theme.spacing (3)
    } ,
    form: {
        width: '100%' ,
        marginTop: theme.spacing (1) ,
        marginBottom: theme.spacing (4) ,
    } ,
    submit: {
        margin: theme.spacing (3 , 0 , 2) ,
    } ,
    blogContainer: {
        paddingTop: theme.spacing (6) ,
        marginTop: theme.spacing (6)
    } ,
    create_comment: {
        width: '100%'
    } ,
    comment_send: {
        alignItems: 'flex-end' ,
        // justifyContent: 'flex-end',
        marginTop: '0px' ,

        display: "flex" ,
        justifyContent: "space-between" ,
        width: "100%" ,
        zIndex: 1 ,
    }


}));

const CommentCreate = (props) => {
    const classes = useStyles ()
    const [parent_id , setParent_id] = React.useState (null);
    const [content , setContent] = React.useState ("");
    const dispatch = useDispatch ({})
    const user = useSelector (state => state.auth)

    const [comment , setComment] = React.useState ({})

    const checkUser = () => {

        console.log ('the user is' , user)
        if (user.token === null || user.token === undefined) {
            console.log ('checking the user')
            props.history.push ('/login/')
        }
    }

    const onFinish = (event) => {
        event.preventDefault ()
        const token = user['token']

        console.log ('the blog detail' , props.blogDetail)
        const {slug} = props.blogDetail
        const _data = {
            'slug': slug ,
            'type': 'post' ,
            'parent_id': parent_id ,
            'content': content ,
        }

        console.log ('thec data fromn the comment ' , _data)
        console.log ('the comment is working' , token)


        if (slug) {
            console.log ('wants to dispatch ')
            dispatch (actions.commentCreate (_data , token))
            dispatch (_actions.blogDetail (slug))
        }
    }

    return (
        <Container maxWidth={'lg'} className={classes.blogContainer}>
            <Typography variant={'h5'} className={classes.commentTitle} color={'primary'}>
                Comment({props.blogDetail?.comment_count || null})
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form className={classes.form} method='Post' onSubmit={onFinish} encType="multipart/form-data">
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.create_comment}
                                    id="outlined-multiline-flexible"
                                    multiline
                                    fullWidth
                                    rows={5}
                                    onKeyUp={checkUser}
                                    value={content}
                                    onChange={e => setContent (e.target.value)}
                                    variant="outlined"
                                    label="content"
                                    name="content"
                                />
                            </Grid>
                            <Grid item xs={7} align={'left'} className={classes.comment_send}>
                                <Button
                                    type="submit"

                                    variant="caption"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    <Typography variant={'body1'} color={'primary'}>comment</Typography>
                                    <SendIcon color={'primary'} align={'right'}/>
                                </Button>
                            </Grid>
                        </Grid>

                    </form>

                </Grid>
                <Grid item xs={12}>
                    {props?.blogDetail && <CommentList blogDetail={props.blogDetail}/>}

                </Grid>

            </Grid>
        </Container>
    )
}
export default withRouter (CommentCreate);