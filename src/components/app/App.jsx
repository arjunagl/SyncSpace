import React from 'react';
import TopMenuComponent from '../topMenu/TopMenuIndex';


const App = ({ children }) => (
    <div>
        <TopMenuComponent />
        The children should come here
        {children}
    </div>
);
export default App;
