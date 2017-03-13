import 'rxjs/add/operator/mapTo';

export const storeEpic = action$ =>
    action$.ofType('FETCH_STORES')
    .mapTo({
        type: 'FETCHHING_STORES'
    });
