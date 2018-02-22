import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
// import axios from 'axios';
import gql from 'graphql-tag';
import { CompletedSavedShoppingPathComponent } from './CompletedSavedShopping';
import { CompletedSavedShoppingPathSelected } from './CompletedSavedShoppingActions';


class CompletedSavedShoppingContainer extends React.Component {
    componentDidMount() {
        //Set the title to login
        this.props.setTitle({
            windowTitle: 'Completed/Saved Shopping Paths - SyncSpace',
            pageTitle: 'Completed/Saved Shopping Paths'
        });

        // axios.get(`https://xhghsip996.execute-api.us-east-1.amazonaws.com/Stage/SyncGalaxy/ShoppingPaths`)
        //     .then(res => {
        //         const posts = res.data.data.children.map(obj => obj.data);
        //         this.setState({ posts });
        //     });
    }

    render() {
        return (
            <CompletedSavedShoppingPathComponent
                CompletedShoppingLists={this.props.CompletedShoppingLists}
                SavedShoppingLists={this.props.SavedShoppingLists}
                onShoppingListPathSelected={this.props.onShoppingListPathSelected}
                history={this.props.history}
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
  query currentUserSavedCompletedShoppingPaths {
    ShoppingPaths(userId: "user1") {
        name
      }
  }
`;

export default graphql(getSavedcompletedShoppingPathsQuery, {
    props: ({ data: { loading, ShoppingPaths } }) => {
        console.log(loading);
        console.log(ShoppingPaths);
        return ({
            loading,
            ShoppingPaths,
        });
    },
})(CompletedSavedShoppingPathComponentContainer);
