import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';

/**
 * 
 * @param {*} action$ 
 */
export const landingEpic = action$ => {
    console.log('inside landing epic');
    action$.ofType('APPLY_SHOPPING_LISTS').map(() => (
        {
            type: 'APPLYING_SHOPPING_LISTS',
        })
    );


    return action$.ofType('APPLIED_SHOPPING_LISTS')
        .mapTo({
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
        });
};
