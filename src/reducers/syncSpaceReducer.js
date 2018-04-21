import { AppliedShoppingListsSampleData, CompletedShoppingListsSampleData, SavedShoppingListsSampleData } from '../data/sampleData';

const initialState = {
    userId: 'user1',
    Stores: [],
    ShoppingLists: [],
    Processing: {
        State: 'Idle',
        CompletedActionCode: '',
        Message: ''
    },
    Search: {
        SearchText: '',
        FilteredStores: []
    },
    CompletedShoppingLists: CompletedShoppingListsSampleData,
    SavedShoppingLists: SavedShoppingListsSampleData,
    AppliedShoppingLists: AppliedShoppingListsSampleData
};

const syncSpaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEEDED':
            return {
                ...state,
                LoginStatus: true,
                displayName: action.UserDisplayName,
                userId: action.userId
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
                    CompletedActionCode: 'APPLIED_SHOPPING_LISTS',
                    Message: ''
                }
            };
        case 'COMPLETED_SAVED_SHOPPING_LIST_LOADED':
            return {
                ...state,
                AppliedShoppingLists: action.AppliedShoppingList,
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
        case 'COMPLETE_SHOPPING': {
            return {
                ...state,
                Processing: {
                    State: 'Processing',
                    Message: 'Updating your shopping list...'
                }
            };
        }
        case 'COMPLETE_SAVE_SHOPPING_COMPLETE': {
            return {
                ...state,
                Processing: {
                    State: 'Idle',
                    Message: null
                }
            };
        }
        case 'SAVE_SHOPPING': {
            const savedShoppingLists = Array.of(...state.SavedShoppingLists);
            savedShoppingLists.push(action.appliedShoppingList);
            return {
                ...state,
                SavedShoppingLists: savedShoppingLists
            };
        }
        case 'COMPLETED_SAVED_SHOPPING_LIST_SELECTED': {
            return {
                ...state,
                AppliedShoppingPathId: action.AppliedShoppingList.Id
            };
        }
        default:
            return state;
    }
};

export default syncSpaceReducer;
