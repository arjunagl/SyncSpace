import 'rxjs/add/operator/mapTo';

export const landingEpic = action$ => {
    console.log('inside landing epic');
    return action$.ofType('APPLY_SHOPPING_LISTS')
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
