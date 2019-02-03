import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware,compose, combineReducers} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import  orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    burger:burgerBuilderReducer,
    order:orderReducer,
    auth:authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
