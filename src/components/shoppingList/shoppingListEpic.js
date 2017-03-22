import 'rxjs/add/operator/mapTo';

export const shoppingListEpic = action$ =>
    action$.ofType('FETCH_SHOPPING_LISTS')
    .mapTo({
        type: 'FETCHED_SHOPPING_LISTS',
        Stores: [{
            Id: '1',
            Name: 'Groceries',
        }, {
            Id: '2',
            Name: 'Vegetables',
        }, {
            Id: '3',
            Name: 'Fruits',
        }]
    });
