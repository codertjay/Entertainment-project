import axios from 'axios';
import * as actionTypes from './actionTypes';
import { tokenConfig } from './auth'

export const blogCreateStart = () => {
    return {
        type: actionTypes.BLOG_CREATE_START
    }
}

export const blogCreateSuccess = blogCreate => {
    return {
        type: actionTypes.BLOG_CREATE_SUCCESS ,
        blogCreate
    }
}

export const blogCreateFail = err => {
    return {
        type: actionTypes.BLOG_CREATE_FAIL ,
        error: err
    }
}

export const blogCreate = (_data , token) => {
    console.log ('the data from this part whole ' , _data)

    console.log (' expecting' , _data)
    console.log (' expecting token' , token)
    return dispatch => {
        dispatch (blogCreateStart ());
        if (token) {
            console.log ('blog create  being called' , token)
            axios.defaults.headers = {
                "Content-Type": "application/json" ,
                "Authorization": `Token  ${token}`
            }
        }
        axios.post (`http://127.0.0.1:8000/blog_api_create/` , {
            'image': _data['image'] ,
            'slug': _data['slug'] ,
            'title': _data['title'] ,
            'description': _data['description'] ,
            'category': _data['category'] ,
            'published_date': _data['published_date']
        })
            .then (res => {
                console.log ('blog  create start  ' , res.data)
                const blogCreate = res.data
                dispatch (blogCreateSuccess (blogCreate));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (blogCreateFail (err))
            })
    }
}
