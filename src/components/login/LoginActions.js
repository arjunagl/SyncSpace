function loginSucceeded() {
    return {
        type: 'LOGIN_SUCCEEDED',
        UserDisplayName: 'albert',
        userId: 'user1'
    };
}

function loginFailed() {
    return {
        type: 'LOGIN_FAILED'
    };
}

function performingLogin() {
    return {
        type: 'LOGIN_PROGRESS'
    };
}

export function performLogin(userName, password, history) {
    return function (dispatch) {
        dispatch(performingLogin());

        //TODO: Will have to make an actual call 
        //to do the authentication, but for the moment we will just mock it
        const loginResult = Promise.resolve(true);
        loginResult.then((res) => {
            if (res) {
                dispatch(loginSucceeded());
                history.push('/landing');
            } else {
                dispatch(loginFailed());
            }
        });
    };
}
