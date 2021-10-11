import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import image3 from '../images/image3.jpeg'
import image2 from '../images/image2.jpeg'
import { Box , Container , Grid , MenuItem , Card , Paper } from '@material-ui/core'
import Articles from './Articles'
import TextField from "@material-ui/core/TextField";
import './blog.css'

const useStyles = makeStyles ((theme) => ({
        hero: {
            backgroundImage: ` linear-gradient(  180deg, transparent,
            rgba(37,37,37,0.61),
            #111
            ),url("${image3}")` ,
            height: '500px' ,
            backgroundPosition: 'center' ,
            backgroundRepeat: 'no-repeat' ,
            marginTop: '60px' ,
            position: 'relative' ,
            backgroundSize: 'cover' ,
            justifyContent: 'center' ,
            alignItems: 'center' ,
            color: '#fff' ,
            fontSize: '4rem' ,

        } ,
        SearchContent: {
            backgrounColor: '#f2ecea' ,
            color: 'white'
        }

    }))
;


const Blog = () => {
    const classes = useStyles ()
    const [search , setSearch] = useState ('')
    const [category , setCategory] = useState ('')

    return (
        <>
            <Box className={classes.hero}>
                <Box align={'center'} mb={5}>Entertainment Blog</Box>
                <Box align={'center'} mt={5} className={classes.SearchContent}>

                    <form action="" inline method={'Post'}>
                        <Grid item xs={12} md={10}>
                            <Paper>
                                <TextField
                                    // variant=""
                                    margin="normal"
                                    size={'medium'}
                                    fullWidth={true}
                                    value={search}
                                    floatingLabelText="Search for content"
                                    placeholder="Search for content"
                                    onChange={e => setSearch (e.target.value)}
                                    id="search"
                                    name="search"
                                    label="Search for content"
                                />

                            </Paper>
                        </Grid>
                    </form>

                </Box>
            </Box>

            <Articles search={search} category={category}  className={'blog'}/>
        </>

    )
}

export default Blog;
// <br/>
// {/*<SelectField*/
// }
// {/*    floatingLabelText={'Category'}*/
// }
// {/*    value={category}*/
// }
// {/*     onChange={e => setSearch (e.target.value)}*/
// }
// {/*>*/
// }
// {/*    <MenuItem value={''} primaryText={''}/>*/
// }
// {/*    <MenuItem value={''} primaryText={''}/>*/
// }
// {/*    <MenuItem value={''} primaryText={''}/>*/
// }
// {/*    <MenuItem value={''} primaryText={''}/>*/
// }
// {/*    <MenuItem value={''} primaryText={''}/>*/
// }
// {/*    <MenuItem value={''} primaryText={''}/>*/
// }
//
// {/*</SelectField>*/
// }