import React from 'react';
import { connect } from 'react-redux';
import Landing from './Landing.jsx';

/**
 * 
 * 
 * @class LandingContainerComponent
 * @extends {React.Component}
 */
class LandingContainerComponent extends React.Component {

    /**
     * Creates an instance of LandingContainerComponent.
     * @param {any} props 
     * 
     * @memberOf LandingContainerComponent
     */
    constructor(props) {
        super(props);
        this.state = { selectedShoppingLists: [] };
        this.onShoppingListClicked = this.onShoppingListClicked.bind(this);
    }

    /**
     * 
     * 
     * 
     * @memberOf LandingContainerComponent
     */
    onShoppingListClicked() {
        console.log('Selected a shopping list');
    }

    render() {
        return (
            <Landing />
        );
    }
}

const LandingContainer = connect()(LandingContainerComponent);
export default LandingContainer;
