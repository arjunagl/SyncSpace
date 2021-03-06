import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Rx';
import { AppliedShoppingListsSampleData } from '../../data/sampleData';

// eslint-disable-next-line arrow-body-style
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
                    AppliedShoppingLists: AppliedShoppingListsSampleData
                }).delay(5000).map(shoppingList => shoppingList)
            )
        );
};
