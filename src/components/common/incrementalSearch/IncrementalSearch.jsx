import React from 'react';
import { Subject } from 'rxjs/Subject';
import { connect } from 'react-redux';
import styles from './IncrementalSearch.scss';
import { performIncrementalStoreSearch } from './IncrementalSearchActions';

/**
 * 
 * 
 * @class IncrementalSearch
 * @extends {React.Component}
 */
class IncrementalSearch extends React.Component {

    /**
     * Creates an instance of IncrementalSearch.
     * @param {any} props 
     * 
     * @memberof IncrementalSearch
     */
    constructor(props) {
        super(props);
        this.onSearch$ = new Subject();
        this.onChange = this.onChange.bind(this);
    }

    /**
     * 
     * 
     * 
     * @memberof IncrementalSearch
     */
    componentDidMount() {
        this.subscription = this.onSearch$
            .debounceTime(300)
            .subscribe(debounced => {
                console.log(`Search Text ${debounced}`);
                this.props.onPerformIncrementalSearch(debounced);
            });
    }


    /**
     * 
     * 
     * 
     * @memberof IncrementalSearch
     */
    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    /**
     * 
     * 
     * @param {any} e 
     * 
     * @memberof IncrementalSearch
     */
    onChange(e) {
        const newText = e.target.value;
        this.onSearch$.next(newText);
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberof IncrementalSearch
     */
    render() {
        return (
            <div className={styles.srchBoxContaner}>
                <input
                    className={styles.incSrchTextBox}
                    type="text" name="search" placeholder="Search.."
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => ({
    onPerformIncrementalSearch: (searchText) => {
        dispatch(performIncrementalStoreSearch(searchText));
    }
});

const IncrementalSearchComponent = connect(mapDispatchToProps)(IncrementalSearch);
export default IncrementalSearchComponent;
