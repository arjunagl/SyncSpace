import { Observable } from 'rxjs/Observable';

const sampleShoppingLists = [{
    Id: '1',
    Name: 'Groceries',
}, {
    Id: '2',
    Name: 'Vegetables',
}, {
    Id: '3',
    Name: 'Fruits',
}];
const ShoppingListServiceMock = () => ({
    getShoppingLists: () =>
        Observable.of({
            shoppingLists: sampleShoppingLists
        }).delay(3500)
});

export default ShoppingListServiceMock;
