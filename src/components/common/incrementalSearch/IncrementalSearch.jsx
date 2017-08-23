import React from 'react';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { connect } from 'react-redux';
import styles from './IncrementalSearch.scss';
import { performIncrementalStoreSearch } from './IncrementalSearchActions';

export class IncrementalSearch extends React.Component {
    constructor(props) {
        super(props);
        this.onSearch$ = new Subject();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        //Acting as the Observer
        this.subscription = this.onSearch$
            .debounceTime(300)
            .subscribe(debounced => {
                this.props.onPerformIncrementalSearch(debounced);
            });
    }


    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onChange(e) {
        const newText = e.target.value;
        this.onSearch$.next(newText); //Acts as the Observable
    }

    render() {
        return (
            <div className={styles.srchBoxContaner}>
                <input
                    className={styles.incSrchTextBox}
                    type="text" name="search" id="searchInput" placeholder="Search.."
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onPerformIncrementalSearch: (searchText) => {
        dispatch(performIncrementalStoreSearch(searchText));
    }
});

const IncrementalSearchComponent = connect(null, mapDispatchToProps)(IncrementalSearch);
export default IncrementalSearchComponent;
