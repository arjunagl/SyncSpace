import { browserHistory } from 'react-router';

/**
 *
 * @returns {{type: string}}
 */
function loginSucceeded() {
    return {
        type: 'LOGIN_SUCCEEDED',
        UserDisplayName: 'tim'
    };
}

function loginFailed() {
    return {
        type: 'LOGIN_FAILED'
    };
}


/**
 *
 * @returns {{type: string}}
 */
function performingLogin() {
    return {
        type: 'LOGIN_PROGRESS'
    };
}

/**
 *
 * @param userName
 * @param password
 * @returns {Function}
 */
export function performLogin(userName, password) {
    return function (dispatch) {
        dispatch(performingLogin());

        //TODO: Will have to make an actual call 
        //to do the authentication, but for the moment we will just mock it
        const loginResult = Promise.resolve(true);
        loginResult.then((res) => {
            if (res) {
                dispatch(loginSucceeded());
                browserHistory.push('/landing'); 
            } else {
                dispatch(loginFailed());
                browserHistory.push('/login');
            }
        });
    };
}
