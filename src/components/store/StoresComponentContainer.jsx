import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import storeStyles from './Store.scss';
import { fetchStores } from './storeActions';
import StoreComponent from './Store';
import IncrementalSearchComponent from '../common/incrementalSearch/IncrementalSearch';
import IncrementalSearchResultsComponent from '../common/incrementalSearchResults/IncrementalSearchResults';

/**
 * 
 */
class StoresComponent extends React.Component {

    /**
     * 
     */
    componentDidMount() {
        this.props.fetchStores();
    }

    /**
     * 
     */
    render() {
        const stores = this.props.Stores;
        let storesToRender = null;
        storesToRender = stores.map((store) =>
            <StoreComponent
                key={store.Id}
                StoreKey={store.Id}
                Name={store.Name}
                Location={store.Location}
                Hours={store.Hours}
                Image={store.Image}
                onApplyShoppingListClicked={this.props.onApplyShoppingListClicked}
            />
        );

        return (
            <div className={commonStyles.componentWrapper}>
                <p className={commonStyles.componentTitle}>
                    Available stores
                </p>
                <IncrementalSearchComponent />
                {/*<div className={storeStyles.incSearchResultsContainer}>
                    <div className={storeStyles.incSearchResults}>
                        <IncrementalSearchResultsComponent />
                    </div>
                </div>*/}
                {storesToRender}
            </div>);
    }

}

/**
 *
 */
StoresComponent.PropTypes = {
    fetchStores: PropTypes.func.isRequired,
    Stores: PropTypes.array.isRequired
};

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => ({
    fetchStores: () => {
        dispatch(fetchStores());
    }
});

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => ({
    Stores: state.syncSpaceReducer.Stores
});

const StoresComponentContainer = connect(mapStateToProps, mapDispatchToProps)(StoresComponent);
export default StoresComponentContainer;
