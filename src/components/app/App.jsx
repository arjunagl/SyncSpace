import React, { Component, PropTypes } from "react";
import TopMenuComponent from "../topMenu/TopMenuIndex";


const App = ( { children } ) => (
    <div>
        <TopMenuComponent />
        {children}
    </div>
);

export default App;