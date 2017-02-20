/**
 * Created by A136836 on 3/02/2017.
 */
import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import syncSpaceReducer from "./reducers/syncSpaceReducer";
import "./stylesheets/fonts.scss";
import "./stylesheets/styles.scss";
import routes from "./routes/routes";

const store = createStore( syncSpaceReducer );

render(
    <Provider store = {store}>
        <Router history = {browserHistory} routes = {routes} />
    </Provider>,
    document.getElementById( 'syncspace' )
);