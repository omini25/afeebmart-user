import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import { thunk } from 'redux-thunk';
import rootReducer from './redux/reducer'; // import rootReducer

const store = createStore(rootReducer, applyMiddleware(thunk)); // use rootReducer and apply redux-thunk middleware when creating the store

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
)