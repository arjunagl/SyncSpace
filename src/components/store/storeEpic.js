import 'rxjs/add/operator/mapTo';
// import storeImage from '../../stylesheets/images/Shop.svg';

export const storeEpic = action$ =>
    action$.ofType('FETCH_STORES')
    .mapTo({
        type: 'FETCHED_STORES',
        Stores: [{
                Name: 'Coles',
                Description: 'Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, ',
                Image: null
            }, {
                Name: 'Woolworths',
                Description: 'Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, ',
                Image: null
            }, {
                Name: 'ALDI',
                Description: 'Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, Simple store description, ',
                Image: null
            }]
    });
