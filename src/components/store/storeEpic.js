import 'rxjs/add/operator/mapTo';

export const storeEpic = action$ =>
    action$.ofType('FETCH_STORES')
    .mapTo({
        type: 'FETCHED_STORES',
        Stores: [{
            Id: '1',
            Name: 'Coles',
            Description: 'Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, ',
            Image: null
        }, {
            Id: '2',
            Name: 'Woolworths',
            Description: 'Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, ',
            Image: null
        }, {
            Id: '3',
            Name: 'ALDI',
            Description: 'Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, ',
            Image: null
        }]
    });
