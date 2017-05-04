import React from 'react';
import { connect } from 'react-redux';
import styles from './Processing.scss';


/**
 * 
 * @param {*} param0 
 */
const ProcessingMessageComponent = ({ processingState, processingMessage }) => {
    let snackBarStyleclassName = styles.snackbar;
    let snackBarDisableBackground = styles.disableBackGround;
    if (processingState !== 'Idle') {
        snackBarStyleclassName = `${snackBarStyleclassName} ${styles.show}`;
        snackBarDisableBackground = `${snackBarDisableBackground} ${styles.show}`;
    }
    return (
        <div>
            <div className={snackBarDisableBackground} />
            <div className={snackBarStyleclassName} >
                <b>{processingMessage}</b>
            </div>
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
