import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, Query } from 'react-apollo';
import _get from 'lodash/get';
import gql from 'graphql-tag';
import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import styles from './ShoppingPath.scss';
import ButtonContainer from '../common/button/Button';
import commonStyles from '../../stylesheets/styles.scss';
import { completeShoppingPathAction, saveShoppingPathAction, completeSaveShoppingPathComplete } from './ShoppingPathActions';
import LoaderComponent from '../common/loader/loader';
import ProcessingMessageContainer from '../processingMessage/ProcessingMessage';



const ShoppingPathByIdQuery = gql`
  query shoppingPathById($shoppingPathId: String!) {
    ShoppingPathById(Id: $shoppingPathId) {
        Id
        name
        userId
        storeId
        completed
        dateCreated
        shoppingItems {
            id,
            name,
            pickedUp,
            location,
            locationHint,
            locationOrder
        }
      }
  }`;

const updateShoppingPathQuery = gql`
mutation updateShoppingPath($shoppingPath: ShoppingPathInput!){
    UpdateShoppingPath(shoppingPath: $shoppingPath){
        Id
        name
        userId
        storeId
        completed
        dateCreated
        shoppingItems {
            id,
            name,
            pickedUp,
            location,
            locationHint,
            locationOrder
        }
    }
}
`;

export class ShoppingPathComponent extends React.Component {
    render() {
        const shoppingPath = this.props.shoppingPath;

        //First sort and then group based on the location    
        const sortedShoppingPathOnLocation = sortby(shoppingPath.shoppingItems, (shoppingPathItem) => shoppingPathItem.locationOrder);

        //Group based on the location
        const sortedAndGroupedShoppingPathOnLocation = groupby(sortedShoppingPathOnLocation,
            (shoppingPathItem) => (shoppingPathItem.location));

        // eslint-disable-next-line arrow-body-style
        const shoppingPathToRender = Object.keys(sortedAndGroupedShoppingPathOnLocation).map(locationKey => {
            return (
                <div key={locationKey}>
                    <div className={styles.ShoppingPathLocation}>
                        {locationKey}
                        {
                            <div>
                                {
                                    // eslint-disable-next-line arrow-body-style
                                    sortedAndGroupedShoppingPathOnLocation[locationKey].map(shoppingItem => {
                                        return (
                                            <div
                                                className={styles.ShoppingItem}
                                                key={shoppingItem.id}
                                            >
                                                <input
                                                    type='checkbox' id={`sp${shoppingItem.id}`}
                                                    checked={shoppingItem.pickedUp}
                                                    data-id={shoppingItem.id}
                                                    onChange={onClickedShoppingItem}
                                                />
                                                <label htmlFor={`${shoppingItem.id}`}>
                                                    {shoppingItem.name}
                                                    <span className={styles.ItemLocationHint}>
                                                        {shoppingItem.locationHint}
                                                    </span>
                                                </label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div className={styles.ShoppingPathDetailsSection}>
                    {shoppingPath.name} <br />
                    Shopped at: {shoppingPath.storeId} on {shoppingPath.dateCreated}
                </div>
                {shoppingPathToRender}
                <div className={styles.CompleteShopping}>
                    <ButtonContainer
                        id='completeShoppingbutton'
                        className={commonStyles.std_Button}
                        onClick={() => {
                            this.onCompleteShoppingPath(shoppingPath);
                        }}
                        style={buttonStyle}
                        content='Complete shopping'
                    />
                    <ButtonContainer
                        id='saveShoppingbutton'
                        className={commonStyles.std_Button}
                        onClick={() => {
                            this.props.onSaveShoppingClicked(shoppingPath);
                            this.props.history.push('/landing');
                        }}
                        style={buttonStyle}
                        content='Save for later'
                    />
                </div>
                <ProcessingMessageContainer />
            </div>
        );
    }
}

export class ShoppingPathContainerComponent extends React.Component {

    constructor(props) {
        super(props);
        // this.onClickedShoppingItem = this.onClickedShoppingItem.bind(this);
        // this.onCompleteShoppingPath = this.onCompleteShoppingPath.bind(this);
        // this.state = {
        //     shoppingPath: null
        // };
    }

    // componentWillReceiveProps(props) {
    //     this.state.shoppingPath = props.ShoppingPath;
    // }

    onClickedShoppingItem = (event) => {
        const isSelected = event.target.checked;
        const shoppingListitemId = event.target.dataset.id;

        //Select the item from the shopping list and mark the chcecked state
        const shoppingItem = this.state.shoppingPath.shoppingItems.find(si => si.id === shoppingListitemId);
        this.setState({
            shoppingPath: this.state.shoppingPath
        });
        shoppingItem.pickedUp = isSelected;
    };

    onCompleteShoppingPath = (shoppingPath) => {
        this.props.updateShoppingPath(shoppingPath);
    }

    render() {
        const buttonStyle = {
            margin: '10px 10px 0px 0px'
        };

        return (
            // This uses react render props approahc https://reactjs.org/docs/render-props.html
            <Query query={ShoppingPathByIdQuery} variables={{ shoppingPathId: _get(this.props, 'location.selectedShoppingPathId', null) }}>
                {({ loading, error, data: { ShoppingPathById: shoppingPath } }) => {

                    if (loading) {
                        return (
                            <div>
                                <LoaderComponent />
                            </div>
                        );
                    } else {

                        <ShoppingPathComponent shoppingPath={shoppingPath}>
                        </ShoppingPathComponent>
                    }
                }}
            </Query>
        );
    }
}

const composedQueries = compose(
    graphql(
        ShoppingPathByIdQuery, {
            options: props => ({ variables: { shoppingPathId: _get(props, 'location.selectedShoppingPathId', null) } }),
            props: ({ data: { loading, ShoppingPathById } }) => ({
                loading,
                ShoppingPath: ShoppingPathById,
            }),
        }
    ),
    graphql(
        updateShoppingPathQuery, {
            props: ({ mutate, ownProps: { onCompleteShoppingClicked, onUpdateShoppingListComplete } }) => ({
                updateShoppingPath: (shoppingPath) => {
                    const { __typename, shoppingItems, ...shoppingPathInput } = shoppingPath;
                    shoppingPathInput.shoppingItems = shoppingPath.shoppingItems.map(shoppingItem => {
                        const { __typename, ...shoppingItemInput } = shoppingItem;
                        return shoppingItemInput;
                    });
                    mutate({ variables: { shoppingPath: shoppingPathInput } }).then(updateResult => {
                        //Dispatch an action to say completed updating the shopping path
                        onUpdateShoppingListComplete();

                        //Make the component update itself

                    });
                    onCompleteShoppingClicked(shoppingPath);
                }
            })
        }
    ),
)(ShoppingPathComponent);

const mapStateToProps = (state) => ({
    AppliedShoppingPathId: state.syncSpaceReducer.AppliedShoppingPathId
});

const mapDispatchToProps = (dispatch) => ({
    onCompleteShoppingClicked: (appliedShoppingList) => {
        dispatch(completeShoppingPathAction(appliedShoppingList));
    },
    onUpdateShoppingListComplete: () => {
        dispatch(completeSaveShoppingPathComplete());
    },
    onSaveShoppingClicked: (appliedShoppingList) => {
        dispatch(saveShoppingPathAction(appliedShoppingList));
    }
});

// const ShoppingPathComponentContainer = connect(mapStateToProps, mapDispatchToProps)(ShoppingPathComponent);
// export default ShoppingPathComponentContainer;
