import React from 'react';
import TopMenuComponent from '../topMenu/TopMenuIndex';


const App = ({ children }) => (
    <div>
        <TopMenuComponent />
        <div>
            The children should come here
            </div>
        {children}
    </div>
);
export default App;
