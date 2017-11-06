import { Observable } from 'rxjs/Observable';
import axios from 'axios';

const StoreService = (http, Config) => {
    return {
        getStores: () => {
            const syncGalaxyStoresUrl = Config.syncGalaxyUrl + Config.storesEndPoint;
            return Observable.fromPromise(axios.get(syncGalaxyStoresUrl)).map(result => result.data);
        }
    };
};

// class StoreService {
//     constructor(http, Config) {
//         this.http = http;
//         this.Config = Config;
//     }

//     getStores = () => {
//         const syncGalaxyStoresUrl = this.Config.syncGalaxyUrl + this.Config.storesEndPoint;
//         return Observable.fromPromise(axios.get(syncGalaxyStoresUrl));
//     }
// }

export default StoreService;
