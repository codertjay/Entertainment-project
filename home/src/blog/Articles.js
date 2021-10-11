import React , { useEffect , useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container , Grid , Typography } from '@material-ui/core'
import ArticlesList from './ArticlesList'
import image4 from '../images/image4.jpeg'
import { connect , useDispatch , useSelector } from 'react-redux'
import * as actions from "../store/actions/BlogList"

const useStyles = makeStyles ((theme) => ({
    blogContainer: {
        paddingTop: theme.spacing (3) ,
        backgroundColor: '#dbd1ce'
    } ,
    blogTitle: {
        fontWeight: 800 ,
        paddingBottom: theme.spacing (3)
    } ,

}));


const Articles = (props) => {
    const classes = useStyles ()
    console.log ('articles props' , props)
    const dispatch = useDispatch ({})
    const blogList = useSelector (state => state.blogList)
    console.log ('the slecydvdnmjcfvndfj' , blogList)
    const search = props?.search
    const category = props?.category

    useEffect (() => {
        dispatch (actions.blogList (search , category))
    } , [search , category])

    return (
        <div className={classes.blogContainer}>
            <Container maxWidth={'lg'} >
                <Typography variant={'h4'} className={classes.blogTitle}>
                    Articles
                </Typography>
                <Grid container spacing={3}>
                    <ArticlesList blogList={blogList}
                    />
                </Grid>
            </Container>
        </div>
    )
}


export default Articles;