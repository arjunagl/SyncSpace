/**
 * Initial state of the store, used to set default values
 */
const initialState = {
    Stores: [],
    ShoppingLists: [],
    Processing: {
        State: 'Idle',
        Message: ''
    },
    AppliedShoppingLists: [{
        ShoppingListId: '1',
        Item: {
            Id: '1',
            Name: 'Apples'
        },
        Location: {
            Isle: '1',
            Description: 'Next to Oranges'
        },
    }, {
        ShoppingListId: '1',
        Item: {
            Id: '2',
            Name: 'Pears'
        },
        Location: {
            Isle: '1',
            Description: 'Next to Oranges'
        }
    },
    {
        ShoppingListId: '1',
        Item: {
            Id: '3',
            Name: 'Oranges'
        },
        Location: {
            Isle: '1',
            Description: 'Next to Oranges'
        }
    }]
};

const syncSpaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEEDED':
            return {
                ...state,
                LoginStatus: true,
                displayName: action.UserDisplayName
            };
        case 'FETCHED_STORES':
            return {
                ...state,
                Stores: action.Stores
            };
        case 'FETCHED_SHOPPING_LISTS':
            return {
                ...state,
                ShoppingLists: action.ShoppingLists
            };
        case 'APPLIED_SHOPPING_LISTS':
            return {
                ...state,
                AppliedShoppingLists: action.AppliedShoppingLists,
                Processing: {
                    State: 'Idle',
                    Message: ''
                }
            };
        case 'APPLYING_SHOPPING_LISTS':
            return {
                ...state,
                Processing: {
                    State: 'Processing',
                    Message: 'Applying shopping lists...'
                }
            };
        default:
            return state;
    }
};

export default syncSpaceReducer;
