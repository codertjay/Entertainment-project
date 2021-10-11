import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar , Button , Card , CardContent , CardHeader , Grid , Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import PersonIcon from '@material-ui/icons/Person';
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { commentCreate } from "../store/actions/CommentCreate";
import * as actions from "../store/actions/CommentReplyList";
import Hoc from "../hoc/hoc";

const useStyles = makeStyles ((theme) => ({}))
;


const CommentsReplyList = (props) => {
    const classes = useStyles ()
    const dispatch = useDispatch ({})
    const replies = useSelector (state => state.replyList)
    const replies_loading = useSelector (state => state.replyList.loading)

    const token = useSelector (state => state.auth.token)
    const [content , setContent] = React.useState ("");
    console.log ('the comment replies' , replies)
    console.log ('the comment  replies_loading' , replies_loading)
    const parent_id = props.comment_id

    console.log ('the real parent id' , parent_id)
    const checkUser = () => {
        console.log ('the user is' , token)
        if (token === null || token === undefined) {
            console.log ('checking the user')
            props.history.push ('/login/')
        }
    }


    const onFinish = () => {
        console.log ('the blog detail' , props.blogDetail)
        const slug = props.slug
        const _data = {
            'slug': slug ,
            'type': 'post' ,
            'parent_id': parent_id ,
            'content': content ,
        }

        console.log ('thec data fromn the comment ' , _data)
        console.log ('the comment is working' , token)

        if (slug) {
            console.log ('this is the parent first  ' , parent_id)
            dispatch (commentCreate (_data , token))
            setContent ("")
            console.log ('this is the parent sercond ' , parent_id)
            dispatch (actions.commentReplyList (parent_id))
        }
    }

    console.log ('this is the replu ' , replies)

    if (replies_loading) {
        return (
            <div>loading </div>
        )
    } else {
        return (
            <div>
                <>
                    <Grid container spacing={3} key={'index'}>

                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <CardHeader
                                    title={replies?.commentReplyList.user.username}
                                    subheader="Legend"
                                    avatar={
                                        <Avatar
                                            src={`${replies?.commentReplyList.user.profile.profile_pics}`}>
                                        </Avatar>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="caption">{replies.timestamp}</Typography>
                                    <Typography>
                                        {replies?.commentReplyList?.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item alignItems={"center"} xs={12}>
                            <form className={classes.form} method='Post'
                                  encType="multipart/form-data">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.create_comment}
                                            id="outlined-multiline-flexible"
                                            multiline
                                            fullWidth
                                            onClick={checkUser}
                                            value={content}
                                            rows={5}
                                            onChange={e => setContent (e.target.value)}
                                            variant="outlined"
                                            label="content"
                                            name="content"
                                        />

                                    </Grid>
                                    <Grid item xs={12} align={'left'}>
                                        <Button
                                            onClick={onFinish}
                                            variant="caption"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            <Typography variant={'body1'}
                                                        color={'primary'}>comment</Typography>
                                            <SendIcon color={'primary'} align={'right'}/>
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>
                        </Grid>

                        <>
                            {
                                Object.keys (replies.commentReplyList?.replies).length > 0 ? (
                                    <>
                                        {replies.commentReplyList?.replies.map ((comment , index) => (
                                            <Grid item xs={12} key={index}>
                                                <Card className={classes.card}>
                                                    <CardHeader
                                                        title={comment.user.username}
                                                        subheader="Legend"
                                                        avatar={
                                                            <Avatar
                                                                src={`${comment?.user.profile.profile_pics}`}>
                                                            </Avatar>
                                                        }
                                                    />
                                                    <CardContent>
                                                        <Typography variant="caption">{comment.timestamp}</Typography>
                                                        <Typography>
                                                            {comment.content}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))
                                        }
                                    </>
                                ) : (
                                    <div> none </div>
                                )
                            }
                        </>
                    </Grid>

                </>
            </div>)
    }
}

export default withRouter (CommentsReplyList);
