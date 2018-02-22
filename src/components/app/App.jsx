import React from 'react';
import { Route } from 'react-router';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import TopMenuComponent from '../topMenu/TopMenuIndex';
import LandingComponent from '../landing/Landing';
import LoginContainer from '../login/LoginContainer';
import ShoppingPathComponentContainer from '../shoppingPath/ShoppingPath';
import CompletedSavedShoppingContainer from '../CompletedSavedShopping/CompletedSavedShoppingContainer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setTitle = this.setTitle.bind(this);
    }

    setTitle({ windowTitle, pageTitle }) {
        console.log(pageTitle);
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
                    render={props => {
                        const corsHttpLink = createHttpLink({
                            uri: this.props.config.syncGalaxyUrl + this.props.config.shoppingPathsEndPoint,
                            mode: 'no-cors'
                        });
                        // const httpLink = new HttpLink({ uri: this.props.config.syncGalaxyUrl + this.props.config.shoppingPathsEndPoint });

                        const client = new ApolloClient({
                            link: corsHttpLink,
                            cache: new InMemoryCache()
                        });
                        return (
                            <ApolloProvider client={client}>
                                <CompletedSavedShoppingContainer {...props} setTitle={this.setTitle} />
                            </ApolloProvider>
                        );
                    }}
                />
            </div>
        </div>);
    }
}

export default App;
