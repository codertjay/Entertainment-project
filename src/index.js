import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware , combineReducers , compose , createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import blogListReducer from './store/reducers/Blog/blogList';
import blogDetailReducer from './store/reducers/Blog/blogDetail';
import blogCreateReducer from './store/reducers/Blog/blogCreate';
import registerServiceWorker from './registerServiceWorker';
import replyListReducer from './store/reducers/Comment/CommentReplyList';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers ({
    auth: authReducer ,
    blogList: blogListReducer ,
    blogDetail: blogDetailReducer ,
    blogCreate: blogCreateReducer ,
    replyList: replyListReducer,

})

const store = createStore (
    rootReducer
    , composeEnhances (
        applyMiddleware (thunk)
    ));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render (app , document.getElementById ('root'));
registerServiceWorker ();