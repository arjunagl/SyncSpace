import React from 'react';
import { connect } from 'react-redux';

/**
 * 
 * 
 * @class IncrementalSearchResults
 * @extends {React.Component}
 */
class IncrementalSearchResults extends React.Component {

    /**
     * 
     * 
     * @returns 
     * 
     * @memberof IncrementalSearchResults
     */
    render() {
        const filteredStoresToRender = this.props.filteredStores.map((filteredStore) =>
            <div key={filteredStore.Id}>
                {filteredStore.Name} - {filteredStore.Location}
            </div>
        );
        return (
            <div>
                {filteredStoresToRender}
            </div>
        );
    }
}

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = (state) => ({
    filteredStores: state.syncSpaceReducer.FilteredStores
});

const IncrementalSearchResultsComponent = connect(mapStateToProps, null)(IncrementalSearchResults);
export default IncrementalSearchResultsComponent;
