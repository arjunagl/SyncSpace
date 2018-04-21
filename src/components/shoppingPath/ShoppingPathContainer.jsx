import React from 'react';

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