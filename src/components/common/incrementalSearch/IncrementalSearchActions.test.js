import { performIncrementalStoreSearch } from './IncrementalSearchActions';

describe('Incremental Search Actions', () => {
    it('Should create an incremental search action', () => {
        const searchText = 'storeSearchText';
        const expectedResult = {
            type: 'SEARCH_STORES',
            SearchText: searchText
        };
        expect(performIncrementalStoreSearch(searchText)).toEqual(expectedResult);
    });
});
