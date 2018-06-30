import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import handleTransitions from 'redux-history-transitions';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import ConfigService from './common/configService';
import AppContainer from './components/app/App';
import { incrementalSearchEpic } from './components/common/incrementalSearch/incrementalSearchEpic';
import IncrementalSearchService from './components/common/incrementalSearch/incrementalSearchService';
import IncrementalSearchServiceMock from './components/common/incrementalSearch/incrementalSearchServiceMock';
import DevTools from './components/devTools/DevTools';
import { landingEpic } from './components/landing/landingEpic';
import { registerEpic } from './components/register/registerEpic';
import { shoppingListEpic } from './components/shoppingList/shoppingListEpic';
import ShoppingListServiceMock from './components/shoppingList/ShoppingListServiceMock';
import ShoppingListsService from './components/shoppingList/ShoppingListsService';
import { storeEpic } from './components/store/storeEpic';
import StoreService from './components/store/storeService';
import StoreServiceMock from './components/store/storeServiceMock';
import syncSpaceReducer from './reducers/syncSpaceReducer';
import './stylesheets/fonts.scss';
import './stylesheets/styles.scss';

//Combine the Epics
const rootEpic = combineEpics(
    storeEpic,
    shoppingListEpic,
    landingEpic,
    incrementalSearchEpic,
    registerEpic
);

const configParams = ConfigService();

let epicMiddleware;
if (!configParams.useMocks) {
    epicMiddleware = createEpicMiddleware({
        dependencies: {
            http: axios,
            Config: configParams,
            StoreService: StoreService(axios, configParams),
            incrementalSearchService: IncrementalSearchService(axios, configParams),
            ShoppingListsService: ShoppingListsService(axios, configParams)
        }
    });
} else {
    epicMiddleware = createEpicMiddleware({
        dependencies: {
            http: axios,
            Config: configParams,
            StoreService: StoreServiceMock(),
            incrementalSearchService: IncrementalSearchServiceMock,
            ShoppingListsService: ShoppingListServiceMock()
        }
    });
}

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
epicMiddleware.run(rootEpic);

render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
                <AppContainer config={configParams} />
            </BrowserRouter>
        </div>
    </Provider>,
    document.getElementById('syncspace')
);
