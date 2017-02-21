function loginSuccess() {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

function performingLogin() {
    return {
        type: 'lOGIN_PROGRESS'
    }
}

export function performLogin( userName, password ) {
    return function ( dispatch ) {
        dispatch( performingLogin() );
        dispatch( loginSuccess() );
    }
}