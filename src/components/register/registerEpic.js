import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

// eslint-disable-next-line arrow-body-style
export const registerEpic = (action$, store, { RegisterService }) => {
    return action$.pipe(
        ofType('REGISTER_USER'),
        concatMap(value => {
            console.log(RegisterService);
            const messagesToDispatch = merge(
                of({ type: 'REGISTERING_USER' }),
                RegisterService.registerUser(value.firstName, value.lastName, value.email).map(registerResult => {
                    console.log(registerResult);
                    return Object.assign({ type: 'REGISTERING_USER_COMPLETE' }, registerResult);
                })
            );
            return messagesToDispatch;
        })
    );
};
