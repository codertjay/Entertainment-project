import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar ,
    Box ,
    Button ,
    Card ,
    CardActions ,
    CardContent ,
    CardHeader ,
    Container ,
    Grid ,
    Typography
} from '@material-ui/core'
import Hoc from '../hoc/hoc'
import { withRouter } from 'react-router-dom'
import CommentReplyList from './CommentReplyList'
import { commentCreate } from '../store/actions/CommentCreate'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import * as actions from "../store/actions/CommentReplyList";
import { useDispatch , useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles ((theme) => ({
        content: {
            marginLeft: theme.spacing (1) ,

        } ,
        card_content: {
            marginLeft: theme.spacing (6) ,
        } ,
        timestamp: {
            marginLeft: theme.spacing (6)
        } ,
        card: {
            marginBottom: theme.spacing (2) ,
            maxWidth: '100%' ,
            minWidth: '500px' ,
            minHeight: '50px' ,
            [theme.breakpoints.down ('xs')]: {
                fontSize: '2px' ,
                minWidth: '400px' ,
                marginLeft: '0px' ,
            }

        } ,
        cardheader: {
            paddingTop: '1px' ,
            paddingBottom: '0px'
        } ,
        media: {
            height: 240
        } ,
        cardContent: {
            paddingTop: '0px' ,
            marginTop: '0px' ,
        } ,
        gridClass: {
            [theme.breakpoints.down ('xs')]: {
                marginLeft: '0px' ,
            }

        } ,
        reply_box: {
            display: "flex" ,
            justifyContent: "space-between" ,
            width: "100%" ,
            padding: "20px" ,
            zIndex: 1 ,

        } ,
        dialogStyle: {
            height: '80%' ,
            width: '80%'
        }

    }))
;


const CommentsList = (props) => {
    const classes = useStyles ()
    const {blogDetail} = props
    const [comment_id , setCommentId] = useState (null)
    const dispatch = useDispatch ({})
    const token = useSelector (state => state.auth.token)
    const [parent_id , setParent_id] = React.useState (null);
    const [content , setContent] = React.useState ("");
    const [open , setOpen] = useState (false);

    const onClose = () => {
        setOpen (false);
    };


    const onOpen = (id) => {
        setOpen (true);

        if (id) {
            dispatch (actions.commentReplyList (id))
            setCommentId (id)
            console.log ('the replies' , id)
        }


    };


    if (blogDetail?.comments) {
        return (
            <>
                <Hoc>
                    <Box align={'center'}>
                        {comment_id &&
                        <Dialog open={open} onClose={onClose}
                                maxWidth="xl"
                                fullWidth
                                className={classes.dialogStyle}
                        >
                            <DialogTitle>
                                {/*{comment_id}*/}
                            </DialogTitle>
                            <DialogContent>

                                <Container>

                                    <Grid container spacing={3}>
                                        {comment_id}
                                        {comment_id &&
                                        <Grid item xs={12}>
                                            <CommentReplyList comment_id={comment_id}
                                                              slug={props.blogDetail.slug}/>
                                        </Grid>}


                                    </Grid>
                                </Container>

                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={onClose}
                                    color="secondary"
                                >
                                    close
                                </Button>
                            </DialogActions>

                        </Dialog>
                        }
                    </Box>
                    {Object.keys (blogDetail.comments).length > 0 ?
                        <Hoc>
                            {blogDetail.comments.map ((comment , index) => (
                                <Grid item xs={12} sm={6} md={4} key={index} className={classes.gridClass}>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            title={comment.user?.username || null}
                                            subheader="Legend"
                                            avatar={
                                                <Avatar
                                                    src={`http://127.0.0.1:8000${comment?.user.profile.profile_pics}`}>
                                                </Avatar>
                                            }
                                        />
                                        <CardContent>
                                            <Typography variant="caption"
                                                        color={'inherit'}>{comment.timestamp}
                                            </Typography>

                                            <Box ml={'6'}>
                                                <Typography color={'primary'}>
                                                    {comment.content}
                                                </Typography>
                                            </Box>
                                        </CardContent>


                                        <CardActions disableActionSpacing className={classes.actions}>
                                            <Box className={classes.reply_box}>
                                                <Box>
                                                    {comment?.reply_count > 0 ? <>{comment.reply_count}</> : null}
                                                </Box>
                                                <Box ml={0} mb={0}>
                                                    <Button
                                                        onClick={() => onOpen (comment.id)}
                                                        color={'primary'}
                                                        variant={'contained'}>
                                                        Reply {comment?.id}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </CardActions>
                                    </Card>


                                </Grid>))}
                        </Hoc> : <Box mt={5} mb={5}>
                            <Typography variant={'body'} color={'primary'} align={'center'}>
                                There is no comment
                            </Typography>
                        </Box>
                    }
                </Hoc>
            </>

        )
    } else {
        return (
            <Box mt={5} mb={5}>
                <Typography variant={'body'} color={'primary'} align={'center'}>

                </Typography>
            </Box>
        )
    }
}
export default withRouter (CommentsList);
