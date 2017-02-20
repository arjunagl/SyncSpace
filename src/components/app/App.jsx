import React, { Component, PropTypes } from "react";
import TopMenuComponent from "../topMenu/TopMenuIndex";
// import LoginComponent from '../login/Login';


const App = ( { children } ) => (
    <div>
        <TopMenuComponent />
        {children}
    </div>
);

export default App;