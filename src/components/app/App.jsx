import React from 'react';
import { Route } from 'react-router';
import TopMenuComponent from '../topMenu/TopMenuIndex';
import LandingComponent from '../landing/Landing';
import LoginContainer from '../login/LoginContainer';
import ShoppingPathComponentContainer from '../shoppingPath/ShoppingPath';
import CompletedSavedShoppingPathComponentContainer from '../CompletedSavedShopping/CompletedSavedShopping';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowTitle: 'Login - SyncSpace',
            pageTitle: 'Login'
        };

        this.setTitle = this.setTitle.bind(this);
    }

    setTitle({ windowTitle, pageTitle }) {
        this.setState({
            windowTitle,
            pageTitle
        });
    }

    render() {
        return (<div>
            <Route path="^(?!.*(/|/login)).*$" component={TopMenuComponent} />
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
                <Route path='/landing' component={LandingComponent} />
                <Route path='/shopping' component={ShoppingPathComponentContainer} />
                <Route path='/completedsavedshopping' component={CompletedSavedShoppingPathComponentContainer} />
            </div>
        </div>);
    }
}

export default App;
