import 'rxjs/add/operator/mapTo';

export const storeEpic = action$ =>
    action$.ofType('FETCH_STORES')
    .mapTo({
        type: 'FETCHED_STORES',
        Stores: [{
                Name: 'Coles'
            }, {
                Name: 'Woolworths'
            }, {
                Name: 'ALDI'
            }]
    });
