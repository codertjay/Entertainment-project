import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    blogCreate: null ,
    error: null ,
    loading: false
}

const blogCreateStart = (state , action) => {
    return updateObject (state , {
        blogCreate: null ,
        error: null ,
        loading: true
    });
}

const blogCreateSuccess = (state , action) => {
    return updateObject (state , {
        blogCreate: action.blogCreate ,
        error: null ,
        loading: false
    });
}

const blogCreateFail = (state , action) => {
    return updateObject (state , {
        ...state ,
        error: action.error ,
        loading: false
    });
}


const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.BLOG_CREATE_START:
            return blogCreateStart (state , action);
        case actionTypes.BLOG_CREATE_SUCCESS:
            return blogCreateSuccess (state , action);
        case actionTypes.BLOG_CREATE_FAIL:
            return blogCreateFail (state , action);
        default:
            return state;
    }
}

export default reducer;