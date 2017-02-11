/**
 * Created by A136836 on 3/02/2017.
 */
import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from  './components/app/App';
import syncSpaceReducer from './reducers/syncSpaceReducer';
import './stylesheets/fonts.scss';
import './stylesheets/styles.scss';

const store = createStore(syncSpaceReducer);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('syncspace')
);