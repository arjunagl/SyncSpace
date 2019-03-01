import { CompletedSavedShoppingPathSelected, CompletedSavedShoppingPathLoaded } from './CompletedSavedShoppingActions';
import { AppliedShoppingListsSampleData } from '../../data/sampleData';


describe('Completed/Saved Shopping Actions', () => {
    it('Should create an CompletedSavedShoppingPathSelected action', () => {
        const expectedResult = {
            type: 'COMPLETED_SAVED_SHOPPING_LIST_SELECTED',
            AppliedShoppingList: AppliedShoppingListsSampleData
        };

        expect(CompletedSavedShoppingPathSelected(AppliedShoppingListsSampleData)).toEqual(expectedResult);
    });

    it('Should create an CompletedSavedShoppingPathLoaded action', () => {
        const expectedResult = {
            type: 'COMPLETED_SAVED_SHOPPING_LIST_LOADED',
            AppliedShoppingList: AppliedShoppingListsSampleData
        };

        expect(CompletedSavedShoppingPathLoaded(AppliedShoppingListsSampleData)).toEqual(expectedResult);
    });
});
