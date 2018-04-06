import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CompletedSavedShoppingPathComponent } from './CompletedSavedShopping';
import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';
import LoaderComponent from '../common/loader/loader';

class CompletedSavedShoppingContainer extends React.Component {
    componentDidMount() {
        //Set the title
        this.props.setTitle({
            windowTitle: 'Completed/Saved Shopping Paths - SyncSpace',
            pageTitle: 'Completed/Saved Shopping Paths'
        });
    }

    render() {
        if (this.props.loading) { //Still loading the data
            return (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block' }}>
                        <LoaderComponent />
                    </div>
                </div>
            );
        }
        return (
            <CompletedSavedShoppingPathComponent
                CompletedShoppingLists={this.props.ShoppingPaths.filter(shoppingPath => shoppingPath.completed === true)}
                SavedShoppingLists={this.props.ShoppingPaths.filter(shoppingPath => shoppingPath.completed === false)}
                onShoppingListPathSelected={this.props.onShoppingListPathSelected}
                history={this.props.history}
                loading={this.props.loading}
            />
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

const getSavedcompletedShoppingPathsQuery = gql`
  query currentUserSavedCompletedShoppingPaths($userId: String!) {
    ShoppingPaths(userId: $userId) {
        Id
        name
        userId
        storeId
        completed
        dateCreated
      }
  }
`;

export default graphql(getSavedcompletedShoppingPathsQuery, {
    options: props => ({ variables: { userId: props.userId } }),
    props: ({ data: { loading, ShoppingPaths } }) => ({
        loading,
        ShoppingPaths,
    }),
})(CompletedSavedShoppingPathComponentContainer);

export const shoppingPathcontainerQuery = getSavedcompletedShoppingPathsQuery;
