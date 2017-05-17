import { AppliedShoppingListsSampleData } from '../data/sampleData';

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
    AppliedShoppingLists: AppliedShoppingListsSampleData
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
