import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import syncSpaceReducer from "./reducers/syncSpaceReducer";
import "./stylesheets/fonts.scss";
import "./stylesheets/styles.scss";
import routes from "./routes/routes";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";


const loggerMiddleware = createLogger();
const store = createStore( syncSpaceReducer, applyMiddleware( thunkMiddleware, loggerMiddleware ) );

render(
    <Provider store = {store}>
        <Router history = {browserHistory} routes = {routes} />
    </Provider>,
    document.getElementById( 'syncspace' )
);