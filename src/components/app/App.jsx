import React from 'react';
import { Route } from 'react-router';
import TopMenuComponent from '../topMenu/TopMenuIndex';
import LandingComponent from '../landing/Landing';
import LoginContainer from '../login/LoginContainer';
import ShoppingPathComponentContainer from '../shoppingPath/ShoppingPath';

const App = () => (
    <div>
        <TopMenuComponent />
        <div>
            <Route exact path="/" component={LoginContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path='/landing' component={LandingComponent} />
            <Route path='/shopping' component={ShoppingPathComponentContainer} />
        </div>
    </div>
);
export default App;
