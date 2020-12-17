import axios from 'axios';
import * as actionTypes from './actionTypes';

export const blogDetailStart = () => {
    return {
        type: actionTypes.BLOG_DETAIL_START
    }
}

export const blogDetailSuccess = blogDetail => {
    return {
        type: actionTypes.BLOG_DETAIL_SUCCESS ,
        blogDetail
    }
}

export const blogDetailFail = err => {
    return {
        type: actionTypes.BLOG_DETAIL_FAIL ,
        error: err
    }
}

export const blogDetail = (slug) => {
    return dispatch => {
        dispatch (blogDetailStart ());
        console.log ('blog detail  being called' ,)
        axios.defaults.headers = {
            "Content-Type": "application/json" ,
        };
        axios.get (`http://127.0.0.1:8000/blog_api/${slug}/`)
            .then (res => {
                console.log ('blog  list start   ' , res.data)
                const blogDetail = res.data
                dispatch (blogDetailSuccess (blogDetail));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (blogDetailFail (err))
            })
    }
}
