import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import React from 'react';
import commonStyles from '../../stylesheets/styles.scss';
import ButtonContainer from '../common/button/Button';
import ProcessingMessageContainer from '../processingMessage/ProcessingMessage';
import styles from './ShoppingPath.scss';

export class ShoppingPathComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onClickedShoppingItem = this.onClickedShoppingItem.bind(this);
        this.state = {
            shoppingPath: props.shoppingPath
        };
    }

    componentWillReceiveProps(props) {
        console.log('receiving props');
        this.setState({ shoppingPath: props.ShoppingPath });
    }


    onClickedShoppingItem = (event) => {
        const isSelected = event.target.checked;
        const shoppingListitemId = event.target.dataset.id;

        //Select the item from the shopping list and mark the chcecked state
        const shoppingItem = this.state.shoppingPath.shoppingItems.find(si => si.id === shoppingListitemId);
        shoppingItem.pickedUp = isSelected;
        this.setState({
            shoppingPath: this.state.shoppingPath
        });
    };

    render() {
        const buttonStyle = {
            margin: '10px 10px 0px 0px'
        };

        const shoppingPath = this.state.shoppingPath;
        if (shoppingPath === undefined || null) {
            return (
                <div >
                    Cannot load shopping path
                </div>
            );
        }

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
                            this.props.updateShoppingPath(shoppingPath);
                            // this.props.history.push('/landing');
                        }}
                        style={buttonStyle}
                        content='Complete shopping'
                    />
                    <ButtonContainer
                        id='saveShoppingbutton'
                        className={commonStyles.std_Button}
                        onClick={() => {
                            this.props.updateShoppingPath(shoppingPath);
                            // this.props.history.push('/landing');
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
