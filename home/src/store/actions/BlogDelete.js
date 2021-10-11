import axios from 'axios';
import * as actionTypes from './actionTypes';
import { tokenConfig } from './auth'

export const blogDeleteStart = () => {
    return {
        type: actionTypes.BLOG_DELETE_START
    }
}

export const blogDeleteSuccess = blogDelete => {
    return {
        type: actionTypes.BLOG_DELETE_SUCCESS ,
        blogDelete
    }
}

export const blogDeleteFail = err => {
    return {
        type: actionTypes.BLOG_DELETE_FAIL ,
        error: err
    }
}

export const blogDelete = (slug , token) => {
    console.log ('blog delete slug' , slug)

    console.log (' expecting token' , token)
    return dispatch => {
        dispatch (blogDeleteStart ());
        if (token) {
            console.log ('blog create  being called' , token)
            axios.defaults.headers = {
                "Content-Type": "application/json" ,
                "Authorization": `Token  ${token}`
            }
        }
        axios.post (`http://127.0.0.1:8000/blog_api/${slug}/delete`)
            .then (res => {
                console.log ('blog  create start  ' , res.data)
                const blogDelete = res.data
                dispatch (blogDeleteSuccess (blogDelete));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (blogDeleteFail (err))
            })
    }
}
