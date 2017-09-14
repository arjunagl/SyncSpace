import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/app/App';
import LoginContainer from '../components/login/LoginContainer';
import LandingComponent from '../components/landing/Landing';
import ShoppingPathComponentContainer from '../components/shoppingPath/ShoppingPath';
import CompletedSavedShoppingPathComponentContainer from '../components/CompletedSavedShopping/CompletedSavedShopping';


export default (
    <Route path='/' component={App}>
        <IndexRoute component={LoginContainer} />
        <Route path='login' component={LoginContainer} />
        <Route path='landing' component={LandingComponent} />
        <Route path='shopping' component={ShoppingPathComponentContainer} />
        <Route path='completedsavedshopping' component={CompletedSavedShoppingPathComponentContainer} />
    </Route>
);
