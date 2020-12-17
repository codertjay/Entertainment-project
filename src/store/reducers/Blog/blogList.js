import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    blogList: {} ,
    error: null ,
    loading: false
}

const blogListStart = (state , action) => {
    return updateObject (state , {
        blogList: {} ,
        error: null ,
        loading: true
    });
}

const blogListSuccess = (state , action) => {
    return updateObject (state , {
        blogList: action.blogList.results ,
        error: null ,
        loading: false
    });
}

const blogListFail = (state , action) => {
    return updateObject (state , {
        ...state ,
        error: action.error ,
        loading: false
    });
}


const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.BLOG_LIST_START:
            return blogListStart (state , action);
        case actionTypes.BLOG_LIST_SUCCESS:
            return blogListSuccess (state , action);
        case actionTypes.BLOG_LIST_FAIL:
            return blogListFail (state , action);
        default:
            return state;
    }
}

export default reducer;