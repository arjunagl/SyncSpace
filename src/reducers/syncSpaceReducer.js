const initialState = {
    Stores: [],
    ShoppingLists: []
};

const syncSpaceReducer = (state = initialState, action) => {
    console.log(action.type);
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
                AppliedShoppingLists: action.AppliedShoppingLists
            };
        default:
            return state;
    }
};

export default syncSpaceReducer;
