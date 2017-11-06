import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import handleTransitions from 'redux-history-transitions';
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';

import DevTools from './components/devTools/DevTools';
import syncSpaceReducer from './reducers/syncSpaceReducer';
import { storeEpic } from './components/store/storeEpic';
import StoreService from './components/store/storeService';
import { shoppingListEpic } from './components/shoppingList/shoppingListEpic';
import { landingEpic } from './components/landing/landingEpic';
import { incrementalSearchEpic } from './components/common/incrementalSearch/incrementalSearchEpic';
import { completedSavedShoppingEpic } from './components/CompletedSavedShopping/CompletedSavedShoppingEpic';
import IncrementalSearchServiceMock
    from './components/common/incrementalSearch/incrementalSearchServiceMock';
import ConfigService from './common/configService';
import App from './components/app/App';

import './stylesheets/fonts.scss';
import './stylesheets/styles.scss';

//Combine the Epics
const rootEpic = combineEpics(
    storeEpic,
    shoppingListEpic,
    landingEpic,
    incrementalSearchEpic,
    completedSavedShoppingEpic
);

const configParams = ConfigService();

const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
        http: axios,
        Config: configParams,
        StoreService: StoreService(axios, configParams),
        // StoreService: StoreService,
        incrementalSearchService: IncrementalSearchServiceMock,
    }
});

const transitionHistory = createHistory();

const enhancer = compose(
    applyMiddleware(thunkMiddleware, epicMiddleware),
    handleTransitions(transitionHistory),
    DevTools.instrument()
);

//Combine the reducers
const reducer = combineReducers({
    syncSpaceReducer
});

const store = createStore(reducer, enhancer);

render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </div>
    </Provider>,
    document.getElementById('syncspace')
);
