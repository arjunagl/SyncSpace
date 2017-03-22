import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchShoppingLists } from './shoppingListActions';
import commonStyles from '../../stylesheets/styles.scss';

/**
 * 
 */
class ShoppingListComponent extends React.Component {

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
        return (
            <div className={commonStyles.componentWrapper}>
                <p className={commonStyles.componentTitle}>
                    Shopping lists
                </p>                
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
    connect(mapStateToProps, mapDispatchToProps)(ShoppingListComponent);
export default ShoppingListsComponentContainer;
