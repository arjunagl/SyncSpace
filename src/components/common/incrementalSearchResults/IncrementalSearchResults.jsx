import React from 'react';
import { connect } from 'react-redux';
import styles from './IncrementalSearchResults.scss';
import StoreComponent from '../../store/Store';

class IncrementalSearchResults extends React.Component {

    render() {
        const filteredStoresToRender = this.props.filteredStores.map((store) =>
            <StoreComponent
                key={`inc_${store.Id}`}
                StoreKey={store.Id}
                Name={store.Name}
                Location={store.Location}
                Hours={store.Hours}
                Image={store.Image}
                onApplyShoppingListClicked={this.props.onApplyShoppingListClicked}
            />
        );
        return (
            <div className={styles.searchResultsContainer}>
                {filteredStoresToRender}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filteredStores: state.syncSpaceReducer.FilteredStores
});

const IncrementalSearchResultsComponent = connect(mapStateToProps, null)(IncrementalSearchResults);
export default IncrementalSearchResultsComponent;
