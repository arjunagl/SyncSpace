import axios from 'axios';
import sinon from 'sinon';
import StoreService from './storeService';
import ConfigService from '../../common/configService';
import { SampleStores } from '../../data/sampleData';

describe('incrementalSearchEpic', () => {
    it('StoreService.getStores -> returns an observable when called', () => {
        const config = ConfigService();
        sinon.stub(axios, 'get').callsFake(() => Promise.resolve({
            data: SampleStores
        }));

        const storeService = StoreService(axios, config);
        const storesObservable = storeService.getStores();
        storesObservable.forEach(stores => {
            expect(stores).toEqual(SampleStores);
        });
    });
});
