import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    blogDetail: null ,
    error: null ,
    loading: false
}

const blogDetailStart = (state , action) => {
    return updateObject (state , {
        blogDetail: null ,
        error: null ,
        loading: true
    });
}

const blogDetailSuccess = (state , action) => {
    return updateObject (state , {
        blogDetail: action.blogDetail ,
        error: null ,
        loading: false
    });
}

const blogDetailFail = (state , action) => {
    return updateObject (state , {
        ...state ,
        error: action.error ,
        loading: false
    });
}


const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.BLOG_DETAIL_START:
            return blogDetailStart (state , action);
        case actionTypes.BLOG_DETAIL_SUCCESS:
            return blogDetailSuccess (state , action);
        case actionTypes.BLOG_DETAIL_FAIL:
            return blogDetailFail (state , action);
        default:
            return state;
    }
}

export default reducer;