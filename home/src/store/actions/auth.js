import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = user => {
    return {
        type: actionTypes.AUTH_SUCCESS ,
        user
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL ,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem ('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout (() => {
            dispatch (logout ());
        } , expirationTime * 1000)
    }
}

export const authLogin = (username , password) => {
    return dispatch => {
        dispatch (authStart ());
        console.log ('login being called' , username , password)
        axios.defaults.headers = {
            "Content-Type": "application/json" ,
        };
        axios.post ('http://127.0.0.1:8000/rest-auth/login/' , {
            username: username ,
            password: password
        })
            .then (res => {
                console.log ('User logged in ' , res.data)
                const user = {
                    token: res.data.key ,
                    username: res.data.user.username ,
                    userId: res.data.user.id ,
                    user: res.data.user ,
                    is_staff: res.data.user.is_staff ,
                    expirationDate: new Date (new Date ().getTime () + 3600 * 1000)
                }
                localStorage.setItem ('user' , JSON.stringify (user));
                dispatch (authSuccess (user));
                dispatch (checkAuthTimeout (3600));
                console.log (res.data)
            })
            .catch (err => {
                console.error (err?.status  || "There was an error with your details")
                console.log (err)
                dispatch (authFail (err))
            })
    }
}

export const authSignup = (username , email , password1 , password2 , user_type) => {
    console.log ('signup being called')
    return dispatch => {
        dispatch (authStart ());
        const user = {
            username ,
            email ,
            password1 ,
            password2 ,
            user_type ,
        }
        console.log (user)
        const config = {
            headers: {
                'Content-Type': 'application/json' ,
            }
        }
        axios.post ('http://127.0.0.1:8000/rest-auth/registration/' , user , config)
            .then (res => {
                console.log ('User Signed up ')
                const user = {
                    token: res.data.key ,
                    username: res.data.user.username ,
                    userId: res.data.user.id ,
                    user: res.data.user ,
                    expirationDate: new Date (new Date ().getTime () + 3600 * 1000)

                }
                localStorage.setItem ('user' , JSON.stringify (user));
                dispatch (authSuccess (user));
                dispatch (checkAuthTimeout (3600));
                console.log (res.data)
            })
            .catch (err => {
                dispatch (authFail (err))
                console.error ()

            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const user = JSON.parse (localStorage.getItem ('user'))
        if (user === undefined || user === null) {
            dispatch (logout ());
        } else {
            const expirationDate = new Date (user.expirationDate);
            if (expirationDate <= new Date ()) {
                dispatch (logout ());
            } else {
                dispatch (authSuccess (user));
                dispatch (checkAuthTimeout ((expirationDate.getTime () - new Date ().getTime ()) / 1000));
            }
        }
    }
}


// SETUP CONFIG WITH TOKEN -- HELPER FUNCTION
export const tokenConfig = getState => {

    // Get token from state
    const token = getState().auth.token
    console.log ('full details ' , getState ().auth)

    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json' ,
        }
    }
    // If token, add to headers
    if (token) {
        config.headers['Authorization'] = `key ${token}`
    }
    return config
}