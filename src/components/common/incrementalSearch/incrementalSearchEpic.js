import { SampleStores } from '../../../data/sampleData';

// eslint-disable-next-line arrow-body-style
export const incrementalSearchEpic = action$ => {
    const filteredStores = action$.ofType('SEARCH_STORES').mapTo({
        type: 'FILTERED_STORES',
        Stores: SampleStores
    }).filter(store => store.Name === action$.SearchText);

    return filteredStores;
};
