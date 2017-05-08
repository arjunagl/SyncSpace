import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx';

/**
 * 
 * @param {*} action$ 
 */
export const landingEpic = action$ => {
    return action$.ofType('APPLY_SHOPPING_LISTS')
        .flatMap(() =>
            Observable.concat(
                // Fire 2 actions, one after the other
                Observable.of({
                    type: 'APPLYING_SHOPPING_LISTS'
                }),
                Observable.of({
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
                    }],
                    meta: {
                        transition: (prevState, nextState, action) => ({
                            pathname: '/shopping',
                        }),
                    },
                }).delay(5000)
            )
        );
};
