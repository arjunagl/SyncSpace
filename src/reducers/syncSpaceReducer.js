const syncSpaceReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEEDED':
            return { ...state,
                LoginStatus: true,
                displayName: action.UserDisplayName
            };
        case 'FETCH_STORES':
            return { ...state,
                stores: action.stores
            };
        default:
            return state;
    }
};

export default syncSpaceReducer;