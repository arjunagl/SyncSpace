import React from 'react';
import { connect } from 'react-redux';
import styles from './Landing.scss';
import { applyShoppingLists } from './landingActions';
import StoresComponentContainer from '../store/StoresComponentContainer';
import ShoppingListsComponentContainer from '../shoppingList/ShoppingListComponentContainer';
import ProcessingMessageContainer from '../processingMessage/ProcessingMessage';

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
        this.onApplyShoppingListsClicked = this.onApplyShoppingListsClicked.bind(this);
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
     * @param {any} storeId 
     * 
     * @memberOf LandingComponent
     */
    onApplyShoppingListsClicked(storeId) {
        this.props.onApplyShoppingLists(storeId, this.state.selectedShoppingLists);
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf LandingComponent
     */
    render() {
        return (
            <div>
                <div className={styles.landingPageWrapper}>
                    <div className={styles.landingPageSeparation}>
                        <ShoppingListsComponentContainer
                            onShoppingListClicked={this.onShoppingListClicked}
                            onShoppingListUnclicked={this.onShoppingListUnclicked}
                        />
                    </div>
                    <div className={styles.landingPageSeparation}>                        
                        <StoresComponentContainer
                            onApplyShoppingListClicked={this.onApplyShoppingListsClicked}
                        />
                    </div>
                </div >
                <ProcessingMessageContainer />
            </div>
        );
    }
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => ({
    onApplyShoppingLists: (storeId, shoppingLists) => {
        dispatch(applyShoppingLists(shoppingLists, storeId));
    }
});

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = (state) => ({
});

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(LandingComponent);
export default LandingContainer;
