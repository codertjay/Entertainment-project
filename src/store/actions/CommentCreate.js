import axios from 'axios';
import * as actionTypes from './actionTypes';
import { tokenConfig } from './auth'

export const commentCreateStart = () => {
    return {
        type: actionTypes.COMMENT_CREATE_START
    }
}

export const commentCreateSuccess = commentCreate => {
    return {
        type: actionTypes.COMMENT_CREATE_SUCCESS ,
        commentCreate
    }
}

export const commentCreateFail = err => {
    return {
        type: actionTypes.COMMENT_CREATE_FAIL ,
        error: err
    }
}

export const commentCreate = (_data , token) => {
    console.log ('the data from this part whole ' , _data)

    console.log (' expecting' , _data)
    console.log (' expecting token' , token)
    return dispatch => {
        dispatch (commentCreateStart ());
        if (token) {
            console.log ('comment create  being called' , token)
            axios.defaults.headers = {
                "Content-Type": "application/json" ,
                "Authorization": `Token  ${token}`
            }
        }
        axios.post (`http://127.0.0.1:8000/comments_api/create/` , {
            'type': _data['type'] ,
            'slug': _data['slug'] ,
            'parent_id': _data['parent_id'] ,
            'content': _data['content'] ,
        })
            .then (res => {
                console.log ('comment  create start  ' , res.data)
                const commentCreate = res.data
                dispatch (commentCreateSuccess (commentCreate));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (commentCreateFail (err))
            })
    }
}
