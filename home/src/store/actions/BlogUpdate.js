import axios from 'axios';
import * as actionTypes from './actionTypes';

export const blogUpdateStart = () => {
    return {
        type: actionTypes.BLOG_UPDATE_START
    }
}

export const blogUpdateSuccess = blogUpdate => {
    return {
        type: actionTypes.BLOG_UPDATE_SUCCESS ,
        blogUpdate
    }
}

export const blogUpdateFail = err => {
    return {
        type: actionTypes.BLOG_UPDATE_FAIL ,
        error: err
    }
}

export const blogUpdate = (data , token , slug) => {
    console.log ('the data from this part whole ' , data)
    return dispatch => {
        dispatch (blogUpdateStart ());
        console.log ('blog update  being called' ,)
        axios.defaults.headers = {
            "Content-Type": "application/json" ,
            "Authorization": `Token ${token}`
        };
        axios.put (`http://127.0.0.1:8000/blog_api/${slug}/update/` , {data: data})
            .then (res => {
                console.log ('blog  create start   ' , res.data)
                const blogUpdate = res.data
                dispatch (blogUpdateSuccess (blogUpdate));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (blogUpdateFail (err))
            })
    }
}
