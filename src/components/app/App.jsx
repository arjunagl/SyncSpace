import React from 'react';
import { Route } from 'react-router';
import TopMenuComponent from '../topMenu/TopMenuIndex';
import LandingComponent from '../landing/Landing';
import LoginContainer from '../login/LoginContainer';
import ShoppingPathComponentContainer from '../shoppingPath/ShoppingPath';
// import CompletedSavedShoppingPathComponentContainer from '../CompletedSavedShopping/CompletedSavedShopping';
import CompletedSavedShoppingContainer from '../CompletedSavedShopping/CompletedSavedShoppingContainer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setTitle = this.setTitle.bind(this);
    }

    setTitle({ windowTitle, pageTitle }) {
        document.title = windowTitle;
    }

    render() {
        return (<div>
            <Route path="/" component={TopMenuComponent} />
            <div>
                <Route
                    exact path="/"
                    render={props => (
                        <LoginContainer {...props} setTitle={this.setTitle} />
                    )}
                />
                <Route
                    path="/login"
                    render={props => (
                        <LoginContainer {...props} setTitle={this.setTitle} />
                    )}
                />
                <Route
                    path='/landing'
                    render={props => (
                        <LandingComponent {...props} setTitle={this.setTitle} />
                    )}
                />
                <Route
                    path='/shopping'
                    render={props => (
                        <ShoppingPathComponentContainer {...props} setTitle={this.setTitle} />
                    )}
                />
                <Route
                    path='/completedsavedshopping'
                    render={props => (
                        <CompletedSavedShoppingContainer {...props} setTitle={this.setTitle} />
                    )}
                />
            </div>
        </div>);
    }
}

export default App;
