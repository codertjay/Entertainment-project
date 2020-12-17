import axios from 'axios';
import * as actionTypes from './actionTypes';

export const blogListStart = () => {
    return {
        type: actionTypes.BLOG_LIST_START
    }
}

export const blogListSuccess = blogList => {
    return {
        type: actionTypes.BLOG_LIST_SUCCESS ,
        blogList
    }
}

export const blogListFail = err => {
    return {
        type: actionTypes.BLOG_LIST_FAIL ,
        error: err
    }
}

export const blogList = (search , category) => {
    return dispatch => {
        dispatch (blogListStart ());
        console.log ('blog list  being called' ,)
        axios.defaults.headers = {
            "Content-Type": "application/json" ,
        };
        axios.get (`http://127.0.0.1:8000/blog_api/?search=${search}&category=${category}`)
            .then (res => {
                console.log ('blog  list start   ' , res.data)
                const blogList = res.data
                dispatch (blogListSuccess (blogList));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (blogListFail (err))
            })
    }
}
