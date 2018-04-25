import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose, Query, Mutation } from 'react-apollo';
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
import { ShoppingPathComponent } from './ShoppingPath';




export class ShoppingPathContainerComponent extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.onClickedShoppingItem = this.onClickedShoppingItem.bind(this);
    //     this.onCompleteShoppingPath = this.onCompleteShoppingPath.bind(this);
    //     this.state = {
    //         shoppingPath: null
    //     };
    // }

    // componentWillReceiveProps(props) {
    //     this.state.shoppingPath = props.ShoppingPath;
    // }

    // onClickedShoppingItem = (event) => {
    //     const isSelected = event.target.checked;
    //     const shoppingListitemId = event.target.dataset.id;

    //     //Select the item from the shopping list and mark the chcecked state
    //     const shoppingItem = this.state.shoppingPath.shoppingItems.find(si => si.id === shoppingListitemId);
    //     this.setState({
    //         shoppingPath: this.state.shoppingPath
    //     });
    //     shoppingItem.pickedUp = isSelected;
    // };

    onCompleteShoppingPath = (shoppingPath) => {
        this.props.updateShoppingPath(shoppingPath);
    }

    render() {
        const buttonStyle = {
            margin: '10px 10px 0px 0px'
        };

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

        return (
            // This uses react render props approahc https://reactjs.org/docs/render-props.html        
            <Query query={ShoppingPathByIdQuery} variables={{ shoppingPathId: _get(this.props, 'location.selectedShoppingPathId', null) }}>
                {({ loading, error, data: { ShoppingPathById: shoppingPath } }) => (
                    <Mutation mutation={updateShoppingPathQuery}>
                        {(updateShoppingPathMutation, { data }) => {
                            console.log(data);
                            const updateShoppingPath = (shoppingPathToUpdate) => {
                                console.log(shoppingPathToUpdate);
                                const { __typename, shoppingItems, ...shoppingPathInput } = shoppingPathToUpdate;
                                shoppingPathInput.shoppingItems = shoppingPath.shoppingItems.map(shoppingItem => {
                                    const { __typename, ...shoppingItemInput } = shoppingItem;
                                    return shoppingItemInput;
                                });
                                updateShoppingPathMutation({ variables: { shoppingPath: shoppingPathInput } }).then(updateResult => {
                                    console.log('Shopping path updaed => ', updateResult);
                                });
                            }

                            if (loading) {
                                return (
                                    <div>
                                        <LoaderComponent />
                                    </div>
                                );
                            } else {
                                return (
                                    <ShoppingPathComponent shoppingPath={shoppingPath} updateShoppingPath={updateShoppingPath}>
                                    </ShoppingPathComponent>
                                );
                            }
                        }
                        }
                    </Mutation>
                )}
            </Query>);
    }
}