import axios from 'axios';
import * as actionTypes from './actionTypes';

export const commentReplyListStart = () => {
    return {
        type: actionTypes.COMMENT_REPLY_LIST_START
    }
}

export const commentReplyListSuccess = commentReplyList => {
    return {
        type: actionTypes.COMMENT_REPLY_LIST_SUCCESS ,
        commentReplyList
    }
}

export const commentReplyListFail = err => {
    return {
        type: actionTypes.COMMENT_REPLY_LIST_FAIL ,
        error: err
    }
}

export const commentReplyList = (id) => {
    return dispatch => {
        dispatch (commentReplyListStart ());
        console.log ('commentReply list  being called' ,)
        axios.defaults.headers = {
            "Content-Type": "application/json" ,
        };
        axios.get (`http://127.0.0.1:8000/comments_api/${id}`)
            .then (res => {
                console.log ('commentReply  list start   ' , res.data)
                const replylist =  res.data
                dispatch (commentReplyListSuccess (replylist));
            })
            .catch (err => {
                console.error (err)
                console.log (err)
                dispatch (commentReplyListFail (err))
            })
    }
}
