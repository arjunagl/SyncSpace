import 'rxjs/add/operator/mapTo';

export const storeEpic = action$ =>
    action$.ofType('FETCH_STORES')
    .mapTo({
        type: 'FETCHED_STORES',
        Stores: [{
            Id: '1',
            Name: 'Coles',
            Location: 'Mount Waverley',
            Hours: '9am - 9pm',
            Image: null
        }, {
            Id: '2',
            Name: 'Woolworths',
            Location: 'Mount Waverley',
            Hours: '9am - 9pm',
            Image: null
        }, {
            Id: '3',
            Name: 'ALDI',
            Location: 'Mount Waverley',
            Hours: '9am - 9pm',
            Image: null
        }]
    });
