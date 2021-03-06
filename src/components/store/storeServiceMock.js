import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { SampleStores } from '../../data/sampleData';

const StoreServiceMock = () => ({
    getStores: () =>
        Observable.of({ stores: SampleStores }).delay(3000)
});

export default StoreServiceMock;
