import React from 'react';
import { connect } from 'react-redux';
import commonStyles from '../../stylesheets/styles.scss';
import { fetchStores } from './storeActions';

/**
 * 
 */
class StoreComponent extends React.Component {

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
            <div>{store.Name}</div>
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

const mapDispatchToProps = (dispatch) => ({
    fetchStores: () => {
        dispatch(fetchStores());
    }
});

const mapStateToProps = (state) => ({
    Stores: state.syncSpaceReducer.Stores
});

const StoreContainer = connect(mapStateToProps, mapDispatchToProps)(StoreComponent);
export default StoreContainer;
