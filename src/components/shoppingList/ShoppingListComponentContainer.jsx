import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchShoppingLists } from './shoppingListActions';
import commonStyles from '../../stylesheets/styles.scss';
import ShoppingListComponent from './ShoppingList';
import LoaderComponent from '../common/loader/loader';

class ShoppingListsComponent extends React.Component {

    componentDidMount() {
        this.props.fetchShoppingLists();
    }

    render() {
        const shoppingLists = this.props.ShoppingLists;
        let loaderComponent = (
            <div>
                <LoaderComponent />
            </div>
        );

        if (shoppingLists.length > 0) {
            loaderComponent = '';
        }

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
                {loaderComponent}
                {shoppingListsToRener}
            </div>);
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchShoppingLists: () => {
        dispatch(fetchShoppingLists());
    }
});

const mapStateToProps = (state) => ({
    ShoppingLists: state.syncSpaceReducer.ShoppingLists
});

const ShoppingListsComponentContainer =
    connect(mapStateToProps, mapDispatchToProps)(ShoppingListsComponent);
export default ShoppingListsComponentContainer;
