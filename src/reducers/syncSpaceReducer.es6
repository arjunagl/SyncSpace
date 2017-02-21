const syncSpaceReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case 'LOGIN_SUCCESS':
            alert( 'login reducer for ' + action.UserDisplayName );
            return Object.assign( {}, state, {
                LoginStatus: true,
                LoginDisplayName: action.UserDisplayName
            } );
        // return state;
        default:
            return state;
    }
};

export default syncSpaceReducer