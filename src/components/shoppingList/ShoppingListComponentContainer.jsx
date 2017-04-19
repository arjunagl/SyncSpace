import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchShoppingLists } from './shoppingListActions';
import commonStyles from '../../stylesheets/styles.scss';
import ShoppingListComponent from './ShoppingList';

/**
 * 
 */
class ShoppingListsComponent extends React.Component {

    /**
     * 
     */
    componentDidMount() {
        this.props.fetchShoppingLists();
    }

    /**
     * 
     */
    render() {
        const shoppingLists = this.props.ShoppingLists;
        const shoppingListsToRener = shoppingLists.map((shoppingList) =>
            <ShoppingListComponent
                key={shoppingList.Id}
                ShoppingListId={shoppingList.Id}
                Name={shoppingList.Name}
                onShoppingListClicked={this.props.onShoppingListClicked}
                onShoppingListUnclicked={this.props.onShoppingListUnclicked}
            />
        );
        return (
            <div className={commonStyles.componentWrapper}>
                <p className={commonStyles.componentTitle}>
                    Shopping lists
                </p>
                {shoppingListsToRener}
            </div>);
    }
}

/**
 * 
 */
ShoppingListComponent.PropTypes = {
    fetchShoppingLists: PropTypes.func.isRequired,
    ShoppingLists: PropTypes.array.isRequired
};

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => ({
    fetchShoppingLists: () => {
        dispatch(fetchShoppingLists());
    }
});

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = (state) => ({
    ShoppingLists: state.syncSpaceReducer.ShoppingLists
});

const ShoppingListsComponentContainer =
    connect(mapStateToProps, mapDispatchToProps)(ShoppingListsComponent);
export default ShoppingListsComponentContainer;
