import React from 'react';
import styles from './Landing.scss';
import StoresComponentContainer from '../store/StoresComponentContainer';
import ShoppingListsComponentContainer from '../shoppingList/ShoppingListComponentContainer';

/**
 * 
 * 
 * @class LandingComponent
 * @extends {React.Component}
 */
class LandingComponent extends React.Component {

    /**
     * Creates an instance of LandingComponent.
     * @param {any} props 
     * 
     * @memberOf LandingComponent
     */
    constructor(props) {
        super(props);
        this.state = { selectedShoppingLists: [] };
        this.onShoppingListClicked = this.onShoppingListClicked.bind(this);
        this.onShoppingListUnclicked = this.onShoppingListUnclicked.bind(this);
    }

    /**
     * 
     * 
     * @param {any} shoppingListId 
     * 
     * @memberOf LandingComponent
     */
    onShoppingListClicked(shoppingListId) {
        const index = this.state.selectedShoppingLists.indexOf(shoppingListId);
        if (index === -1) { //Item does not exist
            this.state.selectedShoppingLists.push(shoppingListId);
        }
    }

    /**
     * 
     * 
     * @param {any} shoppingListId 
     * 
     * @memberOf LandingComponent
     */
    onShoppingListUnclicked(shoppingListId) {
        const index = this.state.selectedShoppingLists.indexOf(shoppingListId);
        if (index !== -1) { //Item does not exist
            this.state.selectedShoppingLists.splice(index, 1);
        }
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf LandingComponent
     */
    render() {
        return (<div className={styles.landingPageWrapper}>
            <div className={styles.landingPageSeparation}>
                <StoresComponentContainer />
            </div>
            <div className={styles.landingPageSeparation}>
                <ShoppingListsComponentContainer
                    onShoppingListClicked={this.onShoppingListClicked}
                    onShoppingListUnclicked={this.onShoppingListUnclicked}
                />
            </div>
        </div >);
    }
}

export default LandingComponent;
