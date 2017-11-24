import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import { fetchStores } from './storeActions';
import StoreComponent from './Store';
import IncrementalSearchComponent from '../common/incrementalSearch/IncrementalSearch';

class StoresComponent extends React.Component {

    componentDidMount() {
        this.props.fetchStores();
    }

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

                // The image comes base64 encoded in a byte[] arrray therefore we need to decode the byte[] array into base64
                Image={`data:image/svg+xml;base64,${window.btoa(String.fromCharCode(...new Uint8Array(store.Image.data)))}`}
                onApplyShoppingListClicked={this.props.onApplyShoppingListClicked}
            />
        );

        return (
            <div className={commonStyles.componentWrapper}>
                <p className={commonStyles.componentTitle}>
                    Available stores
                </p>
                <IncrementalSearchComponent />
                {storesToRender}
            </div>);
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
