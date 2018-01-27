import React from 'react';
import { connect } from 'react-redux';
import CompletedSavedShopping from './CompletedSavedShopping';
import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';

class CompletedSavedShoppingContainer extends React.Component {

    componentDidMount() {
        //Set the title to login
        this.props.setTitle({
            windowTitle: 'Completed/Saved Shopping Paths - SyncSpace',
            pageTitle: 'Completed/Saved Shopping Paths'
        });
    }

    render() {
        console.log('render');
        return (
            <CompletedSavedShopping />
        );
    }
}

const mapStateToProps = (state) => ({
    CompletedShoppingLists: state.syncSpaceReducer.CompletedShoppingLists,
    SavedShoppingLists: state.syncSpaceReducer.SavedShoppingLists
});

const mapDispatchToProps = (dispatch) => ({
    onShoppingListPathSelected: (shoppingListPath) => {
        dispatch(CompletedSavedShoppingPathSelected(shoppingListPath));
    }
});

const CompletedSavedShoppingPathComponentContainer = connect(mapStateToProps, mapDispatchToProps)(CompletedSavedShoppingContainer);
export default CompletedSavedShoppingPathComponentContainer;

// export default CompletedSavedShoppingContainer;
