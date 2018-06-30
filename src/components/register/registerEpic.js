import { ofType } from 'redux-observable';
import { concat, mapTo } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { map } from '../../../node_modules/rxjs-compat/operator/map';

// eslint-disable-next-line arrow-body-style
export const registerEpic = (action$) => {
    // return action$.pipe(
    //     ofType('REGISTER_USER'),
    //     concat(
    //         of({
    //             type: 'APPLYING_SHOPPING_LISTS'
    //         }),
    //         of({
    //             type: 'REGISTERING_USER_COMPLETE'
    //         })
    //     )
    // );

    // return action$.pipe(
    //     ofType('REGISTER_USER'),
    //     of({
    //         type: 'APPLYING_SHOPPING_LISTS'
    //     })
    // );

    return action$.pipe(
        ofType('REGISTER_USER'),
        mapTo(action => {
            console.log(JSON.stringify(action));
            return { a: 'a' };
        })
    );
};
