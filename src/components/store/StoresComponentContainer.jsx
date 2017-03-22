import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import { fetchStores } from './storeActions';
import StoreComponent from './Store';

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
                Name={store.Name}
                Location={store.Location}
                Hours={store.Hours}
                Image={store.Image}
            />
        );

        return (
            <div className={commonStyles.componentWrapper}>
                <p className={commonStyles.componentTitle}>
                    Available stores
                </p>
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
