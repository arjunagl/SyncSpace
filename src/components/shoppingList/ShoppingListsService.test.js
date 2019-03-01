import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import axios from 'axios';
import sinon from 'sinon';
import ConfigService from '../../common/configService';
import ShoppingListsService from './ShoppingListsService';

describe('ShoppingListsService', () => {
    it('ShoppingListsService.getShoppingLists -> returns an observable when called', () => {
        const config = ConfigService();
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
        sinon.stub(axios, 'get').callsFake(() => Promise.resolve({
            data: sampleShoppingLists
        }));

        const shoppingListService = ShoppingListsService(axios, config);
        const shoppingListsObservable = shoppingListService.getShoppingLists('albert');
        shoppingListsObservable.forEach(shoppingLists => {
            expect(shoppingLists).toEqual(sampleShoppingLists);
        });
    });
});

