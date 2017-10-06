
// eslint-disable-next-line arrow-body-style
export const incrementalSearchEpic = (action$, store, { incrementalSearchService }) => {
    // eslint-disable-next-line max-len
    return action$.ofType('SEARCH_STORES').mergeMap((action) =>
        incrementalSearchService.performIncrementalSearch(action)
    );
};
