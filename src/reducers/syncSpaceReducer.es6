const syncSpaceReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_SUCCEEDED':
            return { ...state, LoginStatus: true, LoginDisplayName: action.UserDisplayName };
        default:
            return state;
    }
};

export default syncSpaceReducer;
