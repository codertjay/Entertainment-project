import React , { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container , Grid , Typography } from '@material-ui/core'
import { Redirect , withRouter } from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch , useSelector } from 'react-redux'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import * as actions from "../store/actions/BlogCreate";
import './blogCreate.css'


const useStyles = makeStyles ((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper ,
        height: 'calc(100% - 35px)' ,
        position: 'absolute' ,
        left: '0' ,
        width: '300px' ,
        boxShadow: '0px 0px 2px black'
    } ,
    titleInput: {
        height: '50px' ,
        boxSizing: 'border-box' ,
        border: 'none' ,
        padding: '5px' ,
        fontSize: '24px' ,
        width: 'calc(100% - 300px)' ,
        backgroundColor: '#29487d' ,
        color: 'white' ,
        paddingLeft: '50px'
    } ,
    editIcon: {
        position: 'absolute' ,
        left: '310px' ,
        top: '12px' ,
        color: 'white' ,
        width: '10' ,
        height: '10'
    } ,
    editorContainer: {
        height: '100%' ,
        boxSizing: 'border-box'
    } ,
    blogTitle: {
        fontWeight: 800 ,
        paddingBottom: theme.spacing (3)
    } ,
    form: {
        width: '100%' , // Fix IE 11 issue.
        marginTop: theme.spacing (1) ,
    } ,
    dateField: {
        marginTop: theme.spacing (2) ,
        marginLeft: theme.spacing (1) ,
        marginBottom: theme.spacing (2) ,
        width: 200 ,
    } ,
    category: {
        marginTop: theme.spacing (2) ,
        marginBottom: theme.spacing (2) ,
        marginLeft: theme.spacing (1) ,
        marginRight: theme.spacing (1) ,
        width: 200 ,
    } , fileInput: {
        marginTop: theme.spacing (2) ,
        marginBottom: theme.spacing (2) ,
        marginRight: theme.spacing (1) ,
        paddingLeft: theme.spacing (1) ,
        width: 200 ,
    } ,
    gridMargin: {
        // marginLeft: theme.spacing (1)
    } ,
    submit: {
        margin: theme.spacing (3 , 0 , 2) ,
    } ,
    blogContainer: {
        paddingTop: theme.spacing (6) ,
        marginTop: theme.spacing (6)
    } ,


}));

const modules = {
    toolbar: [
        [{'header': [1 , 2 , 3 , 4 , 5 , false]}] ,
        ['bold' , 'italic' , 'underline' , 'strike' , 'blockquote'] ,
        [{'list': 'ordered'} , {'list': 'bullet'} , {'indent': '-1'} , {'indent': '+1'}] ,
        ['link' , 'image'] ,
        ['clean']
    ] ,
}

const formats = [
    'header' ,
    'bold' , 'italic' , 'underline' , 'strike' , 'blockquote' ,
    'list' , 'bullet' , 'indent' ,
    'link' , 'image'
]
const ArticleCreate = (props) => {
    const classes = useStyles ()
    const [slug , setSlug] = React.useState ("");
    const [Title , setTitle] = React.useState ("");
    const [Description , setDescription] = React.useState ("");
    const [Category , setCategory] = React.useState ("");
    const [Image , setImage] = React.useState (null);
    const [Published_date , setPublished_date] = React.useState ("");
    const dispatch = useDispatch ({})
    const user = useSelector (state => state.auth)

    const inputRef = useRef ()


    const onFinish = (event) => {
        event.preventDefault ()
        const token = user['token']
        if (Category === "") {
            setCategory ("En")
        }
        console.log ('the image coming in ' , Image)

        const _data = {
            'slug': slug ,
            'title': Title ,
            'description': Description ,
            'category': Category ,
            // 'image': Image ,
            'published_date': Published_date
        }
        if (slug) {
            dispatch (actions.blogCreate (_data , token))
            props.history.push (`/blog/${slug}/`)

        }


    }


    if (user.isAuthenticated) {
        return (
            <Container maxWidth={'lg'} className={classes.blogContainer}>
                <Typography variant={'h4'} className={classes.blogTitle} color={'primary'}>
                    Create An Article
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <form className={classes.form} method='Post' onSubmit={onFinish} encType="multipart/form-data">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        margin="normal"
                                        size={'small'}
                                        required
                                        fullWidth
                                        value={Title}
                                        onChange={e => setTitle (e.target.value)}
                                        id="Title"
                                        label="Title"
                                        name="Title"
                                        autoComplete="Title"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        size={'small'}
                                        required
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={slug}
                                        onChange={e => setSlug (e.target.value)}
                                        id="Slug"
                                        label="Slug"
                                        name="Slug"
                                        autoComplete="Slug"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={6} className={classes.gridMargin}>
                                    <TextField
                                        size={'small'}
                                        required
                                        id="published_date"
                                        label="published_date"
                                        color="primary"
                                        type="date"
                                        onLoad={e => setPublished_date (e.target.value)}
                                        onChange={e => setPublished_date (e.target.value)}
                                        defaultValue="2019-05-24"
                                        className={classes.dateField}
                                        InputLabelProps={{
                                            shrink: true ,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl className={classes.category}
                                                 color="primary"
                                                 required
                                                 variant={'outlined'} size={'small'}>
                                        <InputLabel id="demo-simple-select-helper-label">Blog Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={Category}
                                            onChange={e => setCategory (e.target.value)}
                                            onLoad={e => setCategory (e.target.value)}
                                        >
                                            <MenuItem value={'ED'} color="primary"
                                            >Education</MenuItem>
                                            <MenuItem value={'EN'} color="primary"
                                            >Entertainment</MenuItem>
                                            <MenuItem value={'L'} color="primary">Lifestyle</MenuItem>
                                            <MenuItem value={'MT'} color="primary">Modern
                                                technology</MenuItem>
                                        </Select>
                                        <FormHelperText color="primary">Choose blog category</FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} className={classes.gridMargin}>
                                    <input className={classes.fileInput}
                                           required
                                           type="file"
                                           id={'image'}
                                           ref={inputRef}
                                           color={'primary'}
                                           variant="contained"
                                           size={'medium'}
                                           label='Image'
                                           name={'image'}
                                           onChange={e => setImage (inputRef.current.files[0])}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.editorContainer}>
                                        <ReactQuill theme="snow"
                                                    value={Description}
                                                    onChange={setDescription}
                                                    modules={modules}
                                                    bounds={'.app'}
                                                    formats={formats}>
                                        </ReactQuill>
                                    </div>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Create Post
                                </Button>
                            </Grid>

                        </form>

                    </Grid>
                </Grid>
            </Container>
        )
    }else{
        return  <Redirect to={'/login/'}/>
    }
}
export default withRouter (ArticleCreate);
