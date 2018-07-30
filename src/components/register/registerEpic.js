import { ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

// eslint-disable-next-line arrow-body-style
export const registerEpic = (action$, _store, { RegisterService }) => {
    return action$.pipe(
        ofType('REGISTER_USER'),
        concatMap(value => {
            const messagesToDispatch = merge(
                of({ type: 'REGISTERING_USER' }),
                RegisterService.registerUser(value.firstName, value.lastName, value.email).pipe(
                    map(registerResult => {
                        console.log(registerResult);
                        return of(registerResult);
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of({ type: 'REGISTER_USER_FAIL', error });
                    })
                )
            );
            return messagesToDispatch;
        })
    );
};
