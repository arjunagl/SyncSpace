import React, {Component, PropTypes} from 'react';
import TopMenuComponent from '../topMenu/TopMenuIndex';
// import LoginComponent from '../login/Login';
import LoginContainer from '../login/LoginContainer';


const App = () => (
    <div>
        <TopMenuComponent/>
        <LoginContainer/>
    </div>
);

export default App;