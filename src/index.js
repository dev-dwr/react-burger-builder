import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware,compose} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'

const composeEnhancers = window.__REDUX_DEVTOOLSKO_EXTENSION_COMPOSE__ || compose;

const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
