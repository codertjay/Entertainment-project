import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    isAuthenticated:false,
    username: null,
    userId: null,
    error: null,
    is_staff: false,
    loading: false,
    user: {}
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        is_staff: false,
        isAuthenticated:false,
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.user.token,
        username: action.user.username,
        userId: action.user.userId,
        user: action.user.user,
        isAuthenticated:true,
        is_staff: action.user.is_staff,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isAuthenticated:false,
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;