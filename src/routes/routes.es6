import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "../components/app/App";
import LoginContainer from "../components/login/LoginContainer";

export default (
    <Route path = '/' component = {App}>
        <IndexRoute component = {LoginContainer} />
    </Route>
);