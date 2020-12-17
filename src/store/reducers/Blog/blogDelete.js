import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    blogDelete: null ,
    error: null ,
    loading: false
}

const blogDeleteStart = (state , action) => {
    return updateObject (state , {
        blogDelete: null ,
        error: null ,
        loading: true
    });
}

const blogDeleteSuccess = (state , action) => {
    return updateObject (state , {
        blogDelete: action.blogDelete ,
        error: null ,
        loading: false
    });
}

const blogDeleteFail = (state , action) => {
    return updateObject (state , {
        ...state ,
        error: action.error ,
        loading: false
    });
}


const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.BLOG_DELETE_START:
            return blogDeleteStart (state , action);
        case actionTypes.BLOG_DELETE_SUCCESS:
            return blogDeleteSuccess (state , action);
        case actionTypes.BLOG_DELETE_FAIL:
            return blogDeleteFail (state , action);
        default:
            return state;
    }
}

export default reducer;