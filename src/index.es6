import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import syncSpaceReducer from "./reducers/syncSpaceReducer";
import "./stylesheets/fonts.scss";
import "./stylesheets/styles.scss";
import routes from "./routes/routes";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import DevTools from "./components/devTools/DevTools";


const loggerMiddleware = createLogger();
const enhancer = compose(
    applyMiddleware( thunkMiddleware, loggerMiddleware ),
    DevTools.instrument()
);

const store = createStore( syncSpaceReducer, enhancer );


render(
    <Provider store = {store}>
        <div>
            <Router history = {browserHistory} routes = {routes} />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById( 'syncspace' )
);