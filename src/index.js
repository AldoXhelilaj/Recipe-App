import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducerAuth from './reducers/auth';
import logger from './middleware/logger'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: reducerAuth
 
});

 const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk,logger)
    ));
    export default store;








ReactDOM.render(

<Provider store={store} >
<BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

