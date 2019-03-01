import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import axios from 'axios';

const StoreService = (http, Config) => ({
    getStores: () => {
        const syncGalaxyStoresUrl = Config.syncGalaxyUrl + Config.storesEndPoint;
        return Observable.fromPromise(axios.get(syncGalaxyStoresUrl)).map(result => result.data);
    }
});

export default StoreService;
