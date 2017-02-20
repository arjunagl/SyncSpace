import React from "react";
import { Route } from "react-router";
import App from "../components/app/App";
import LoginContainer from "../components/login/LoginContainer";

export default (
    <Route path = '/' component = {App}>
        <Route path = "about" component = {LoginContainer} />
        <Route path = 'login' component = {LoginContainer} />
    </Route>
);