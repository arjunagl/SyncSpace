
// eslint-disable-next-line arrow-body-style
export const incrementalSearchEpic = (action$) => {
    // eslint-disable-next-line max-len
    return action$.ofType('COMPLETED_SAVED_SHOPPING_LIST_SELECTED').mergeMap((action) => <STOP> here
        incrementalSearchService.performIncrementalSearch(action)
    );
};
