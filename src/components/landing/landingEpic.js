import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

/**
 * 
 * @param {*} action$ 
 */

export const landingEpic = action$ => {
    console.log('generating epic...');
    const applyingShoppingListSource = action$.ofType('APPLY_SHOPPING_LISTS').mapTo({ type: 'APPLYING_SHOPPING_LISTS' });
    const appliedShoppingListSource = action$.ofType('APPLY_SHOPPING_LISTS').mapTo({
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
    }).delay(5000);

    return applyingShoppingListSource.concat(appliedShoppingListSource);
};

// export const landingEpic = action$ => (
//     action$.ofType('APPLY_SHOPPING_LISTS').delay(5000).map(() => ({
//         type: 'APPLIED_SHOPPING_LISTS',
//         AppliedShoppingLists: [{
//             ShoppingListId: '1',
//             Item: {
//                 Id: '1',
//                 Name: 'Apples'
//             },
//             Location: {
//                 Isle: '1',
//                 Description: 'Next to Oranges'
//             },
//         }, {
//             ShoppingListId: '1',
//             Item: {
//                 Id: '1',
//                 Name: 'Apples'
//             },
//             Location: {
//                 Isle: '1',
//                 Description: 'Next to Oranges'
//             }
//         },
//         {
//             ShoppingListId: '1',
//             Item: {
//                 Id: '1',
//                 Name: 'Apples'
//             },
//             Location: {
//                 Isle: '1',
//                 Description: 'Next to Oranges'
//             }
//         }]
//     }))
// );
