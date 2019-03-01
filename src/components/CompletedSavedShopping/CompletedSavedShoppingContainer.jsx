import React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { CompletedSavedShoppingPathComponent } from './CompletedSavedShopping';
import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';
import LoaderComponent from '../common/loader/loader';

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

class CompletedSavedShoppingContainer extends React.Component {
    componentDidMount() {
        //Set the title
        this.props.setTitle({
            windowTitle: 'Completed/Saved Shopping Paths - SyncSpace',
            pageTitle: 'Completed/Saved Shopping Paths'
        });
    }

    render() {
        return (
            <Query query={getSavedcompletedShoppingPathsQuery} variables={{ userId: this.props.userId }}>
                {({ loading, error, data: { ShoppingPaths: shoppingPaths } }) => {
                    if (loading) {
                        return (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ display: 'inline-block' }}>
                                    <LoaderComponent />
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <CompletedSavedShoppingPathComponent
                                CompletedShoppingLists={shoppingPaths.filter(shoppingPath => shoppingPath.completed === true)}
                                SavedShoppingLists={shoppingPaths.filter(shoppingPath => shoppingPath.completed === false)}
                                onShoppingListPathSelected={this.props.onShoppingListPathSelected}
                                history={this.props.history}
                                loading={this.props.loading}
                            />
                        );
                    }
                }}
            </Query >
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onShoppingListPathSelected: (shoppingListPath) => {
        dispatch(CompletedSavedShoppingPathSelected(shoppingListPath));
    }
});

const CompletedSavedShoppingPathComponentContainer = connect(null, mapDispatchToProps)(CompletedSavedShoppingContainer);

export default CompletedSavedShoppingPathComponentContainer;

export const shoppingPathcontainerQuery = getSavedcompletedShoppingPathsQuery;
