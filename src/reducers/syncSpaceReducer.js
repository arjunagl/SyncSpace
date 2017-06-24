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
    Search: {
        SearchText: '',
        FilteredStores: []
    },
    // FilteredStores: [],
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
        case 'FILTERED_STORE': {
            //If the searchtext is different that means this is a 
            //new search therefore we filter out the stores, and display the new ones
            let combinedStores;
            if (state.Search.SearchText.toLowerCase().trim() === action.searchText.toLowerCase().trim()) {
                combinedStores = Array.of(...state.Search.FilteredStores);
                combinedStores.push(action.store);
            } else {
                combinedStores = Array.of(action.store);
            }
            return {
                ...state,
                Stores: combinedStores,
                Search: {
                    SearchText: action.searchText,
                    FilteredStores: combinedStores
                }
            };
        }
        default:
            return state;
    }
};

export default syncSpaceReducer;
