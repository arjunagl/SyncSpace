import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import routes from './routes/routes';
import DevTools from './components/devTools/DevTools';
import syncSpaceReducer from './reducers/syncSpaceReducer';
import { storeEpic } from './components/store/storeEpic';
import { shoppingListEpic } from './components/shoppingList/shoppingListEpic';
import './stylesheets/fonts.scss';
import './stylesheets/styles.scss';

//Combine the Epics
const rootEpic = combineEpics(
    storeEpic,
    shoppingListEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);

//Combine the reducers
const reducer = combineReducers({
    syncSpaceReducer,
    routing: routerReducer
});

const loggerMiddleware = createLogger();
const enhancer = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware, epicMiddleware),
    DevTools.instrument()
);

const store = createStore(reducer, enhancer);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes} />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('syncspace')
);
