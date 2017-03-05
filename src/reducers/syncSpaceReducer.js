const syncSpaceReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEEDED':
            return { ...state, LoginStatus: true, displayName: action.UserDisplayName };
        default:
            return state;
    }
};

export default syncSpaceReducer;
