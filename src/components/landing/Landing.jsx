import React from 'react';
import { connect } from 'react-redux';
import styles from './Landing.scss';
import { applyShoppingLists } from './landingActions';
import StoresComponentContainer from '../store/StoresComponentContainer';
import ShoppingListsComponentContainer from '../shoppingList/ShoppingListComponentContainer';
import ProcessingMessageContainer from '../processingMessage/ProcessingMessage';

class LandingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedShoppingLists: [] };
        this.onShoppingListClicked = this.onShoppingListClicked.bind(this);
        this.onShoppingListUnclicked = this.onShoppingListUnclicked.bind(this);
        this.onApplyShoppingListsClicked = this.onApplyShoppingListsClicked.bind(this);
    }

    componentDidMount() {
        //Set the title to login
        this.props.setTitle({
            windowTitle: 'Home - SyncSpace',
            pageTitle: 'Home'
        });
    }

    componentWillReceiveProps({ history, completedActionCode }) {
        if (completedActionCode === 'APPLIED_SHOPPING_LISTS') {
            history.push('/shopping');
        }
    }

    onShoppingListClicked(shoppingListId) {
        const index = this.state.selectedShoppingLists.indexOf(shoppingListId);
        if (index === -1) { //Item does not exist
            this.state.selectedShoppingLists.push(shoppingListId);
        }
    }

    onShoppingListUnclicked(shoppingListId) {
        const index = this.state.selectedShoppingLists.indexOf(shoppingListId);
        if (index !== -1) { //Item does not exist
            this.state.selectedShoppingLists.splice(index, 1);
        }
    }

    onApplyShoppingListsClicked(storeId) {
        this.props.onApplyShoppingLists(storeId, this.state.selectedShoppingLists);
    }

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

const mapDispatchToProps = (dispatch) => ({
    onApplyShoppingLists: (storeId, shoppingLists) => {
        dispatch(applyShoppingLists(shoppingLists, storeId));
    }
});

const mapStateToProps = (state) => ({
    completedActionCode: state.syncSpaceReducer.Processing.CompletedActionCode
});

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(LandingComponent);
export default LandingContainer;
