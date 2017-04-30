import React from 'react';
import { connect } from 'react-redux';
import styles from './Processing.scss';


/**
 * 
 * @param {*} param0 
 */
const ProcessingMessageComponent = ({ processingState, processingMessage }) => {
    let snackBarStyleclassName = styles.snackbar;
    if (processingState !== 'Idle') {
        snackBarStyleclassName = `${snackBarStyleclassName} ${styles.show}`;
    }
    return (
        <div className={snackBarStyleclassName} >
            <b>Processing please wait...{processingMessage}</b>
        </div>
    );
};


/**
 *
 * @param state
 * @returns {{currentState: string}}
 */
const mapStateToProps = (state) => ({
    processingState: state.syncSpaceReducer.Processing.State,
    processingMessage: state.syncSpaceReducer.Processing.Message
});

/**
 * 
 */
const ProcessingMessageContainer = connect(mapStateToProps)(ProcessingMessageComponent);

export default ProcessingMessageContainer;
