import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    commentReplyList: {} ,
    error: null ,
    loading: false
}

const commentReplyListStart = (state , action) => {
    return updateObject (state , {
        commentReplyList: {} ,
        error: null ,
        loading: true
    });
}

const commentReplyListSuccess = (state , action) => {
    return updateObject (state , {
        commentReplyList: action.commentReplyList ,
        error: null ,
        loading: false
    });
}

const commentReplyListFail = (state , action) => {
    return updateObject (state , {
        ...state ,
        error: action.error ,
        loading: false
    });
}




const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.COMMENT_REPLY_LIST_START:
            return commentReplyListStart (state , action);
        case actionTypes.COMMENT_REPLY_LIST_SUCCESS:
            return commentReplyListSuccess (state , action);
        case actionTypes.COMMENT_REPLY_LIST_FAIL:
            return commentReplyListFail (state , action);
        default:
            return state;
    }
}

export default reducer;