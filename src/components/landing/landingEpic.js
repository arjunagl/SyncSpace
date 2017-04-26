import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

/**
 * 
 * @param {*} action$ 
 */
export const landingEpic = action$ => (
    action$.ofType('APPLY_SHOPPING_LISTS').delay(5000).map(() => ({
        type: 'APPLIED_SHOPPING_LISTS',
        AppliedShoppingLists: [{
            ShoppingListId: '1',
            Item: {
                Id: '1',
                Name: 'Apples'
            },
            Location: {
                Isle: '1',
                Description: 'Next to Oranges'
            },
        }, {
            ShoppingListId: '1',
            Item: {
                Id: '1',
                Name: 'Apples'
            },
            Location: {
                Isle: '1',
                Description: 'Next to Oranges'
            }
        },
        {
            ShoppingListId: '1',
            Item: {
                Id: '1',
                Name: 'Apples'
            },
            Location: {
                Isle: '1',
                Description: 'Next to Oranges'
            }
        }]
    }))
);
