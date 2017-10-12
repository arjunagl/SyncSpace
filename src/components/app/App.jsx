import React from 'react';
import { Route } from 'react-router';
import TopMenuComponent from '../topMenu/TopMenuIndex';
import LandingComponent from '../landing/Landing';
import LoginContainer from '../login/LoginContainer';
import ShoppingPathComponentContainer from '../shoppingPath/ShoppingPath';
import CompletedSavedShoppingPathComponentContainer from '../CompletedSavedShopping/CompletedSavedShopping';

const App = () => (
    <div>
        <Route path="/" component={TopMenuComponent} />        
        <div>
            <Route exact path="/" component={LoginContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path='/landing' component={LandingComponent} />
            <Route path='/shopping' component={ShoppingPathComponentContainer} />
            <Route path='/completedsavedshopping' component={CompletedSavedShoppingPathComponentContainer} />
        </div>
    </div>
);
export default App;
