import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image4 from '../images/image4.jpeg'
import {
    Card ,
    Box ,
    CardActionArea ,
    CardActions ,
    CardContent ,
    CardMedia ,
    Grid ,
    Typography , Avatar
} from '@material-ui/core'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import Hoc from '../hoc/hoc'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles ((theme) => ({
    blogContainer: {
        paddingTop: theme.spacing (3)
    } ,
    blogTitle: {
        fontWeight: 800 ,
        paddingBottom: theme.spacing (3)
    } ,
    card: {
        maxWidth: "100%" ,
        minHeight: "400px" ,
        maxHeight: " 400px" ,
        backgroundColor: '#fcfaf9'
    } ,
    media: {
        height: 240
    } ,
    cardActions: {
        display: 'flex' ,
        margin: '0 10px' ,
        justifyContent: 'space-between'
    } ,
    author: {
        display: 'flex' ,

    }

}));


const ArticlesList = (props) => {
    const classes = useStyles ()
    const {blogList} = props
    const {loading} = props.blogList
    console.log ('props fro blog list' , blogList.blogList)
    console.log ('articles list normal proops' , props)

    function truncate (str , n) {
        return str?.length > n ? str.substr (0 , n - 1) + "..." : str;
    }

    if (loading) {
        return (
            <div>loading</div>
        )
    } else {
        return (
            <>
                <Hoc>
                    {Object.keys (blogList.blogList).length > 0 ?
                        <Hoc>
                            {blogList.blogList.map ((blog , index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card className={classes.card}>
                                        <CardActionArea onClick={() => props.history.push (`/blog/${blog?.slug}/`)}>
                                            <CardMedia
                                                className={classes.media}
                                                image={blog?.image || image4}
                                                title={blog?.title}/>

                                            <CardContent>
                                                <Typography gutterBottom variant={'h5'}
                                                            component={'h2'}>
                                                    {blog?.title}
                                                </Typography>
                                                <Typography variant={'body2'}
                                                            color={'textSecondary'}
                                                            component={'p'}>
                                                    {/*Todo: i would put something that would be clicked to display content*/}
                                                    {/*{truncate (blog?.description , 50)}*/}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions className={classes.cardActions}>
                                            <Box className={classes.author}>
                                                <Avatar src={blog?.user.profile.profile_pics || image4}/>
                                                <Box ml={2}>
                                                    <Typography variant={'subtitle2'}
                                                                component={'p'}>
                                                        {blog?.user.username}
                                                    </Typography>
                                                    <Typography variant={'subtitle2'}
                                                                color={'textSecondary'}
                                                                component={'p'}>

                                                        {blog?.timestamp}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box>
                                                {/*<IconButtton>*/}
                                                <BookmarkBorderIcon/>
                                            </Box>
                                        </CardActions>

                                    </Card>
                                </Grid>))}
                        </Hoc> : <div>nothing </div>
                    }
                </Hoc>
            </>

        )
    }

}
export default withRouter (ArticlesList);
