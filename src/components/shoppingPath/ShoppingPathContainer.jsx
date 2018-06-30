import gql from 'graphql-tag';
import _get from 'lodash/get';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import LoaderComponent from '../common/loader/loader';
import { ShoppingPathComponent } from './ShoppingPath';

export class ShoppingPathContainerComponent extends React.Component {

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
            } `;



        return (
            // This uses react render props approahc https://reactjs.org/docs/render-props.html        
            <Query query={ShoppingPathByIdQuery} variables={{ shoppingPathId: _get(this.props, 'location.selectedShoppingPathId', null) }}>
                {({ loading, error, data: { ShoppingPathById: shoppingPath } }) => (
                    <Mutation
                        mutation={updateShoppingPathQuery}
                        update={(cache, { data: { UpdateShoppingPath: updatedShoppingPath } }) => {

                            //For the moment I'm not doing anything with the data I read, but I'm keeping this as a reference.
                            const { ShoppingPathById } = cache.readQuery({ query: ShoppingPathByIdQuery, variables: { shoppingPathId: _get(this.props, 'location.selectedShoppingPathId', null) } });

                            //Update the cache, this will automatically call the render method of the react component
                            cache.writeQuery({
                                query: ShoppingPathByIdQuery, variables: { shoppingPathId: _get(this.props, 'location.selectedShoppingPathId', null) },
                                data: { ShoppingPathById: updatedShoppingPath }
                            });
                        }}
                    >
                        {(updateShoppingPathMutation, { loading: updatingShoppingPath, error }) => {
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

                            if (loading || updatingShoppingPath) {
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
                        }}
                    </Mutation>
                )}
            </Query>);
    }
}