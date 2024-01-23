import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import { createStore, configureStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { createRoot } from "react-dom/client";

import reducers from './reducers';

import App from "./App";
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const domNode = document.getElementById("root");
const root = createRoot(domNode);


root.render(
    <Provider store = {store}>
        <App />
    </Provider>, document.getElementById('root')
);

