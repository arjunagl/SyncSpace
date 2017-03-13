import React from 'react';
import TopMenuComponent from '../topMenu/TopMenuIndex';


const App = ({ children }) => (
    <div>
        <TopMenuComponent />
        <div>
            {children}
        </div>
    </div>
);
export default App;
