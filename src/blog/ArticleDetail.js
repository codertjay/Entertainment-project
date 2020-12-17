import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button , Container , Grid , Typography , CardHeader , Card } from '@material-ui/core'
import { useDispatch , useSelector } from 'react-redux'
import * as _actions from "../store/actions/BlogDetail"
import CardMedia from "@material-ui/core/CardMedia";
import image4 from "../images/image4.jpeg";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { GridList } from '@material-ui/core/GridList'
import ArticleUpdate from './ArticleUpdate'
import Dialog from "@material-ui/core/Dialog";
import CommentCreate from '../comment/CommentCreate'
import CommentList from '../comment/CommentList'
import ArticleDelete from './ArticleDelete'
import Hoc from "../hoc/hoc";
import ArticleDetailSide from './ArticleDetailSide'


const useStyles = makeStyles ((theme) => ({
    blogContainer: {
        paddingTop: theme.spacing (3) ,
        backgroundColor: '#fcfaf9'
    } ,
    blogTitle: {
        fontWeight: 800 ,
        paddingBottom: theme.spacing (3) ,
        [theme.breakpoints.down ('xs')]: {
            fontSize: '2px' ,
            marginLeft: '0px' ,
        }

    } ,

    card: {
        maxWidth: '100%'
    } ,
    media: {
        height: 300 ,
        width: '100%' ,

    } ,
    description: {
        paddingBottom: theme.spacing (6) ,
        paddingTop: theme.spacing (3) ,
        marginTop: theme.spacing (3)

    } ,
}));


const ArticleDetail = (props) => {
    const classes = useStyles ()
    const dispatch = useDispatch ({})
    const is_staff = useSelector (state => state.auth.is_staff)
    const blogDetail = useSelector (state => state.blogDetail.blogDetail)
    console.log ('the porps  paremas' , props.match.params.id)
    const slug = props.match.params.id
    const [dialogState , setDialogState] = React.useState ({open: false});
    const ReactMarkdown = require ("react-markdown/with-html")


    const handleOpen = () => {
        setDialogState ({open: true})
    }

    const handleClose = () => {
        setDialogState ({open: false})
    }

    const actions = [
        <Button label={"Close"} primary={true}
                onClick={handleClose}/>
    ]

    console.log ('the blog detail from useerv' , blogDetail)

    console.log ('the staff' , is_staff)
    const CheckUser = () => {
        if (is_staff) {
            return (
                <Box>
                    <Button
                        color={'primary'}
                        onClick={handleOpen}>Update
                    </Button>
                    <ArticleDelete slug={props.slug}/>
                </Box>)
        } else {
            return null
        }
    }

    useEffect (() => {
        if (slug) {
            dispatch (_actions.blogDetail (slug))
        }
    } , [slug])

    function truncate (str , n) {
        return str?.length > n ? str.substr (0 , n - 1) + "..." : str;
    }

    const blogDescription = blogDetail?.description || null

    return (
        <div className={classes.blogContainer}>
            <Container maxWidth={'lg'}>
                <Typography variant={'h4'} className={classes.blogTitle} align={'center'} valign={'center'}>
                    Articles
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10} md={10} lg={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image={blogDetail?.image || image4}
                                        title={blogDetail?.title}/>
                                    <CardHeader
                                        avatar={
                                            <Avatar src={blogDetail?.user.profile.profile_pics}/>
                                        }/>
                                    <CardContent>

                                        <CheckUser/>

                                        <Dialog
                                            fullScreen
                                            title={'update blog post'}
                                            modal={false}
                                            actions={actions}
                                            open={dialogState.open}
                                            onRequestClose={handleClose}>
                                            <Box>
                                                <br/>
                                                <Button onClick={handleClose}
                                                        color={'primary'}>
                                                    Close dialog
                                                </Button>
                                                <ArticleUpdate blogDetail={blogDetail}/>

                                            </Box>

                                        </Dialog>
                                    </CardContent>

                                </Card>
                            </Grid>
                            <Box>
                                <Typography align={'center'} variant={'h4'} ml={'4'}>
                                    {blogDetail?.title}
                                </Typography>
                            </Box>
                            <Grid item xs={12}>
                                <Box className={classes.description}>
                                    <Typography variant={'body1'} color={'textSecondary'}>
                                        <br/>
                                        <div className="ql-editor" style={{padding: 0}}>
                                            <ReactMarkdown escapeHtml={false} source={blogDetail?.description}/>
                                        </div>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={0} sm={2} md={2} lg={4}>
                        <ArticleDetailSide blogDetail={blogDetail}/>
                    </Grid>

                    <Grid item xs={8} grid-xs-auto="true">

                        <CommentCreate blogDetail={blogDetail}/>

                    </Grid>
                </Grid>

            </Container>
        </div>

    )
}
// src={blogDetail.user.profile.profile_pics}

export default ArticleDetail;