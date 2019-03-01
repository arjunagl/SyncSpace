import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import TopMenuComponent from '../topMenu/TopMenuIndex';
import LandingComponent from '../landing/Landing';
import LoginContainer from '../login/LoginContainer';
// import './AppStyles.scss';
import RegisterPage from '../register/RegisterPage';
import { ShoppingPathContainerComponent } from '../shoppingPath/ShoppingPathContainer';
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
        const apolloClientCache = new InMemoryCache();

        const corsHttpLink = createHttpLink({
            uri: this.props.config.syncGalaxyUrl + this.props.config.shoppingPathsEndPoint
        });

        const client = new ApolloClient({
            link: corsHttpLink,
            cache: apolloClientCache,
            addTypename: false
        });
        return (
            <div>
                <Switch>
                    <Route
                        path="/register"
                        render={() => (
                            <RegisterPage setTitle={this.setTitle} />
                        )}
                    />
                    <Route
                        path="/"
                        render={() => (
                            <div>
                                <Route path="/" component={TopMenuComponent} />
                                <Route
                                    exact path="/"
                                    render={() => (
                                        <LoginContainer setTitle={this.setTitle} />
                                    )}
                                />
                                <Route
                                    path="/login"
                                    render={() => (
                                        <LoginContainer setTitle={this.setTitle} />
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
                                        <ApolloProvider client={client}>
                                            <ShoppingPathContainerComponent {...props} setTitle={this.setTitle} />
                                        </ApolloProvider>
                                    )}
                                />
                                <Route
                                    path='/completedsavedshopping'
                                    render={props => (
                                        <ApolloProvider client={client}>
                                            <CompletedSavedShoppingContainer {...props} setTitle={this.setTitle} userId={this.props.userId} />
                                        </ApolloProvider>
                                    )}
                                />
                            </div>
                        )
                        }
                    />
                </Switch>
            </div >
        );
    }
}


// export default App;
const mapStateToProps = (state) => ({
    userId: state.syncSpaceReducer.userId
});

const AppContainer = withRouter(connect(mapStateToProps)(App));
export default AppContainer;
