import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import axios from 'axios';

const ShoppingListsService = (http, Config) => ({
    getShoppingLists: (user) => {
        const syncShoppingListsUrl = `${Config.syncGalaxyUrl}${Config.shoppingListsEndPoint}/${user}`;
        return Observable.fromPromise(axios.get(syncShoppingListsUrl)).map(result => result.data);
    }
});

export default ShoppingListsService;
