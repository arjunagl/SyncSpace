import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import _get from 'lodash/get';
import gql from 'graphql-tag';
import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import styles from './ShoppingPath.scss';
import ButtonContainer from '../common/button/Button';
import commonStyles from '../../stylesheets/styles.scss';
import { completeShoppingPathAction, saveShoppingPathAction } from './ShoppingPathActions';
import LoaderComponent from '../common/loader/loader';


class ShoppingPathComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onClickedShoppingItem = this.onClickedShoppingItem.bind(this);
        this.onCompleteShoppingPath = this.onCompleteShoppingPath.bind(this);
        this.state = {
            shoppingPath: this.props.ShoppingPath
        };
    }

    componentWillReceiveProps(props) {
        this.state.shoppingPath = props.ShoppingPath;
    }

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

        if (this.props.loading) {
            return (
                <div>
                    <LoaderComponent />
                </div>
            );
        }

        //First sort and then group based on the location    
        const sortedShoppingPathOnLocation = sortby(this.state.shoppingPath.shoppingItems, (shoppingPathItem) => shoppingPathItem.locationOrder);

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
                                                    onChange={this.onClickedShoppingItem}
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
                {shoppingPathToRender}
                <div className={styles.CompleteShopping}>
                    <ButtonContainer
                        id='completeShoppingbutton'
                        className={commonStyles.std_Button}
                        onClick={() => {
                            // this.props.onCompleteShoppingClicked(this.state.shoppingPath);
                            // this.props.history.push('/landing');
                            this.onCompleteShoppingPath(this.state.shoppingPath);
                        }}
                        style={buttonStyle}
                        content='Complete shopping'
                    />
                    <ButtonContainer
                        id='saveShoppingbutton'
                        className={commonStyles.std_Button}
                        onClick={() => {
                            this.props.onSaveShoppingClicked(this.state.shoppingPath);
                            this.props.history.push('/landing');
                        }}
                        style={buttonStyle}
                        content='Save for later'
                    />
                </div>
            </div>
        );
    }
}

export { ShoppingPathComponent };

const mapStateToProps = (state) => ({
    AppliedShoppingPathId: state.syncSpaceReducer.AppliedShoppingPathId
});

const mapDispatchToProps = (dispatch) => ({
    onCompleteShoppingClicked: (appliedShoppingList) => {
        dispatch(completeShoppingPathAction(appliedShoppingList));
    },
    onSaveShoppingClicked: (appliedShoppingList) => {
        dispatch(saveShoppingPathAction(appliedShoppingList));
    }
});

const ShoppingPathComponentContainer = connect(mapStateToProps, mapDispatchToProps)(ShoppingPathComponent);

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
    }
}
`;

export default compose(
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
            props: ({ mutate }) => ({
                updateShoppingPath: (shoppingPath) => {
                    const { __typename, shoppingItems, ...shoppingPathInput } = shoppingPath;
                    shoppingPathInput.shoppingItems = shoppingPath.shoppingItems.map(shoppingItem => {
                        const { __typename, ...shoppingItemInput } = shoppingItem;
                        return shoppingItemInput;
                    });
                    mutate({ variables: { shoppingPath: shoppingPathInput } });
                }
            })
        }
    ),
)(ShoppingPathComponentContainer);
