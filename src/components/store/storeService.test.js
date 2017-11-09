import axios from 'axios';
import sinon from 'sinon';
import StoreService from './storeService';
import ConfigService from '../../common/configService';
import { SampleStores } from '../../data/sampleData';

describe('incrementalSearchEpic', () => {
    it('StoreService.getStores -> returns an observable when called', async () => {
        const config = ConfigService();
        sinon.stub(axios, 'get').callsFake(() => Promise.resolve({
            stores: SampleStores
        }));

        const storeService = StoreService(axios, config);
        const storesObservable = await storeService.getStores();
    });
});
