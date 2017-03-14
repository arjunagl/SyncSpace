const initialState = {
    Stores: []
};

const syncSpaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEEDED':
            return { ...state,
                LoginStatus: true,
                displayName: action.UserDisplayName
            };
        case 'FETCHED_STORES':
            return { ...state,
                Stores: action.Stores
            };
        default:
            return state;
    }
};

export default syncSpaceReducer;