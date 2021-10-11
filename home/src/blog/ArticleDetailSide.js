import React , { Component } from 'react';
import { Card , CardHeader , Box , Avatar , CardMedia } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import image4 from "../images/image4.jpeg";


const useStyles = makeStyles ((theme) => ({
    card: {
        maxWidth: '100%' ,
        [theme.breakpoints.down ('xs')]: {
            display: 'none' ,
        }
    } ,
    media: {
        height: 240 ,
        width: "100%"
    } ,

}));


const ArticleDetailSide = (props) => {
    const classes = useStyles ()

    console.log ('the props from artivle dexdnvmdvn' , props.blogDetail)
    if (props.blogDetail !== null) {
        const {blogDetail} = props
        return (
            <Box>

                <Card className={classes.card}>

                    <CardMedia className={classes.media}
                               image={blogDetail.user?.profile.profile_pics || null}
                               title={blogDetail?.user.username || null}/>

                </Card>
            </Box>
        )
    } else {
        return null
    }
}

export default ArticleDetailSide;