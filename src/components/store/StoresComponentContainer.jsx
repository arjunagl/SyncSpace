import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import storeStyles from './Store.scss';
import { fetchStores } from './storeActions';

import StoreComponent from './Store';
import IncrementalSearchComponent from '../common/incrementalSearch/IncrementalSearch';
import LoaderComponent from '../common/loader/loader';

class StoresComponent extends React.Component {

    componentDidMount() {
        this.props.fetchStores();
    }

    render() {
        const stores = this.props.Stores;
        let loaderComponent = (
            <div className={storeStyles.loaderStyles}>
                <LoaderComponent />
            </div>
        );

        if (stores.length > 0) {
            loaderComponent = '';
        }
        let storesToRender = null;

        storesToRender = stores.map((store) =>
            <StoreComponent
                key={store.Id}
                StoreKey={store.Id}
                Name={store.Name}
                Location={store.Location}
                Hours={store.Hours}

                // The image comes base64 encoded in a byte[] arrray therefore we need to decode the byte[] array into base64
                Image={store.Image
                    ? `data:image/svg+xml;base64,${window.btoa(String.fromCharCode(...new Uint8Array(store.Image.data)))}`
                    : null}
                onApplyShoppingListClicked={this.props.onApplyShoppingListClicked}
            />
        );

        return (
            <div className={commonStyles.componentWrapper}>
                <p className={commonStyles.componentTitle}>
                    Available stores
                </p>
                <IncrementalSearchComponent />
                {loaderComponent}
                {storesToRender}
            </div >
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    fetchStores: () => {
        dispatch(fetchStores());
    }
});

const mapStateToProps = (state) => ({
    Stores: state.syncSpaceReducer.Stores
});

const StoresComponentContainer = connect(mapStateToProps, mapDispatchToProps)(StoresComponent);
export default StoresComponentContainer;
