import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    blogUpdate: null ,
    error: null ,
    loading: false
}

const blogUpdateStart = (state , action) => {
    return updateObject (state , {
        blogUpdate: null ,
        error: null ,
        loading: true
    });
}

const blogUpdateSuccess = (state , action) => {
    return updateObject (state , {
        blogUpdate: action.blogUpdate ,
        error: null ,
        loading: false
    });
}

const blogUpdateFail = (state , action) => {
    return updateObject (state , {
        ...state ,
        error: action.error ,
        loading: false
    });
}


const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.BLOG_UPDATE_START:
            return blogUpdateStart (state , action);
        case actionTypes.BLOG_UPDATE_SUCCESS:
            return blogUpdateSuccess (state , action);
        case actionTypes.BLOG_UPDATE_FAIL:
            return blogUpdateFail (state , action);
        default:
            return state;
    }
}

export default reducer;