import React from 'react';
import { connect } from 'react-redux';
import styles from './IncrementalSearch.scss';

class IncrementalSearch extends React.Component {
    render() {
        return (
            <div className={styles.srchBoxContaner}>
                <input
                    className={styles.incSrchTextBox}
                    type="text" name="search" placeholder="Search.."
                />
            </div>
        );
    }
}

const mapDispatchToProps = () => ({
    // onClick: () => {
    //     alert('clicked');
    // },
});

const IncrementalSearchComponent = connect(mapDispatchToProps)(IncrementalSearch);
export default IncrementalSearchComponent;
